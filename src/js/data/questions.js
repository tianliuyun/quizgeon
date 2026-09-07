// 题库数据（由 YAML 自动生成，不要直接编辑）
window.QUESTION_BANK = [
  {
    "id": "trans-001",
    "difficulty": "easy",
    "type": "single",
    "question": "Self-Attention 的计算公式是什么？",
    "options": [
      "A. softmax(QKᵀ) · V",
      "B. softmax(QKᵀ/√dₖ) · V",
      "C. sigmoid(QKᵀ/√dₖ) · V",
      "D. softmax(QVᵀ/√dₖ) · K"
    ],
    "answer": "B",
    "explanation": "自注意力公式：Attention(Q, K, V) = softmax(QKᵀ/√dₖ) · V。\n除以 √dₖ 是缩放因子，防止点积过大导致 softmax 饱和。\n",
    "tags": [
      "transformer",
      "attention"
    ],
    "related": [
      "自注意力公式",
      "缩放点积注意力"
    ],
    "floor": 1
  },
  {
    "id": "trans-002",
    "difficulty": "easy",
    "type": "single",
    "question": "Transformer 中，Multi-Head Attention 的「多头」主要作用是什么？",
    "options": [
      "A. 减少参数量，加快计算",
      "B. 在不同子空间学习不同类型的依赖关系",
      "C. 让序列长度可以任意扩展",
      "D. 替代残差连接的作用"
    ],
    "answer": "B",
    "explanation": "多头注意力让模型在不同的表示子空间里同时关注不同类型的依赖关系。\n比如有的头关注句法依存，有的关注指代关系，有的关注远距离关联。\n多头不增加总参数量（d_model 拆成 h 个头，每个头 d_k = d_model/h）。\n",
    "tags": [
      "transformer",
      "multi-head attention"
    ],
    "related": [
      "多头注意力"
    ],
    "floor": 1
  },
  {
    "id": "trans-003",
    "difficulty": "easy",
    "type": "single",
    "question": "为什么 NLP 中通常用 LayerNorm 而不用 BatchNorm？",
    "options": [
      "A. LayerNorm 计算更快",
      "B. NLP 序列长度不一且 batch 通常小，BN 统计量不准",
      "C. BatchNorm 不能用在 GPU 上",
      "D. LayerNorm 的参数更多"
    ],
    "answer": "B",
    "explanation": "BN 在 batch 维度归一化，但 NLP 中：\n1. 序列长度不一，padding 多，统计量不准；\n2. batch size 通常小（受显存限制），BN 不稳定。\nLN 对每个样本独立归一化，不受 batch size 和序列长度影响。\n",
    "tags": [
      "transformer",
      "layer-norm",
      "batch-norm"
    ],
    "related": [
      "LayerNorm vs BatchNorm"
    ],
    "floor": 1
  },
  {
    "id": "trans-004",
    "difficulty": "medium",
    "type": "single",
    "question": "Pre-LN 和 Post-LN 的主要区别是什么？",
    "options": [
      "A. Pre-LN 在残差前做 LN，训练更稳定，深层模型都用它",
      "B. Post-LN 在残差前做 LN，效果更好",
      "C. Pre-LN 是原始论文用的结构",
      "D. 两者完全等价，只是实现不同"
    ],
    "answer": "A",
    "explanation": "Post-LN（原始论文）：Attention → 残差 → LN → FFN → 残差 → LN\nPre-LN（现代主流）：LN → Attention → 残差 → LN → FFN → 残差\nPre-LN 训练更稳定，不需要 warmup，深层模型都用 Pre-LN。\n",
    "tags": [
      "transformer",
      "pre-ln",
      "post-ln"
    ],
    "related": [
      "Pre-LN vs Post-LN"
    ],
    "floor": 1
  },
  {
    "id": "trans-005",
    "difficulty": "easy",
    "type": "single",
    "question": "残差连接主要解决什么问题？",
    "options": [
      "A. 提高模型参数量",
      "B. 解决梯度消失，让深层网络可训练",
      "C. 加快推理速度",
      "D. 减少过拟合"
    ],
    "answer": "B",
    "explanation": "残差连接 y = x + f(x)，反向传播时梯度变成 1 + ∂f/∂x，\n至少有 1 的梯度保底，不会消失。这样才能堆几十上百层。\nTransformer 每层有两个残差（Attention 后 + FFN 后）。\n",
    "tags": [
      "transformer",
      "residual"
    ],
    "related": [
      "残差连接"
    ],
    "floor": 1
  },
  {
    "id": "trans-006",
    "difficulty": "medium",
    "type": "single",
    "question": "Encoder-only / Decoder-only / Encoder-Decoder 三种架构，哪个是当前大模型的主流？",
    "options": [
      "A. Encoder-only（BERT 系）",
      "B. Decoder-only（GPT 系）",
      "C. Encoder-Decoder（T5 系）",
      "D. 三者旗鼓相当"
    ],
    "answer": "B",
    "explanation": "现在大模型主流是 Decoder-only（GPT/Llama/Qwen 都是）。\n原因：生成是核心能力，单向因果注意力天然适合自回归生成；\n统一架构能同时做理解和生成（prompt 形式），扩展性更强。\nEncoder-only 擅长理解（分类/NER），不适合生成。\n",
    "tags": [
      "transformer",
      "architecture"
    ],
    "related": [
      "三种架构对比"
    ],
    "floor": 1
  },
  {
    "id": "trans-007",
    "difficulty": "medium",
    "type": "single",
    "question": "Self-Attention 为什么要除以 √dₖ？",
    "options": [
      "A. 让 QKᵀ 的值变小，节省显存",
      "B. 防止点积过大导致 softmax 饱和、梯度消失",
      "C. 让每个头的参数量一致",
      "D. 归一化到 0~1 之间"
    ],
    "answer": "B",
    "explanation": "当 dₖ 很大时，QKᵀ 的点积值会很大（均值 0，方差 dₖ）。\n点积过大 → softmax 输入两极分化 → 输出趋近 one-hot → 梯度接近 0（饱和）。\n除以 √dₖ 后，点积方差变回 1，softmax 梯度更稳定。\n例：dₖ=64 时，点积标准差 8；除以 8 后标准差 1。\n",
    "tags": [
      "transformer",
      "attention",
      "scaling"
    ],
    "related": [
      "缩放点积注意力",
      "梯度消失"
    ],
    "floor": 1
  },
  {
    "id": "trans-008",
    "difficulty": "easy",
    "type": "single",
    "question": "Transformer 中的 FFN（Feed-Forward Network）是什么结构？",
    "options": [
      "A. 一层线性层",
      "B. 两层线性层 + 激活，d_model → 4×d_model → d_model",
      "C. 卷积层",
      "D. 循环神经网络"
    ],
    "answer": "B",
    "explanation": "FFN = 两层线性变换 + GELU 激活，中间维度是 4×d_model。\n作用：升维提供丰富的特征空间，每个 token 独立做非线性变换。\nAttention 负责 token 之间的信息交互，FFN 负责 token 内部的特征加工。\n",
    "tags": [
      "transformer",
      "ffn"
    ],
    "related": [
      "FFN 前馈网络"
    ],
    "floor": 1
  },
  {
    "id": "trans-009",
    "difficulty": "hard",
    "type": "single",
    "question": "以下哪种位置编码支持长度外推（训练时短，推理时长）？",
    "options": [
      "A. 正弦位置编码（原始论文）",
      "B. 可学习位置编码（BERT/GPT）",
      "C. RoPE（旋转位置编码）",
      "D. 以上都不支持"
    ],
    "answer": "C",
    "explanation": "RoPE（旋转位置编码，LLaMA/Qwen 主流）：在 Q/K 上做旋转变换注入位置信息。\n特点：相对位置编码，支持长度外推，推理时可以比训练时长很多。\n可学习位置编码不能外推（没学过的位置就乱了）。\n正弦位置编码理论上可以外推，但实际效果不如 RoPE。\n",
    "tags": [
      "transformer",
      "position-encoding",
      "RoPE"
    ],
    "related": [
      "位置编码",
      "RoPE 旋转位置编码"
    ],
    "floor": 1
  },
  {
    "id": "trans-010",
    "difficulty": "medium",
    "type": "single",
    "question": "Transformer 自注意力的计算复杂度是多少？（L = 序列长度，d = 维度）",
    "options": [
      "A. O(L·d)",
      "B. O(L²·d)",
      "C. O(L·d²)",
      "D. O(L²·d²)"
    ],
    "answer": "B",
    "explanation": "自注意力复杂度 = QKᵀ 矩阵乘法（L×d × d×L = L²×d）+ 乘以 V（L×L × L×d = L²×d）。\n主要瓶颈是 L² 项，序列越长越慢。\n优化方向：稀疏注意力（滑动窗口）、线性注意力、MQA/GQA（减少 KV 计算量）。\n",
    "tags": [
      "transformer",
      "attention",
      "complexity"
    ],
    "related": [
      "注意力复杂度"
    ],
    "floor": 1
  },
  {
    "id": "trans-boss-1",
    "difficulty": "hard",
    "type": "open",
    "question": "请简述 Transformer 中 Self-Attention 的完整计算过程，并解释为什么要除以 √dₖ。",
    "answer": [
      "计算 Q、K、V 三个矩阵，通过线性投影得到",
      "计算注意力分数 QK^T",
      "除以√d_k进行缩放",
      "softmax归一化得到注意力权重",
      "乘以V得到输出",
      "防止点积过大导致softmax饱和梯度消失",
      "缩放点积注意力"
    ],
    "explanation": "Self-Attention 五步：1) 线性投影得到 Q/K/V；2) Q·Kᵀ 计算注意力分数；3) 除以 √dₖ 缩放（防止点积过大导致 softmax 饱和，梯度消失）；4) softmax 归一化得到权重；5) 加权求和 V 得到输出。",
    "tags": [
      "transformer",
      "attention",
      "boss"
    ],
    "min_keywords": 3,
    "floor": 1
  },
  {
    "id": "pre-001",
    "difficulty": "easy",
    "type": "single",
    "question": "从原始文本到一个能对话的 AI 助手，大模型训练的四阶段正确顺序是？",
    "options": [
      "A. 预训练 → SFT → 数据准备 → 对齐",
      "B. 数据准备 → 预训练 → SFT → 对齐",
      "C. SFT → 预训练 → 对齐 → 数据准备",
      "D. 数据准备 → 对齐 → 预训练 → SFT"
    ],
    "answer": "B",
    "explanation": "四阶段：数据准备（清洗去重分词）→ 预训练（下一词预测，获得语言能力）\n→ SFT 监督微调（学会按指令回答）→ 对齐（RLHF/DPO/GRPO，符合人类偏好）。\n口诀：预训练给知识，SFT 给格式，对齐给价值观。\n",
    "tags": [
      "pretrain",
      "sft",
      "rlhf"
    ],
    "related": [
      "训练四阶段"
    ],
    "floor": 2
  },
  {
    "id": "pre-002",
    "difficulty": "easy",
    "type": "single",
    "question": "SFT（监督微调）中，为什么要使用 Label Mask（只在 assistant 部分算 loss）？",
    "options": [
      "A. 减少显存占用",
      "B. 让模型学会「如何回答」，而不是背熟用户的问题",
      "C. 加快训练速度",
      "D. 防止过拟合"
    ],
    "answer": "B",
    "explanation": "对话数据格式：<|user|>问题<|assistant|>回答\nuser 部分 labels 设为 -100（不计算 loss），只让 assistant 部分参与训练。\n目的：只想让模型学会「如何回答问题」，不需要背熟用户的提问。\n",
    "tags": [
      "sft",
      "label-mask"
    ],
    "related": [
      "SFT 监督微调",
      "Label Mask"
    ],
    "floor": 2
  },
  {
    "id": "pre-003",
    "difficulty": "medium",
    "type": "single",
    "question": "PPO 强化学习训练时，显存里同时有几个模型？",
    "options": [
      "A. 2 个（Actor + Critic）",
      "B. 3 个（Actor + Critic + RM）",
      "C. 4 个（Actor + Critic + RM + Reference）",
      "D. 1 个（Actor 兼任所有角色）"
    ],
    "answer": "C",
    "explanation": "PPO 四模型：\n1. Actor（训练中，生成回答）\n2. Critic（训练中，估计 V(s)，算 Advantage）\n3. Reward Model（冻结，给回答打分）\n4. Reference Model（冻结，算 KL 散度防漂移）\n2 个训练 + 2 个冻结。\n",
    "tags": [
      "ppo",
      "rlhf"
    ],
    "related": [
      "PPO 四模型"
    ],
    "floor": 2
  },
  {
    "id": "pre-004",
    "difficulty": "medium",
    "type": "single",
    "question": "DPO 和 PPO 的核心区别是什么？",
    "options": [
      "A. DPO 效果更好但更复杂",
      "B. DPO 把奖励模型隐式消解在损失函数里，不需要显式 RL 循环",
      "C. DPO 需要更多显存",
      "D. DPO 只能用于图像任务"
    ],
    "answer": "B",
    "explanation": "PPO：SFT → 训练 RM → PPO 强化学习（显式 RL 循环，4 个模型）\nDPO：直接在偏好数据上做监督学习，奖励模型被隐式消解在损失函数里。\nDPO 更简单、更稳定、显存更低，但受限于离线数据（不能在线探索）。\n",
    "tags": [
      "dpo",
      "ppo",
      "alignment"
    ],
    "related": [
      "DPO vs PPO"
    ],
    "floor": 2
  },
  {
    "id": "pre-005",
    "difficulty": "easy",
    "type": "single",
    "question": "预训练阶段的训练目标是什么？",
    "options": [
      "A. 分类损失",
      "B. 下一词预测（Next Token Prediction）",
      "C. 对比学习损失",
      "D. 回归损失"
    ],
    "answer": "B",
    "explanation": "预训练目标：Next Token Prediction（下一词预测）。\n给前 N 个 token，预测第 N+1 个。\n损失函数：交叉熵（Cross Entropy）。\n评估指标：困惑度 PPL = exp(loss)，越低越好。\n",
    "tags": [
      "pretrain",
      "next-token-prediction"
    ],
    "related": [
      "预训练目标"
    ],
    "floor": 2
  },
  {
    "id": "pre-006",
    "difficulty": "hard",
    "type": "single",
    "question": "GRPO（Group Relative Policy Optimization）和 PPO 的主要区别是什么？",
    "options": [
      "A. GRPO 用组内平均奖励代替 Critic，省显存且更稳定",
      "B. GRPO 训练更慢但效果更好",
      "C. GRPO 需要更多模型",
      "D. GRPO 只能用于文本生成"
    ],
    "answer": "A",
    "explanation": "GRPO 核心：用组内相对奖励代替 Critic。\n同一道题采样 G 个答案，A_i = (r_i - mean(r)) / std(r)，比平均分高的就是好答案。\n优势：不需要 Critic → 省 25% 显存 + 避免 Critic 训练不稳定。\n适用：可验证奖励（数学题、代码，答案对不对有客观标准）。\n",
    "tags": [
      "grpo",
      "rl",
      "alignment"
    ],
    "related": [
      "GRPO 组相对策略优化"
    ],
    "floor": 2
  },
  {
    "id": "pre-007",
    "difficulty": "medium",
    "type": "single",
    "question": "LoRA（Low-Rank Adaptation）微调的原理是什么？",
    "options": [
      "A. 直接修改原始权重 W",
      "B. 在原始权重旁加两个低秩矩阵 A 和 B，训练只更新 A×B",
      "C. 只训练偏置项",
      "D. 把模型剪枝后再微调"
    ],
    "answer": "B",
    "explanation": "LoRA 原理：不直接改原始权重 W，而是加两个小矩阵 A 和 B：W + A×B\nA 随机初始化，B 初始化为 0（初始时不影响输出）。\n训练时只更新 A 和 B，原始 W 冻结。\n可训练参数通常 0.1%~1%，显存省 90%+，推理时可合并回 W 零延迟。\n",
    "tags": [
      "lora",
      "finetune",
      "parameter-efficient"
    ],
    "related": [
      "LoRA 低秩适配"
    ],
    "floor": 2
  },
  {
    "id": "pre-008",
    "difficulty": "medium",
    "type": "single",
    "question": "为什么 RLHF 中要有 KL 散度惩罚？",
    "options": [
      "A. 让模型生成更快",
      "B. 防止模型为了拿高分而跑偏太远，保持在 SFT 模型附近",
      "C. 减少参数量",
      "D. 提高训练稳定性"
    ],
    "answer": "B",
    "explanation": "奖励公式：reward = r - β·KL\nKL 散度衡量「当前策略模型」和「参考模型（SFT）」的差异。\n没有 KL 惩罚的话，模型可能为了讨好奖励模型而生成奇怪的文本（奖励黑客）。\nKL 惩罚保证模型在 SFT 基础上微调，不会跑偏太远。\n",
    "tags": [
      "rlhf",
      "ppo",
      "kl-divergence"
    ],
    "related": [
      "KL 散度惩罚",
      "奖励黑客"
    ],
    "floor": 2
  },
  {
    "id": "pre-009",
    "difficulty": "easy",
    "type": "single",
    "question": "关于 Scaling Law（缩放定律），以下哪个说法是正确的？",
    "options": [
      "A. 模型越大一定越好，没有上限",
      "B. 性能和参数量、数据量、算力大致呈幂律关系",
      "C. Scaling Law 只适用于视觉模型",
      "D. 数据量对性能没有影响"
    ],
    "answer": "B",
    "explanation": "Scaling Law：性能 ∝ 参数量^α × 数据量^β × 算力^γ\n大致是幂律关系，越大越强，可预测。\n但不是所有能力都遵循——有些能力是涌现的（过了阈值突然会）。\n",
    "tags": [
      "scaling-law",
      "pretrain"
    ],
    "related": [
      "缩放定律",
      "涌现能力"
    ],
    "floor": 2
  },
  {
    "id": "pre-010",
    "difficulty": "hard",
    "type": "single",
    "question": "分布式训练中，数据并行（DP）、张量并行（TP）、流水线并行（PP）的主要区别是什么？",
    "options": [
      "A. DP 切数据，TP 切矩阵，PP 切层",
      "B. DP 切层，TP 切数据，PP 切矩阵",
      "C. 三者都是一回事，只是名字不同",
      "D. DP 最快，PP 最省显存"
    ],
    "answer": "A",
    "explanation": "DP（数据并行）：每张卡有完整模型，数据分片，AllReduce 同步梯度。\nTP（张量并行）：把矩阵乘法切开，每张卡算一部分，通信量大。\nPP（流水线并行）：把模型分层，不同卡负责不同层，像流水线一样。\n三者结合 = 3D 并行，是训练大模型的标准做法。\n",
    "tags": [
      "distributed-training",
      "data-parallel",
      "tensor-parallel",
      "pipeline-parallel"
    ],
    "related": [
      "3D 并行",
      "分布式训练"
    ],
    "floor": 2
  },
  {
    "id": "pre-boss-1",
    "difficulty": "hard",
    "type": "open",
    "question": "请比较 PPO、DPO、GRPO 三种对齐方法的核心区别，说明各自的优缺点和适用场景。",
    "answer": [
      "PPO需要四个模型 Actor Critic RM Reference",
      "DPO把奖励模型隐式消解在损失函数里",
      "GRPO用组内相对奖励代替Critic",
      "PPO最复杂显存最大但可以在线探索",
      "DPO最简单稳定但受限于离线数据",
      "GRPO省显存适合可验证奖励如数学代码",
      "KL散度惩罚防止模型跑偏"
    ],
    "explanation": "PPO：4个模型，显式RL循环，可在线探索但复杂不稳定；DPO：直接偏好优化，奖励模型隐式消解，简单稳定但离线；GRPO：组相对策略优化，用组内平均奖励代替Critic，省显存，适合可验证奖励任务。",
    "tags": [
      "rlhf",
      "ppo",
      "dpo",
      "grpo",
      "boss"
    ],
    "min_keywords": 3,
    "floor": 2
  },
  {
    "id": "rag-001",
    "difficulty": "easy",
    "type": "single",
    "question": "RAG 的全称是什么？核心思想是什么？",
    "options": [
      "A. Retrieval-Augmented Generation — 检索增强生成，先搜相关文档再回答",
      "B. Random Answer Generation — 随机答案生成",
      "C. Reverse Attention Generation — 反向注意力生成",
      "D. Retrieval Attention Gating — 检索注意力门控"
    ],
    "answer": "A",
    "explanation": "RAG = Retrieval-Augmented Generation（检索增强生成）。\n核心思想：让 LLM 在回答问题前，先从外部知识库检索相关文档/片段，\n把检索到的内容作为上下文喂给模型，再生成答案。\n解决三大问题：知识过时、幻觉、私有数据。\n",
    "tags": [
      "rag",
      "retrieval-augmented-generation"
    ],
    "related": [
      "RAG 基础概念"
    ],
    "floor": 3
  },
  {
    "id": "rag-002",
    "difficulty": "easy",
    "type": "single",
    "question": "RAG 系统通常由哪两大模块组成？",
    "options": [
      "A. 索引模块 + 检索模块",
      "B. 编码模块 + 解码模块",
      "C. 离线索引阶段 + 在线检索生成阶段",
      "D. 训练模块 + 推理模块"
    ],
    "answer": "C",
    "explanation": "RAG 分两大阶段：\n1. 离线索引：文档 → 切块 → 向量化 → 存入向量数据库\n2. 在线检索生成：用户 Query → 向量化 → 检索 Top-K → 拼接 Prompt → LLM 生成\n简单说就是「先存后取」，存的时候建索引，用的时候检索+生成。\n",
    "tags": [
      "rag",
      "pipeline"
    ],
    "related": [
      "RAG 两阶段"
    ],
    "floor": 3
  },
  {
    "id": "rag-003",
    "difficulty": "medium",
    "type": "single",
    "question": "向量检索中，常见的相似度度量方法不包括哪个？",
    "options": [
      "A. 余弦相似度（Cosine Similarity）",
      "B. 欧氏距离（L2 Distance）",
      "C. 内积（Inner Product / Dot Product）",
      "D. 交叉熵（Cross Entropy）"
    ],
    "answer": "D",
    "explanation": "常见相似度度量：\n- 余弦相似度：衡量方向差异，值域 [-1, 1]，不关心向量长度\n- 欧氏距离（L2）：衡量空间距离，值域 [0, ∞)\n- 内积/点积：考虑方向+长度，向量归一化后等价于余弦\n交叉熵是损失函数，不是相似度度量。\n",
    "tags": [
      "rag",
      "vector-search",
      "similarity"
    ],
    "related": [
      "向量相似度"
    ],
    "floor": 3
  },
  {
    "id": "rag-004",
    "difficulty": "medium",
    "type": "single",
    "question": "RAG 中「Chunking（文档切块）」策略对效果影响很大，以下哪种说法是错误的？",
    "options": [
      "A. 块太小会导致语义不完整，影响回答质量",
      "B. 块越大越好，信息越全回答越准",
      "C. 常用的切块方法有固定长度、按句子/段落、语义切块",
      "D. 块大小要结合 Embedding 模型的最大上下文来选"
    ],
    "answer": "B",
    "explanation": "块不是越大越好。太大的问题：\n1. 单块信息密度低，检索噪音大，引入无关内容\n2. 超过 Embedding 模型最大输入长度会被截断\n3. 拼接进 Prompt 时占 token 多，能放的块数少\n一般 512~1024 token 比较常见，要根据场景调。\n",
    "tags": [
      "rag",
      "chunking"
    ],
    "related": [
      "文档切块策略"
    ],
    "floor": 3
  },
  {
    "id": "rag-005",
    "difficulty": "medium",
    "type": "single",
    "question": "以下哪个不是 RAG 常见的优化方向？",
    "options": [
      "A. 混合检索（关键词 + 向量）",
      "B. 重排序（Reranking）",
      "C. 查询改写（Query Rewriting）",
      "D. 增加模型参数量"
    ],
    "answer": "D",
    "explanation": "RAG 优化方向：\n- 混合检索：BM25 关键词 + 向量检索互补，解决字面匹配问题\n- 重排序：用 Cross-Encoder 对初筛结果重新排序，更精准\n- 查询改写：用 LLM 把用户问题扩展/改写，提高召回率\n- 增加模型参数是提升 LLM 本身，不算 RAG 特定优化。\n",
    "tags": [
      "rag",
      "optimization"
    ],
    "related": [
      "RAG 优化"
    ],
    "floor": 3
  },
  {
    "id": "rag-006",
    "difficulty": "medium",
    "type": "single",
    "question": "Agent（智能体）和 RAG 的主要区别是什么？",
    "options": [
      "A. Agent 更贵，RAG 更便宜",
      "B. RAG 只是检索+生成，Agent 有规划、工具调用、反思的闭环",
      "C. Agent 用的模型更大",
      "D. 两者是一回事，只是名字不同"
    ],
    "answer": "B",
    "explanation": "RAG = 检索 + 生成（被动调用，一次完成）\nAgent = 感知 + 规划 + 工具调用 + 反思的多轮闭环（主动决策）\n\nAgent 核心能力：\n1. 规划（Plan）：拆解复杂任务\n2. 工具使用（Tool Use）：调用搜索/代码/API\n3. 记忆（Memory）：短期+长期记忆\n4. 反思（Reflection）：自我纠错\nRAG 可以是 Agent 的一个工具。\n",
    "tags": [
      "agent",
      "rag"
    ],
    "related": [
      "Agent vs RAG"
    ],
    "floor": 3
  },
  {
    "id": "rag-007",
    "difficulty": "medium",
    "type": "single",
    "question": "ReAct 框架的核心思想是什么？",
    "options": [
      "A. 只思考不行动",
      "B. 只行动不思考",
      "C. 推理（Reasoning）和行动（Acting）交替进行，边想边做",
      "D. 先做完全部推理再行动"
    ],
    "answer": "C",
    "explanation": "ReAct = Reasoning + Acting\n核心：让 LLM 交替生成「思考过程」和「行动」，\n每一步先想（推理为什么要做），再做（调用工具），\n再观察结果，再思考下一步... 形成闭环。\n这样模型的决策过程可解释，也能通过工具获取实时信息。\n",
    "tags": [
      "agent",
      "react"
    ],
    "related": [
      "ReAct 框架"
    ],
    "floor": 3
  },
  {
    "id": "rag-008",
    "difficulty": "hard",
    "type": "single",
    "question": "关于推理时计算量优化，以下哪种方法是「投机采样（Speculative Decoding）」的核心思路？",
    "options": [
      "A. 用小模型快速猜几个 token，大模型验证，对的就直接跳过",
      "B. 减少模型层数",
      "C. 用量化降低精度",
      "D. 用更短的 Prompt"
    ],
    "answer": "A",
    "explanation": "投机采样核心：用一个小模型（草稿模型）快速生成多个候选 token，\n然后用大模型并行验证（一次前向），猜对的 token 直接接受，\n猜错的从第一个错的地方重新生成。\n本质是用小模型的算力换大模型的解码步数，\n速度提升 2~3 倍，输出分布完全不变。\n",
    "tags": [
      "inference",
      "speculative-decoding",
      "optimization"
    ],
    "related": [
      "投机采样"
    ],
    "floor": 3
  },
  {
    "id": "rag-009",
    "difficulty": "medium",
    "type": "single",
    "question": "KV Cache 的作用是什么？",
    "options": [
      "A. 缓存模型权重，加快加载",
      "B. 缓存已生成 token 的 Key 和 Value，避免重复计算",
      "C. 缓存用户的历史对话",
      "D. 缓存数据库查询结果"
    ],
    "answer": "B",
    "explanation": "KV Cache：自回归生成时，每生成一个新 token，\n之前所有 token 的 K 和 V 都是不变的（因为注意力计算只依赖已有 token）。\n把它们缓存下来，下一步只算新 token 的 KV，\n不用重新算整个序列的，大幅减少计算量。\n这是推理加速的基础优化，所有框架都默认开。\n",
    "tags": [
      "inference",
      "kv-cache",
      "optimization"
    ],
    "related": [
      "KV Cache"
    ],
    "floor": 3
  },
  {
    "id": "rag-010",
    "difficulty": "hard",
    "type": "single",
    "question": "关于模型量化，以下哪个说法是正确的？",
    "options": [
      "A. 量化一定会显著降低模型效果",
      "B. GGUF 是一种量化格式，主要用于 llama.cpp",
      "C. 4bit 量化就是把模型缩小到原来的 1/4，速度也是 4 倍",
      "D. 量化只影响显存，不影响推理速度"
    ],
    "answer": "B",
    "explanation": "GGUF（GPT-Generated Unified Format）是 llama.cpp 推出的格式，\n支持多种量化精度（Q4_K_M, Q5_K_M, Q8_0 等），是本地推理的主流格式。\nA 错：4bit/8bit 在大模型上感知不明显，AWQ/GPTQ 质量很好。\nC 错：显存省 4 倍，但速度不是 4 倍（计算密度 + 访存瓶颈）。\nD 错：量化也能加速（计算量减少 + 访存减少）。\n",
    "tags": [
      "inference",
      "quantization",
      "gguf"
    ],
    "related": [
      "模型量化"
    ],
    "floor": 3
  },
  {
    "id": "rag-boss-1",
    "difficulty": "hard",
    "type": "open",
    "question": "请简述一个完整的 RAG 系统从文档接入到用户问答的完整流程，并说明至少 3 个关键优化点及其作用。",
    "answer": [
      "文档接入清洗预处理去重",
      "文档切块Chunking策略",
      "向量化Embedding模型生成向量",
      "存入向量数据库建立索引",
      "用户查询Query向量化",
      "向量检索召回TopK相关片段",
      "混合检索关键词BM25向量互补",
      "重排序Reranker精排提高精度",
      "拼接Prompt上下文LLM生成答案",
      "查询改写Query Rewriting扩展召回",
      "分块策略影响语义完整性召回率"
    ],
    "explanation": "RAG 完整流程：\n1. 离线阶段：文档采集 → 清洗/去重 → 切块（Chunking）→ Embedding 向量化 → 存入向量库\n2. 在线阶段：用户 Query → 向量化 → 检索 Top-K →（可选：重排序）→ 拼接到 Prompt → LLM 生成\n\n关键优化点：\n- 混合检索：BM25 + 向量，解决字面匹配和语义匹配互补\n- 重排序（Rerank）：初筛召回多一些，用 Cross-Encoder 精排，精准度大幅提升\n- 查询改写：用 LLM 扩展/改写用户问题，提高召回率（尤其针对短查询）\n- 文档切块：按语义切块优于固定长度，保证块内语义完整\n- 父文档检索：检索小块，返回父块，保证上下文完整\n",
    "tags": [
      "rag",
      "pipeline",
      "optimization",
      "boss"
    ],
    "min_keywords": 5,
    "floor": 3
  }
];
