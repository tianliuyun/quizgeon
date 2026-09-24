#!/usr/bin/env python3
"""
Quizgeon LLM 判分服务（考核体系）
调火山方舟 deepseek-v4-flash 对开放题按得分点判分。

用法:
    ARK_API_KEY=xxx python3 judge-server.py    # 默认端口 8787
    python3 judge-server.py --port 8787

接口:
    POST /judge
      {"question": str, "points": [str...], "user_answer": str}
      -> {"score": int, "max_score": int, "per_point": [{"point": str, "hit": bool, "comment": str}], "feedback": str, "overall_comment": str}
    GET /health
"""
import os
import sys
import json
import argparse
from pathlib import Path

import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 读取 key：优先环境变量，否则从 ~/.hermes/.env 加载
def load_env():
    env_path = Path.home() / ".hermes" / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

load_env()

ARK_KEY = os.environ.get("ARK_API_KEY", "")
ARK_BASE = "https://ark.cn-beijing.volces.com/api/plan/v3"
ARK_MODEL = os.environ.get("QUIZGEON_JUDGE_MODEL", "deepseek-v4-flash")

if not ARK_KEY:
    print("⚠️  未找到 ARK_API_KEY（检查 ~/.hermes/.env 或环境变量）", file=sys.stderr)

app = FastAPI(title="Quizgeon LLM Judge")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

JUDGE_SYSTEM = """你是一位严格的面试评分官，正在给考生的开放题答案按「得分点」打分。
规则：
1. 逐条对照考生答案与每个得分点，判断考生答案是否命中该得分点（允许措辞不同，意思对就算命中）。
2. 考生答案里包含得分点之外的正确补充内容，不影响得分点判定，可给 overall_comment 正面反馈。
3. 若考生答错关键点（如原理错误），对应得分点记为未命中。
4. 打分要客观严格，不因答案长而手松，只认得分点是否真正答到。
5. 所有输出必须是合法 JSON，不要输出 JSON 之外的任何文字。

输出格式（严格 JSON）：
{"per_point": [{"point": "得分点原文", "hit": true/false, "comment": "简要说明考生是否答到/答了什么"}], "overall_comment": "对考生答案的整体评价（简短，指出亮点和不足）"}"""


class JudgeRequest(BaseModel):
    question: str
    points: list[str]
    user_answer: str


@app.get("/health")
def health():
    return {"status": "ok", "model": ARK_MODEL}


@app.post("/judge")
async def judge(req: JudgeRequest):
    if not ARK_KEY:
        return {"error": "ARK_API_KEY 未配置"}
    if not req.user_answer or not req.user_answer.strip():
        return {
            "score": 0,
            "max_score": len(req.points),
            "per_point": [{"point": p, "hit": False, "comment": "考生未作答"} for p in req.points],
            "feedback": "未作答",
            "overall_comment": "未作答，0 分。",
        }

    numbered = "\n".join(f"{i+1}. {p}" for i, p in enumerate(req.points))
    user_prompt = f"""题目：{req.question}

得分点：
{numbered}

考生答案：
{req.user_answer}

请按得分点逐条判定命中情况。"""

    payload = {
        "model": ARK_MODEL,
        "messages": [
            {"role": "system", "content": JUDGE_SYSTEM},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.2,
        "max_tokens": 1500,
    }
    headers = {"Authorization": f"Bearer {ARK_KEY}", "Content-Type": "application/json"}

    try:
        async with httpx.AsyncClient(timeout=60) as client:
            resp = await client.post(f"{ARK_BASE}/chat/completions", json=payload, headers=headers)
            resp.raise_for_status()
            content = resp.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return {"error": f"LLM 调用失败: {e}"}

    # 解析 LLM 返回的 JSON（可能带 ```json 包裹）
    content = content.strip()
    if content.startswith("```"):
        content = content.strip("`")
        if content.startswith("json"):
            content = content[4:]
    try:
        result = json.loads(content)
    except json.JSONDecodeError:
        # 容错：提取 JSON 子串
        start = content.find("{")
        end = content.rfind("}") + 1
        if start >= 0 and end > start:
            try:
                result = json.loads(content[start:end])
            except Exception:
                return {"error": "LLM 返回无法解析", "raw": content[:500]}
        else:
            return {"error": "LLM 返回无 JSON", "raw": content[:500]}

    per_point = result.get("per_point", [])
    # 对齐得分点长度
    aligned = []
    score = 0
    for i, p in enumerate(req.points):
        if i < len(per_point):
            hit = bool(per_point[i].get("hit"))
            comment = per_point[i].get("comment", "")
        else:
            hit = False
            comment = ""
        aligned.append({"point": p, "hit": hit, "comment": comment})
        if hit:
            score += 1

    return {
        "score": score,
        "max_score": len(req.points),
        "per_point": aligned,
        "feedback": "命中 X/Y 个得分点",
        "overall_comment": result.get("overall_comment", ""),
    }


if __name__ == "__main__":
    import uvicorn

    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8787)
    parser.add_argument("--host", default="127.0.0.1")
    args = parser.parse_args()
    print(f"Quizgeon Judge 服务启动: http://{args.host}:{args.port}  model={ARK_MODEL}")
    uvicorn.run(app, host=args.host, port=args.port)
