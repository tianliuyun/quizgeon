// 题库注册中心（由 build 脚本自动生成）
// 请不要手动修改此文件，修改 questions/ 下的 YAML 源文件后重新构建
window.QUESTION_BANKS = {
  "frontend-basics": {
    "id": "frontend-basics",
    "name": "前端基础",
    "emoji": "🎨",
    "description": "前端入门基础题，适合新手热身",
    "questionCount": 5,
    "questions": [
      {
        "id": "fe-001",
        "difficulty": "easy",
        "type": "single",
        "question": "CSS 中 flex 和 inline-flex 的区别是什么？",
        "options": [
          "A. flex 是块级元素，inline-flex 是行内元素",
          "B. flex 更灵活",
          "C. 没有区别",
          "D. inline-flex 更快"
        ],
        "answer": "A",
        "explanation": "display: flex 创建的是块级（block-level）flex容器，默认占满整行宽度。\ndisplay: inline-flex 创建的是行内（inline-level）flex容器，宽度由内容决定。\n容器内部元素的行为是一样的，区别在于容器本身的布局行为。",
        "tags": [
          "css",
          "flex"
        ],
        "floor": 1
      },
      {
        "id": "fe-002",
        "difficulty": "easy",
        "type": "single",
        "question": "JavaScript 中 == 和 === 的区别？",
        "options": [
          "A. == 比较值，=== 比较值和类型",
          "B. === 比较值，== 比较值和类型",
          "C. 完全一样",
          "D. == 更快"
        ],
        "answer": "A",
        "explanation": "== 是宽松相等，会进行类型转换后再比较。\n=== 是严格相等，值和类型都要一致才返回 true。\n建议：99% 的场景用 ===，避免类型转换的坑。",
        "tags": [
          "javascript",
          "operator"
        ],
        "floor": 1
      },
      {
        "id": "fe-003",
        "difficulty": "medium",
        "type": "single",
        "question": "什么是闭包（Closure）？",
        "options": [
          "A. 一种设计模式",
          "B. 函数和其词法环境的组合，内部函数可以访问外部函数的变量",
          "C. 一种数据结构",
          "D. CSS 的属性"
        ],
        "answer": "B",
        "explanation": "闭包 = 函数 + 词法环境。\n当一个函数在另一个函数内部定义时，内部函数可以访问外部函数作用域的变量，即使外部函数已经执行完毕。\n用途：数据私有化、柯里化、回调函数等。",
        "tags": [
          "javascript",
          "closure"
        ],
        "floor": 2
      },
      {
        "id": "fe-004",
        "difficulty": "medium",
        "type": "single",
        "question": "React 中 useEffect 的依赖数组为空数组 [] 时，什么时候执行？",
        "options": [
          "A. 每次渲染都执行",
          "B. 只在组件挂载时执行一次",
          "C. 永远不执行",
          "D. 只在卸载时执行"
        ],
        "answer": "B",
        "explanation": "useEffect(fn, []) — 空依赖数组：只在组件挂载后执行一次（componentDidMount）。\n不传依赖数组：每次渲染后都执行。\n有依赖项：依赖项变化时执行。\n返回函数：组件卸载时执行（componentWillUnmount）。",
        "tags": [
          "react",
          "hooks",
          "useeffect"
        ],
        "floor": 2
      },
      {
        "id": "fe-005",
        "difficulty": "easy",
        "type": "single",
        "question": "什么是事件委托（Event Delegation）？",
        "options": [
          "A. 把事件处理函数外包给别人",
          "B. 利用事件冒泡，把子元素的事件监听器绑在父元素上",
          "C. 一种动画效果",
          "D. 把事件存起来慢慢处理"
        ],
        "answer": "B",
        "explanation": "事件委托：利用事件冒泡机制，把多个子元素的事件监听器统一绑在父元素上。\n好处：1) 减少内存占用（不用每个子元素都绑）；2) 动态新增的子元素自动有事件处理；3) 代码更简洁。",
        "tags": [
          "javascript",
          "dom",
          "event"
        ],
        "floor": 1
      }
    ]
  },
  "llm-interview": {
    "id": "llm-interview",
    "name": "大模型面试",
    "emoji": "🧠",
    "description": "大模型工程师面试题库，覆盖 Transformer / 预训练 / SFT / RAG / Agent / 推理优化",
    "questionCount": 117,
    "questions": [
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
        "explanation": "自注意力公式 Attention(Q,K,V)=softmax(QKᵀ/√dₖ)·V。除以 √dₖ 是缩放因子，防止点积过大导致 softmax 饱和进入梯度平缓区。",
        "tags": [
          "transformer",
          "attention"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "缩放因子 √dₖ 的作用是什么？不缩放会怎样？",
          "为什么用 QKᵀ 而不是 QVᵀ 计算注意力分数？"
        ],
        "floor": 1
      },
      {
        "id": "trans-002",
        "difficulty": "easy",
        "type": "single",
        "question": "Multi-Head Attention 的「多头」主要作用是什么？",
        "options": [
          "A. 减少参数量，加快计算",
          "B. 在不同子空间学习不同类型的依赖关系",
          "C. 让序列长度可以任意扩展",
          "D. 替代残差连接的作用"
        ],
        "answer": "B",
        "explanation": "多头让模型在不同表示子空间同时关注不同类型依赖（句法/指代/远距离）。多头不增加总参数量（d_model 拆成 h 头，每头 d_k=d_model/h）。",
        "tags": [
          "transformer",
          "multi-head"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "多头注意力为什么不增加总参数量？",
          "如果只用单头注意力，模型会损失什么能力？"
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
          "C. BatchNorm 无法用 GPU 加速",
          "D. LayerNorm 不需要训练参数"
        ],
        "answer": "B",
        "explanation": "BN 在同一 batch 的同一特征维度归一化，受 batch 大小和序列 padding 影响；LN 对每个样本所有特征维度归一化，不依赖 batch 和序列长度。三个原因：序列长度不一/padding、batch 小统计不稳、推理时全局统计量不好用。",
        "tags": [
          "transformer",
          "normalization"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "现代大模型常用 RMSNorm，它和 LayerNorm 有什么区别？",
          "如果 batch size 很大且序列等长，BN 是否可行？"
        ],
        "floor": 1
      },
      {
        "id": "trans-004",
        "difficulty": "medium",
        "type": "single",
        "question": "自注意力机制的时间复杂度是？",
        "options": [
          "A. O(n)，n 是序列长度",
          "B. O(n²)，n 是序列长度",
          "C. O(n²·d)，d 是隐藏维度",
          "D. O(n·d)"
        ],
        "answer": "C",
        "explanation": "QKᵀ 计算是 O(n²·d)，n 是序列长度。所以长序列下注意力是瓶颈，引出稀疏注意力、线性注意力、FlashAttention 等优化。",
        "tags": [
          "transformer",
          "complexity"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "长序列场景下，有哪些降低注意力复杂度的方法？",
          "FlashAttention 为什么能省显存？"
        ],
        "floor": 2
      },
      {
        "id": "trans-005",
        "difficulty": "medium",
        "type": "single",
        "question": "Transformer 解决梯度消失、能处理长距离依赖的关键机制是？",
        "options": [
          "A. 更深的网络 + 更大的词表",
          "B. 残差连接 + 注意力机制的直接通路",
          "C. 增大学习率",
          "D. 权值共享"
        ],
        "answer": "B",
        "explanation": "残差连接让梯度通过恒等路径直接回传；注意力让任意两位置直接相连，梯度一跳就到，不存在长距离衰减。RNN 梯度连乘消失，Transformer 靠这两点取代 RNN。",
        "tags": [
          "transformer",
          "gradient"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "RNN/LSTM 为什么会有梯度消失？LSTM 缓解了但没有根治的原因？",
          "残差连接在 Transformer 中具体加在哪里？"
        ],
        "floor": 2
      },
      {
        "id": "trans-006",
        "difficulty": "easy",
        "type": "boolean",
        "question": "位置编码是 Transformer 必需的，因为自注意力本身对 token 顺序不敏感（置换等变）。",
        "answer": true,
        "explanation": "自注意力对输入集合做加权，不含顺序信息，交换两个 token 位置输出不变（若键值对也交换）。必须加位置编码（绝对/相对/RoPE/ALiBi）注入位置信息。",
        "tags": [
          "transformer",
          "position-encoding"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "相对位置编码和绝对位置编码的区别？",
          "RoPE（旋转位置编码）为什么被大模型广泛采用？"
        ],
        "floor": 1
      },
      {
        "id": "trans-007",
        "difficulty": "medium",
        "type": "boolean",
        "question": "Decoder-only 模型使用因果掩码（causal mask），保证当前位置只能看到过去的 token。",
        "answer": true,
        "explanation": "Decoder-only 生成时不能看到未来 token，用上三角掩码（-inf）实现因果性。这是 GPT 系列与 BERT（双向）的核心区别。",
        "tags": [
          "transformer",
          "decoder"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "Encoder-only 和 Decoder-only 在注意力上的本质区别是什么？",
          "为什么现代大模型趋向 Decoder-only 大一统？"
        ],
        "floor": 2
      },
      {
        "id": "trans-008",
        "difficulty": "hard",
        "type": "open",
        "question": "请完整描述 Self-Attention 的计算过程（从输入 X 到输出），并说明每个步骤的作用。",
        "points": [
          "输入 X 乘 Wq/Wk/Wv 得到 Q/K/V（线性投影，学习不同表示空间）",
          "注意力分数 = Q·Kᵀ/√dₖ（点积衡量相似度，缩放防 softmax 饱和）",
          "softmax 归一化得到注意力权重（概率分布，权重和为 1）",
          "加权求和 V（按注意力权重聚合信息，输出每个位置的上下文表示）",
          "说明复杂度 O(n²·d) 或长序列瓶颈"
        ],
        "answer": [
          "计算 Q、K、V 三个矩阵",
          "QKᵀ 缩放、softmax、加权 V"
        ],
        "explanation": "四步：投影→打分→归一化→加权聚合。注意要讲清\"为什么除以 √dₖ\"和\"为什么 softmax\"。",
        "tags": [
          "transformer",
          "attention"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "如果 dₖ 很大，不缩放会出什么问题？",
          "注意力权重矩阵可视化的意义是什么？"
        ],
        "floor": 3
      },
      {
        "id": "trans-009",
        "difficulty": "hard",
        "type": "open",
        "question": "对比 LayerNorm 和 BatchNorm，说明为什么 NLP 首选 LayerNorm（至少三点），并说明现代模型常用 RMSNorm 的原因。",
        "points": [
          "LN 按样本在特征维归一化，BN 按 batch 在特征维归一化（定义对比）",
          "NLP 序列长度不一/padding 影响 BN 统计量",
          "batch size 小（显存限制）BN 统计不稳定",
          "推理时 BN 全局统计量不适用于变长序列；LN 无需全局统计",
          "RMSNorm 去掉均值中心化只做缩放，更快更稳（可选加分）"
        ],
        "answer": [
          "LN 按样本归一化，不依赖 batch",
          "序列长度不一、batch 小、推理变长三个原因"
        ],
        "explanation": "三点核心 + RMSNorm 加分项。答出定义对比 + 至少三个原因得满分。",
        "tags": [
          "transformer",
          "normalization"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "什么场景下 BatchNorm 反而更合适？"
        ],
        "floor": 3
      },
      {
        "id": "trans-010",
        "difficulty": "medium",
        "type": "single",
        "question": "KV Cache 解决什么问题？",
        "options": [
          "A. 减少模型的参数量",
          "B. 复用已生成的 token 的 K/V，避免重复计算",
          "C. 加快预训练速度",
          "D. 让模型支持无限上下文"
        ],
        "answer": "B",
        "explanation": "生成第 n 个 token 时，前 n-1 个 token 的 K/V 已算过，缓存复用，不用每次重算全部。Decode 阶段每次只算最新 token 的 KV。",
        "tags": [
          "inference",
          "kv-cache"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "variants": [
          "Prefill 和 Decode 阶段分别的瓶颈是什么？",
          "KV Cache 的显存占用和什么成正比？"
        ],
        "floor": 2
      },
      {
        "id": "trans-011",
        "difficulty": "hard",
        "type": "single",
        "question": "PagedAttention 提升吞吐的核心思想是什么？",
        "options": [
          "A. 用更小的模型",
          "B. 把 KV Cache 分成固定大小的页，用页表管理，物理页可离散存放",
          "C. 减少输入长度",
          "D. 批量推理时合并 prompt"
        ],
        "answer": "B",
        "explanation": "借鉴操作系统虚拟内存管理：KV Cache 分页 + 页表映射，物理页不连续、按需分配，消除显存碎片和 padding 浪费，显存利用率 40-60%→90%+，配合 continuous batching 吞吐提升 2-4 倍。这是 vLLM 的核心。",
        "tags": [
          "inference",
          "vllm"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "variants": [
          "传统 KV Cache 的显存碎片问题是怎么产生的？",
          "Continuous batching 和 PagedAttention 如何配合？"
        ],
        "floor": 3
      },
      {
        "id": "pre-001",
        "difficulty": "easy",
        "type": "single",
        "question": "关于预训练、SFT、RLHF 三阶段的关系，说法正确的是？",
        "options": [
          "A. 预训练用几万条指令数据，SFT 用万亿 token 互联网文本",
          "B. 预训练给知识、SFT 给格式、对齐给价值观，数据量递减、主观度递增",
          "C. 三个阶段训练目标相同，只是数据量不同",
          "D. 对齐（RLHF）在预训练之前进行"
        ],
        "answer": "B",
        "explanation": "预训练用海量互联网文本（万亿 token）学语言和世界知识；SFT 用几万~几十万条指令数据学按指令回答；对齐用人类偏好数据让输出符合有用/无害/诚实。口诀：预训练给知识，SFT 给格式，对齐给价值观。数据量递减、主观度递增，顺序不能乱。",
        "tags": [
          "pretrain",
          "sft",
          "rlhf",
          "pipeline"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "每个阶段分别用什么数据、训练目标是什么？",
          "Base Model / SFT Model / Chat Model 分别对应哪个阶段？"
        ],
        "floor": 2
      },
      {
        "id": "pre-002",
        "difficulty": "easy",
        "type": "single",
        "question": "SFT 训练时，为什么把对话中 user 部分的 labels 设为 -100？",
        "options": [
          "A. 让模型学会复述用户的问题",
          "B. 只想让模型学会「如何回答」，不需要背熟用户提问，-100 让交叉熵自动忽略该部分",
          "C. 减少训练数据量，加快训练",
          "D. 防止梯度爆炸"
        ],
        "answer": "B",
        "explanation": "对话数据形如 <|user|>问题<|assistant|>回答，把 user 部分 labels 设为 -100，交叉熵自动忽略、不计算 loss。目的是让模型只学会如何回答问题，而不是背熟用户的问题。这就是 Label Mask 技巧。",
        "tags": [
          "sft",
          "label-mask"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "-100 在交叉熵计算里具体是怎么起作用的？",
          "如果 user 部分也算 loss，模型会学到什么不好的东西？"
        ],
        "floor": 2
      },
      {
        "id": "pre-003",
        "difficulty": "medium",
        "type": "single",
        "question": "LoRA 用 W + A×B 近似权重更新，为什么 B 初始化为 0、A 随机初始化？",
        "options": [
          "A. 让训练收敛更快",
          "B. 初始时 A×B=0，输出与冻结的原模型完全一致，微调从原模型能力出发，训练稳定",
          "C. 减少可训练参数量",
          "D. 避免过拟合"
        ],
        "answer": "B",
        "explanation": "B 初始化为 0 则 ΔW = A×B = 0，初始输出与冻结的原模型完全一致，微调从原模型已有能力出发，训练稳定。如果 A、B 都随机初始化，一开始就扰动输出，容易破坏模型已学到的能力。",
        "tags": [
          "lora",
          "finetune"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "推理时为什么可以把 A×B 合并回 W，实现零额外延迟？",
          "如果 A、B 都随机初始化会有什么问题？"
        ],
        "floor": 3
      },
      {
        "id": "pre-004",
        "difficulty": "medium",
        "type": "single",
        "question": "PPO 训练需要 4 个模型，其中被冻结（不更新权重）的是哪两个？",
        "options": [
          "A. Actor 和 Critic",
          "B. Reward Model 和 Reference Model",
          "C. Actor 和 Reward Model",
          "D. Critic 和 Reference Model"
        ],
        "answer": "B",
        "explanation": "Actor（生成回答）和 Critic（估计 V(s)、算 Advantage）在训练中更新；Reward Model 冻结，负责给回答打分；Reference Model 冻结，负责算 KL 散度防止模型漂移。口诀：演员+评委+老师+标杆，2 个训练、2 个冻结。",
        "tags": [
          "rlhf",
          "ppo"
        ],
        "week": "week17-强化学习",
        "project": "none",
        "stack": "rl",
        "variants": [
          "Reference Model 的作用是什么？为什么需要它？",
          "奖励公式 reward = r − β·KL 里 KL 惩罚项的意义是什么？"
        ],
        "floor": 3
      },
      {
        "id": "pre-005",
        "difficulty": "medium",
        "type": "single",
        "question": "关于 DPO 和 PPO 的区别，说法正确的是？",
        "options": [
          "A. DPO 需要显式训练奖励模型 RM，PPO 不需要",
          "B. PPO 是显式 RL 循环（RM 打分 + 策略更新），DPO 把奖励模型隐式消解在损失函数里，直接做监督学习",
          "C. DPO 比 PPO 表达能力更强，支持在线探索",
          "D. 两者复杂度相同，只是实现框架不同"
        ],
        "answer": "B",
        "explanation": "PPO 是显式 RL 循环：SFT → 训练 RM → PPO 更新策略，4 个模型、需精细调参，表达能力强制可在线探索，适合通用对话对齐。DPO 跳过 RM 和 PPO，直接在偏好对（好回答 vs 坏回答）上做监督学习，拉大相对概率差，简单稳定，但受限于离线数据、表达能力弱。",
        "tags": [
          "dpo",
          "ppo",
          "alignment"
        ],
        "week": "week17-强化学习",
        "project": "none",
        "stack": "rl",
        "variants": [
          "DPO 的损失函数在做什么？为什么能跳过奖励模型？",
          "什么场景选 PPO，什么场景选 DPO？"
        ],
        "floor": 3
      },
      {
        "id": "pre-006",
        "difficulty": "easy",
        "type": "boolean",
        "question": "BERT 是 Encoder-only 双向注意力架构，适合理解类任务（分类/NER）；GPT 是 Decoder-only 因果掩码架构，适合生成类任务。",
        "answer": true,
        "explanation": "BERT 双向注意力，预训练任务为 MLM（掩码语言模型）+ NSP，擅长理解类任务（分类、匹配、NER），微调方式是加分类头；GPT 单向因果掩码，预训练任务为 CLM（因果语言模型），擅长生成类任务（对话、写作），微调方式是 SFT/RLHF。理解类任务选 BERT 又快又准，生成类任务只能选 GPT 系。",
        "tags": [
          "bert",
          "gpt",
          "architecture"
        ],
        "week": "week4-语言模型",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "理解类任务和生成类任务分别选什么架构？选型原则是什么？",
          "为什么现在大模型趋向 Decoder-only 大一统？"
        ],
        "floor": 2
      },
      {
        "id": "pre-007",
        "difficulty": "medium",
        "type": "boolean",
        "question": "预训练的目标（预测下一个词）与对齐的目标（输出有帮助、无害、诚实的回答）本质上是同一件事。",
        "answer": false,
        "explanation": "预训练目标 = 预测下一个 token，学到的是「互联网上的人怎么说」，不代表「助手应该怎么说」；对齐（RLHF/DPO/GRPO）用人类偏好把模型拉向有用/无害/诚实。两者目标不同，这正是对齐阶段存在的原因——如果目标相同就不需要对齐了。",
        "tags": [
          "pretrain",
          "alignment"
        ],
        "week": "week17-强化学习",
        "project": "none",
        "stack": "rl",
        "variants": [
          "为什么纯预训练的 Base Model 不适合直接当助手？",
          "对齐税是什么？为什么 RLHF 后某些能力会轻微退化？"
        ],
        "floor": 3
      },
      {
        "id": "pre-008",
        "difficulty": "medium",
        "type": "boolean",
        "question": "LoRA 训练时冻结原始权重、只更新低秩矩阵 A 和 B；推理时可以把 A×B 合并回原始权重 W，推理零额外延迟。",
        "answer": true,
        "explanation": "训练时 W 冻结，只更新 A、B（可训练参数通常 0.1%~1%），优化器状态也只给 LoRA 参数，所以省显存。推理时预先算好 W' = W + A×B 合并后的权重，参数量与全量模型一样，无额外计算延迟；而且一个基座可以挂多个 LoRA 适配器，切换场景只换适配器。",
        "tags": [
          "lora",
          "inference"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "LoRA 省显存的核心原因是什么？",
          "可训练参数大约占多少比例（r=8 时）？"
        ],
        "floor": 3
      },
      {
        "id": "pre-009",
        "difficulty": "hard",
        "type": "open",
        "question": "请完整描述大模型从原始文本到可对话助手的全流程（预训练与微调），说明每个阶段的目标、数据、训练目标和产出。",
        "points": [
          "数据准备：清洗、去重（MinHash/SimHash）、质量过滤、分词（BPE/WordPiece），产出万亿 token 级高质量语料",
          "预训练：Next Token Prediction（下一词预测）+ 交叉熵损失，用万亿 token 互联网文本，产出 Base Model（续写器），学会语言能力和世界知识",
          "SFT：几万~几十万条高质量指令数据，交叉熵但只算 assistant 部分（Label Mask），产出 SFT Model（学会听指令、对话格式）",
          "对齐：人类偏好数据（偏好对/可验证奖励），用 PPO/DPO/GRPO，产出 Chat Model（对话助手），符合有用/无害/诚实",
          "总结口诀：预训练给知识、SFT 给格式、对齐给价值观；数据量递减、主观度递增（可选加分）"
        ],
        "answer": [
          "四阶段及各阶段目标",
          "每阶段的数据量级与训练目标",
          "每阶段产出（Base/SFT/Chat Model）"
        ],
        "explanation": "按「数据准备 → 预训练 → SFT → 对齐」顺序答出每阶段「数据量 + 训练目标 + 产出」三个要素即可，用口诀「预训练给知识、SFT 给格式、对齐给价值观」总结得满分。",
        "tags": [
          "pretrain",
          "sft",
          "alignment",
          "pipeline"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "为什么 Base Model 不能直接当助手用？",
          "如果跳过 SFT 直接做 RLHF 会怎样？（R1-Zero 的启示）"
        ],
        "floor": 4
      },
      {
        "id": "pre-010",
        "difficulty": "hard",
        "type": "open",
        "question": "对比 RLHF/PPO、DPO、GRPO 三种对齐方法，说明各自的原理、优缺点和适用场景。",
        "points": [
          "RLHF 三步骤：SFT → 训练奖励模型 RM（偏好对，损失 -log σ(r_w - r_l)，好回答得分高于坏回答）→ PPO 强化学习",
          "PPO 四模型：Actor（训练更新，生成回答）+ Critic（训练更新，估计 V(s) 算 Advantage）+ Reward Model（冻结，打分）+ Reference Model（冻结，算 KL 散度防漂移）；奖励 = r − β·KL；PPO Clip 把策略更新限制在 [1-ε, 1+ε]",
          "DPO：跳过 RM+PPO，把奖励模型隐式消解在损失函数里，直接在偏好对（好回答 vs 坏回答）上做监督学习，拉大相对概率差；简单稳定、显存低，但受限于离线数据、表达能力弱",
          "GRPO：用组内平均奖励代替 Critic，A_i = (r_i - mean(r)) / std(r)，省约 25% 显存、避免 Critic 训练不稳定；3 个模型（Actor + RM + Reference）；适合可验证奖励（数学、代码、格式遵循），不适合开放对话",
          "对比维度：PPO 复杂度高需精细调参、表达能力强；DPO 简单稳定、表达受限；对齐税：RLHF 后能力可能轻微退化（可选加分）"
        ],
        "answer": [
          "三种方法的原理一句话概括",
          "PPO 的四模型与奖励公式",
          "各自的优缺点与适用场景"
        ],
        "explanation": "三种方法各答出「原理一句话 + 关键机制 + 适用场景」：PPO 答出四模型和 KL 惩罚，DPO 答出隐式奖励、跳过 RL 循环，GRPO 答出组内相对优势、去掉 Critic，即得满分。",
        "tags": [
          "rlhf",
          "ppo",
          "dpo",
          "grpo",
          "alignment"
        ],
        "week": "week17-强化学习",
        "project": "none",
        "stack": "rl",
        "variants": [
          "为什么 GRPO 不需要 Critic？能省多少显存？",
          "数学/代码场景选哪种对齐方法，开放对话场景选哪种？"
        ],
        "floor": 4
      },
      {
        "id": "pre-011",
        "difficulty": "medium",
        "type": "open",
        "question": "解释 LoRA 的原理、为什么它有效，以及 r 和 alpha 怎么选？",
        "points": [
          "原理：冻结原始权重 W，加两个低秩矩阵 A 和 B，W + A×B 近似权重更新量 ΔW；A 随机初始化、B 初始化为 0，训练只更新 A、B",
          "为什么有效：大模型的权重更新本质上是低秩的，只有少数方向需要改变，低秩近似足够表达",
          "r（秩）选择：一般 4~64，越大越灵活但参数越多，从 8 开始试；经验：效果不够加大 r，过拟合减小 r",
          "alpha 选择：缩放因子，一般 alpha = r × 2，实际效果相当于把 LoRA 输出乘以 alpha/r",
          "优势：可训练参数 0.1%~1%（r=8 时约 0.22%），省显存（约 90%），一个基座挂多个适配器切换场景快，推理可合并零延迟"
        ],
        "answer": [
          "W + A×B 的低秩分解原理与初始化方式",
          "低秩假设（权重更新本质低秩）",
          "r/alpha 的选择方法与经验"
        ],
        "explanation": "原理（冻结 W + 低秩 A×B）、有效性（低秩假设）、参数选择（r 从 8 起、alpha=2r、过拟合减 r）、优势（参数占比/显存/多适配器/推理合并）四块答齐得满分。",
        "tags": [
          "lora",
          "finetune",
          "parameter-efficient"
        ],
        "week": "week5-大语言模型初探",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "LoRA 和全量微调各自优劣？长训练、大数据量时谁的上限更高？",
          "一个基座挂多个 LoRA 适配器的应用场景是什么？"
        ],
        "floor": 3
      },
      {
        "id": "rag-001",
        "difficulty": "easy",
        "type": "single",
        "question": "生产级 RAG 常用的混合检索（Hybrid Search）由哪两种检索方式组成？",
        "options": [
          "A. 向量检索（语义相似度）+ BM25 关键词检索",
          "B. 向量检索 + 重排模型",
          "C. TF-IDF + 倒排索引",
          "D. 全文检索 + 正则匹配"
        ],
        "answer": "A",
        "explanation": "混合检索 = 向量检索管语义 + BM25 管关键词精确匹配，互补召回后再用 RRF 融合。向量管语义泛化，BM25 管专有名词/型号的精确匹配。",
        "tags": [
          "rag",
          "hybrid-search"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "向量检索和 BM25 各自擅长什么场景？",
          "RRF 融合是怎么工作的，为什么不需要调权重？"
        ],
        "floor": 3
      },
      {
        "id": "rag-002",
        "difficulty": "easy",
        "type": "single",
        "question": "企业内部知识库问答（产品文档、政策问答，需要实时更新且答案可溯源），首选哪个方案？",
        "options": [
          "A. 全量微调",
          "B. LoRA 微调",
          "C. RAG",
          "D. 纯提示词工程（不检索）"
        ],
        "answer": "C",
        "explanation": "知识类问题首选 RAG：加文档即更新、可引用溯源、幻觉相对可控、不需要训练数据。微调适合风格/能力/格式对齐类问题；知识更新要重新训练且无法溯源。",
        "tags": [
          "rag",
          "finetune",
          "选型"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "RAG 和微调各自的适用场景是什么？",
          "什么情况下 RAG 和微调结合效果最好？"
        ],
        "floor": 3
      },
      {
        "id": "rag-003",
        "difficulty": "medium",
        "type": "single",
        "question": "Reranker（重排模型）比向量检索排序更准的根本原因是什么？",
        "options": [
          "A. 重排模型的参数量更大",
          "B. 向量检索是双塔结构，问题和文档分别编码、交互少；重排模型是单塔，问题和文档一起输入做 Cross-Attention 交互",
          "C. 重排模型不需要向量化，所以更快",
          "D. 重排模型能直接检索全量文档，不用先粗排"
        ],
        "answer": "B",
        "explanation": "向量检索是\"双塔\"（query 和 doc 分别编码再算余弦相似度），交互少所以快；重排是\"单塔\"CrossEncoder，query+doc 一起输入充分交互，更准但慢，所以只能对粗排 Top50-100 精排到 Top3-5。经典组合可提升准确率 20%+。",
        "tags": [
          "rag",
          "rerank",
          "cross-encoder"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "为什么重排模型不能直接用来做检索？",
          "经典的两阶段检索流程（粗排 + 精排）是怎样的？"
        ],
        "floor": 4
      },
      {
        "id": "rag-004",
        "difficulty": "medium",
        "type": "single",
        "question": "关于 Function Calling 和 MCP 的关系，下列说法正确的是？",
        "options": [
          "A. 两者是同一件事，只是叫法不同",
          "B. Function Calling 是模型的基础能力（按 JSON Schema 输出结构化调用参数），MCP 是工具标准化接入协议（工具发现/调用/返回），属于不同层级",
          "C. MCP 是模型能力，Function Calling 是工具生态协议",
          "D. Function Calling 是 Anthropic 提出的，MCP 是 OpenAI 提出的"
        ],
        "answer": "B",
        "explanation": "Function Calling 定义\"模型怎么说要调用工具\"（协议层，OpenAI 先做）；MCP 定义\"工具怎么提供给模型\"（更上层的工具生态协议，JSON-RPC/stdio，Anthropic 提出）。类比：FC 是\"电\"，MCP 是\"插座标准\"。",
        "tags": [
          "agent",
          "function-calling",
          "mcp"
        ],
        "week": "week11-工具调用",
        "project": "none",
        "stack": "agent",
        "variants": [
          "没有 Function Calling，MCP 还能工作吗？",
          "MCP 给工具接入带来了什么好处（一次接入到处可用）？"
        ],
        "floor": 4
      },
      {
        "id": "rag-005",
        "difficulty": "hard",
        "type": "single",
        "question": "约束解码（guided_json）能保证工具调用参数 100% 符合 JSON Schema，其核心原理是？",
        "options": [
          "A. 生成完成后用正则校验，不合格就重试",
          "B. 生成每一步根据当前解析状态计算合法 token 集合，把不合法 token 的概率设为 -inf，模型只能从合法 token 里选",
          "C. 用参数量更小的模型来生成 JSON",
          "D. 在 system prompt 里反复强调必须输出合法 JSON"
        ],
        "answer": "B",
        "explanation": "约束解码在采样时做语法约束：根据已生成内容的解析状态，实时计算\"下一个 token 可以是哪些\"，把不合法的概率置为 -inf。Schema 通过率从 60-80% 提升到 100%，推理速度影响 <5%，vLLM / llama.cpp 都支持。",
        "tags": [
          "agent",
          "guided-json",
          "约束解码"
        ],
        "week": "week11-工具调用",
        "project": "none",
        "stack": "agent",
        "variants": [
          "约束解码对推理速度影响大吗？",
          "哪些场景适合用约束解码？"
        ],
        "floor": 4
      },
      {
        "id": "rag-006",
        "difficulty": "medium",
        "type": "single",
        "question": "生产级 RAG 对检索质量要求高时（如技术文档问答），推荐哪种分块策略？",
        "options": [
          "A. 固定大小分块（按 token 数一刀切）",
          "B. 父子块：小 chunk 检索，命中后返回父 chunk 给 LLM",
          "C. 不切块，整篇文档作为一个块",
          "D. 按随机长度切分"
        ],
        "answer": "B",
        "explanation": "父子块兼顾检索精度和上下文完整：小块命中精准，返回大块给 LLM 保证生成上下文完整，是生产级推荐；固定分块简单但语义可能被切断，准确率比语义/父子块低 15%+。",
        "tags": [
          "rag",
          "chunking"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "固定大小分块有什么缺点？",
          "文档结构清晰时，语义分块和固定分块怎么选？"
        ],
        "floor": 4
      },
      {
        "id": "rag-007",
        "difficulty": "easy",
        "type": "boolean",
        "question": "RAG 幻觉控制中，\"检索内容相关性低时主动拒绝回答（如回复'资料中未找到相关内容'）\"是一种合理的控制手段。",
        "answer": true,
        "explanation": "这是幻觉控制三件套之一（低置信度主动拒绝）：重排分数低于阈值就不硬答，避免模型基于不相关内容编造答案。",
        "tags": [
          "rag",
          "hallucination"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "幻觉控制的三件套具体是哪三件？",
          "除了三件套，还有哪些进阶的幻觉控制手段？"
        ],
        "floor": 3
      },
      {
        "id": "rag-008",
        "difficulty": "easy",
        "type": "boolean",
        "question": "对于\"EDS v3.8.2 新增了什么功能\"这类含产品型号的查询，纯向量检索通常比 BM25 关键词检索匹配得更精确。",
        "answer": false,
        "explanation": "向量检索擅长语义匹配，但对专有名词/精确术语/产品型号的字符串匹配不如 BM25。BM25 能精确匹配\"EDS v3.8.2\"，纯向量可能召回语义相近但型号不对的内容——这正是要用混合检索的原因。",
        "tags": [
          "rag",
          "hybrid-search",
          "bm25"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "举一个向量检索会翻车、BM25 更准的查询例子？",
          "混合检索的结果是怎么融合排序的？"
        ],
        "floor": 3
      },
      {
        "id": "rag-009",
        "difficulty": "medium",
        "type": "boolean",
        "question": "ReAct 循环中，只要工具足够多、模型足够强，就不需要设置最大步数限制。",
        "answer": false,
        "explanation": "最大步数是防死循环最兜底的硬限制，必须有。此外还要配合重复 Action 检测（同样工具同样参数连续调用则打断）、Observation 质量监控（无新信息时提示换方法）、反思机制（多步无进展时停下反思）。",
        "tags": [
          "agent",
          "react",
          "死循环"
        ],
        "week": "week12-AGENT",
        "project": "none",
        "stack": "agent",
        "variants": [
          "Agent 循环的终止条件有哪些？",
          "检测到 Agent 死循环时，有哪些处理手段？"
        ],
        "floor": 4
      },
      {
        "id": "rag-010",
        "difficulty": "hard",
        "type": "open",
        "question": "请完整描述一个生产级 RAG 系统的流程（离线索引 + 在线检索两阶段），并说明各环节的作用。",
        "points": [
          "离线索引阶段：文档清洗 → 分块 → 向量化 → 存入向量库 + 建 BM25 索引（清洗去噪音、分块控制检索粒度、向量化便于相似度计算）",
          "在线检索阶段：用户问题 → 查询改写 → 混合检索（向量 + BM25）→ RRF 融合 → 重排 → 上下文组装 → LLM 生成答案",
          "至少讲清 3 个环节的作用：分块（太大不精确、太小没上下文）、混合检索（语义 + 关键词互补）、重排（粗排 Top50 精排 Top5）、上下文组装（拼 prompt）、生成（基于上下文回答）",
          "加分项：幻觉控制（只基于上下文回答 + 引用溯源 + 低置信度拒绝）或评估体系（Hit Rate@K / MRR + RAGAS）"
        ],
        "answer": [
          "离线：清洗 → 分块 → 向量化 → 向量库 + BM25 索引",
          "在线：查询改写 → 混合检索 → RRF → 重排 → 组装上下文 → LLM 生成"
        ],
        "explanation": "两阶段缺一不可：离线建好索引，在线才能检索。重点考察分块、混合检索、重排的作用，能补上幻觉控制和评估体系说明才是真懂生产落地。",
        "tags": [
          "rag",
          "全流程"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "分块大小对检索效果有什么影响？",
          "怎么评估一个 RAG 系统的效果（三层评估体系）？",
          "如果检索准确率上不去，你会从哪些方向排查？"
        ],
        "floor": 4
      },
      {
        "id": "rag-011",
        "difficulty": "medium",
        "type": "open",
        "question": "为什么要用混合检索？只用向量检索不行吗？",
        "points": [
          "向量检索擅长语义匹配（同义改写、模糊表达），但对专有名词/精确术语/产品型号的精确匹配弱",
          "BM25 擅长精确字符串匹配（如 EDS v3.8.2），但缺乏语义泛化能力",
          "两者互补：混合检索同时召回语义相关和精确命中的内容，召回更全更准",
          "融合方式：RRF（Reciprocal Rank Fusion）按排名倒数加权，无需调权重、鲁棒性好",
          "结论：生产级 RAG 基本都是混合检索，纯向量准确率不够"
        ],
        "answer": [
          "向量管语义、BM25 管精确匹配，互补",
          "用 RRF 融合，是生产级标配"
        ],
        "explanation": "核心是讲清\"互补\"：向量解决\"意思相近\"，BM25 解决\"字符串完全一致\"。能举出型号/专有名词的例子（如 EDS v3.8.2）加分。",
        "tags": [
          "rag",
          "hybrid-search"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "RRF 融合和加权分数融合（如 0.5×向量 + 0.5×BM25）相比有什么优势？",
          "什么场景下纯向量检索就够用？"
        ],
        "floor": 4
      },
      {
        "id": "rag-012",
        "difficulty": "hard",
        "type": "open",
        "question": "RAG 场景下怎么控制幻觉？请给出三层控制手段并说明原理。",
        "points": [
          "第一层 Prompt 约束：明确要求只能基于检索上下文回答，上下文里没有的就说不知道",
          "第二层 答案溯源：每个结论标注引用编号 [1][2] 并可跳到原文，用户可验证，模型有引用约束也不容易瞎编",
          "第三层 低置信度主动拒绝：重排分数低于阈值时回复\"资料中未找到相关内容\"，不硬答",
          "进阶手段：让模型先在上下文找证据再组织答案（CoT for RAG）、Self-check（生成后自查）、多轮追问验证",
          "加分项：给出实测效果（如 Faithfulness 0.85+）"
        ],
        "answer": [
          "Prompt 约束（只能基于上下文回答）",
          "引用溯源 [1][2]",
          "低置信度主动拒绝"
        ],
        "explanation": "三层是 Prompt 约束 → 引用溯源 → 主动拒绝，层层兜底。能补进阶手段（CoT/Self-check）和量化指标（Faithfulness）说明有落地经验。",
        "tags": [
          "rag",
          "hallucination"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "为什么\"引用溯源\"本身就能降低幻觉？",
          "Faithfulness 指标衡量的是什么？怎么评估？"
        ],
        "floor": 4
      },
      {
        "id": "rag-013",
        "difficulty": "medium",
        "type": "open",
        "question": "请描述 ReAct 范式，说明 Thought-Action-Observation 循环是怎么工作的，以及循环如何终止。",
        "points": [
          "ReAct = Reasoning + Acting，推理与行动交替进行",
          "循环过程：Thought（想清楚下一步要做什么）→ Action（调用工具并给出参数）→ Observation（拿到工具返回结果）→ 再 Thought…直到得出答案 → Final Answer",
          "为什么有效：走一步看一步、不一次性编完；每一步都能拿到外部信息，不会瞎编；Thought 全程可见、可审计、可 debug",
          "终止条件：任务完成（输出 Final Answer）/ 达到最大步数 / 工具连续调用失败 / 模型主动放弃",
          "加分项：防死循环手段（重复 Action 检测、Observation 质量监控、反思机制）"
        ],
        "answer": [
          "Thought → Action → Observation 循环",
          "直到 Final Answer 或触发终止条件"
        ],
        "explanation": "核心是讲清循环结构和\"为什么有效\"（外部信息 + 可审计）。终止条件是工程落地的关键，能答出最大步数硬限制和防死循环手段得满分。",
        "tags": [
          "agent",
          "react"
        ],
        "week": "week12-AGENT",
        "project": "none",
        "stack": "agent",
        "variants": [
          "ReAct 和\"一次性直接给答案\"相比，优势是什么？",
          "工具调用失败了，ReAct 循环应该怎么处理？"
        ],
        "floor": 4
      },
      {
        "id": "rag-014",
        "difficulty": "easy",
        "type": "single",
        "question": "Agent 的四层记忆中，负责\"模糊检索、语义搜索（'好像在哪看过'）\"的是哪一层？",
        "options": [
          "A. 工作记忆（当前对话上下文）",
          "B. 短期记忆（SQLite 等数据库，存最近 N 轮）",
          "C. 长期记忆（Markdown 文档，存重要知识/偏好）",
          "D. 语义记忆（向量库 + 全文检索）"
        ],
        "answer": "D",
        "explanation": "四层记忆：工作记忆（当前对话，短期临时）、短期记忆（SQLite，最近几轮）、长期记忆（Markdown，重要知识/偏好）、语义记忆（向量库+全文检索，模糊语义召回）。核心机制还有 Memory Flush（对话结束把工作记忆里的重要信息写入长期记忆）和 Compaction（条目 >50 自动合并精简，防止无限膨胀）。",
        "tags": [
          "agent",
          "memory"
        ],
        "week": "week12-AGENT",
        "project": "none",
        "stack": "agent",
        "variants": [
          "Memory Flush 和 Compaction 分别解决什么问题？",
          "四层记忆分别用什么存储？为什么这么分层？"
        ],
        "floor": 3
      },
      {
        "id": "dist-001",
        "difficulty": "easy",
        "type": "single",
        "question": "数据并行（Data Parallelism）的核心思想是什么？",
        "options": [
          "A. 每张卡放完整模型，数据分片，AllReduce同步梯度",
          "B. 把模型切成多块，每张卡算一部分",
          "C. 把数据分批，一张卡跑一批",
          "D. 把训练数据存在不同的地方"
        ],
        "answer": "A",
        "explanation": "数据并行：每张卡都有完整模型副本，数据分成N份，每张卡算自己那份的梯度，然后通过 AllReduce 同步所有卡的梯度，再各自更新权重。\n优点：实现简单；缺点：每张卡都要存完整模型，大模型装不下。",
        "tags": [
          "distributed",
          "data-parallel"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "related": [
          "数据并行",
          "AllReduce"
        ],
        "floor": 4
      },
      {
        "id": "dist-002",
        "difficulty": "medium",
        "type": "single",
        "question": "张量并行（Tensor Parallelism）是怎么工作的？",
        "options": [
          "A. 把数据切成多份",
          "B. 把单个大矩阵乘法切开，每张卡算一部分",
          "C. 把模型按层切开",
          "D. 把优化器状态分开存"
        ],
        "answer": "B",
        "explanation": "张量并行：把矩阵乘法 Y = XA 切开，A 按列/行分块，每张卡算部分结果，最后 AllReduce/AllGather 拼起来。\n特点：通信量大（每层都要通信），适合单卡装不下的大层。\n代表：Megatron-LM。",
        "tags": [
          "distributed",
          "tensor-parallel"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "related": [
          "张量并行",
          "Megatron-LM"
        ],
        "floor": 4
      },
      {
        "id": "dist-003",
        "difficulty": "medium",
        "type": "single",
        "question": "流水线并行（Pipeline Parallelism）的核心思想是什么？",
        "options": [
          "A. 把模型按层切分到不同卡，像流水线一样依次计算",
          "B. 数据一批一批送进来",
          "C. 把矩阵乘法并行化",
          "D. 优化器和模型分开存"
        ],
        "answer": "A",
        "explanation": "流水线并行：模型按层切分，不同卡负责不同层。\n输入像流水线一样依次经过各卡，中间插入微批（micro-batch）来减少气泡。\n优点：省显存（每张卡只存部分层）；缺点：有气泡（bubble）浪费算力。\n代表：GPipe、PipeDream。",
        "tags": [
          "distributed",
          "pipeline-parallel"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "related": [
          "流水线并行",
          "GPipe"
        ],
        "floor": 4
      },
      {
        "id": "dist-004",
        "difficulty": "hard",
        "type": "single",
        "question": "ZeRO（Zero Redundancy Optimizer）主要优化什么？",
        "options": [
          "A. 模型参数的存储冗余",
          "B. 训练数据的冗余",
          "C. 推理时的延迟",
          "D. 梯度计算的精度"
        ],
        "answer": "A",
        "explanation": "ZeRO 优化数据并行中的显存冗余：数据并行每张卡都存完整的模型参数+梯度+优化器状态，太浪费。\nZeRO-1：分片优化器状态；ZeRO-2：+分片梯度；ZeRO-3：+分片参数。\n效果：显存省 N 倍（N=卡数），训练更大模型。代表：DeepSpeed。",
        "tags": [
          "distributed",
          "zero",
          "deepspeed"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "related": [
          "ZeRO",
          "DeepSpeed"
        ],
        "floor": 4
      },
      {
        "id": "dist-005",
        "difficulty": "easy",
        "type": "single",
        "question": "3D 并行指的是哪三种并行方式的组合？",
        "options": [
          "A. 数据并行 + 张量并行 + 流水线并行",
          "B. 数据并行 + 模型并行 + 优化器并行",
          "C. 前向并行 + 反向并行 + 更新并行",
          "D. CPU并行 + GPU并行 + NPU并行"
        ],
        "answer": "A",
        "explanation": "3D 并行 = 数据并行（DP）+ 张量并行（TP）+ 流水线并行（PP）。\n三种并行各有优劣，组合使用效果最好：\nDP 省计算，TP 省单卡显存，PP 省总显存。\n大模型训练标配，比如 GPT-3 训练就是 3D 并行。",
        "tags": [
          "distributed",
          "3d-parallel"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "related": [
          "3D 并行"
        ],
        "floor": 4
      },
      {
        "id": "dist-006",
        "difficulty": "medium",
        "type": "single",
        "question": "推理加速中，vLLM 的核心技术 PagedAttention 解决了什么问题？",
        "options": [
          "A. 显存碎片和 KV Cache 管理低效",
          "B. 模型精度不够",
          "C. 输入序列太长",
          "D. 输出质量不稳定"
        ],
        "answer": "A",
        "explanation": "PagedAttention 借鉴操作系统虚拟内存的思路，把 KV Cache 分成固定大小的块（页），用页表管理。\n解决了：1) 连续显存浪费（不同请求长度不一产生碎片）；2) 批量调度不灵活。\n效果：吞吐量提升 2-4 倍，几乎零成本。",
        "tags": [
          "inference",
          "vllm",
          "paged-attention"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "related": [
          "vLLM",
          "PagedAttention"
        ],
        "floor": 4
      },
      {
        "id": "dist-007",
        "difficulty": "medium",
        "type": "single",
        "question": "关于模型量化，以下哪种说法是正确的？",
        "options": [
          "A. 量化就是把模型压缩成zip文件",
          "B. 4bit 量化显存大约是 FP16 的 1/4，推理也更快",
          "C. 量化一定会让效果大幅下降",
          "D. 只有 GGUF 格式才能量化"
        ],
        "answer": "B",
        "explanation": "量化：用更低精度（如 8bit/4bit）存储权重和计算。\n4bit vs FP16：显存约 1/4，推理更快（计算量少+访存少）。\n好的量化方法（AWQ/GPTQ/Q4_K_M）质量下降很小，感知不明显。\nGGUF 是一种格式，不是量化方法本身。",
        "tags": [
          "inference",
          "quantization"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "related": [
          "模型量化"
        ],
        "floor": 4
      },
      {
        "id": "dist-008",
        "difficulty": "hard",
        "type": "single",
        "question": "FlashAttention 主要通过什么方式加速注意力计算？",
        "options": [
          "A. 减少注意力头的数量",
          "B. 用更快的 GPU",
          "C. 分块计算 + 重计算，减少 HBM 访存",
          "D. 用稀疏注意力代替稠密注意力"
        ],
        "answer": "C",
        "explanation": "FlashAttention 核心思想：IO 感知的注意力计算。\n把 Q/K/V 分块，一块一块算，存在 SRAM 里，最后写回 HBM。\n虽然有重计算（recomputation），但因为减少了大量 HBM 读写（速度慢），整体反而快 2~4 倍。\n现在是大模型训练推理的标配。",
        "tags": [
          "inference",
          "flash-attention",
          "optimization"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "related": [
          "FlashAttention"
        ],
        "floor": 4
      },
      {
        "id": "dist-009",
        "difficulty": "easy",
        "type": "single",
        "question": "推理时的「Batch」和「Context」分别指什么？",
        "options": [
          "A. Batch=一次处理几个请求，Context=输入prompt长度",
          "B. Batch=模型批次，Context=上下文窗口",
          "C. Batch=批量生成，Context=对话历史",
          "D. 都是一个意思"
        ],
        "answer": "A",
        "explanation": "Batch（批大小）：一次同时处理多少个请求，影响吞吐量。\nContext（上下文长度）：输入 prompt 的 token 数，影响预填充阶段耗时。\n推理两个重要指标：吞吐量（tokens/s）和延迟（首 token 时间）。\n二者通常是 trade-off 关系。",
        "tags": [
          "inference",
          "batch",
          "latency"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "related": [
          "推理基础"
        ],
        "floor": 4
      },
      {
        "id": "dist-010",
        "difficulty": "medium",
        "type": "single",
        "question": "AllReduce 和 AllGather 的区别是什么？",
        "options": [
          "A. AllReduce 是求和，AllGather 是拼接",
          "B. AllReduce 更快",
          "C. AllGather 只在一张卡上用",
          "D. 两者是同一个东西的不同名字"
        ],
        "answer": "A",
        "explanation": "AllReduce：每张卡都有一份数据，操作后每张卡都得到归约结果（比如求和/平均）。用于数据并行同步梯度。\nAllGather：每张卡有一部分数据，操作后每张卡都拿到所有卡的数据拼接结果。用于张量并行的结果合并。\n都是集合通信原语，NCCL 实现。",
        "tags": [
          "distributed",
          "allreduce",
          "allgather"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "related": [
          "集合通信",
          "NCCL"
        ],
        "floor": 4
      },
      {
        "id": "dist-boss-1",
        "difficulty": "hard",
        "type": "open",
        "question": "请简述 3D 并行（数据并行/张量并行/流水线并行）各自的原理、优缺点，以及为什么大模型训练需要三者结合。",
        "answer": [
          "数据并行每张卡完整模型数据分片AllReduce同步梯度",
          "张量并行把矩阵乘法切开每张卡算一部分通信量大",
          "流水线并行按层切分微批减少气泡节省显存",
          "数据并行实现简单但每张卡都要存完整模型",
          "张量并行通信量大适合单卡装不下的大层",
          "流水线并行有气泡bubble浪费算力",
          "三者结合3D并行显存和计算都最优训练大模型",
          "ZeRO优化数据并行的显存冗余优化器状态分片",
          "大模型参数量太大单卡装不下必须多种并行结合"
        ],
        "explanation": "数据并行（DP）：每张卡完整模型，数据分片，AllReduce 同步梯度。实现简单，但每张卡要存完整模型+梯度+优化器状态，大模型装不下。\n张量并行（TP）：把大矩阵乘法切开，每层都通信。通信量大，适合超大层。\n流水线并行（PP）：按层切分，微批流水。有气泡（bubble）浪费算力，但显存省得多。\n三者结合 = 3D 并行，各取所长，是训练百亿千亿大模型的标配。",
        "tags": [
          "distributed",
          "3d-parallel",
          "boss"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "inference",
        "min_keywords": 4,
        "floor": 4
      },
      {
        "id": "nlp-001",
        "difficulty": "easy",
        "type": "single",
        "question": "BERT 微调做文本分类时，最简单也最常用的句子向量提取方式是？",
        "options": [
          "A. 取 CLS 位置的隐藏向量（last_hidden[:, 0, :]）",
          "B. 对全部 token 隐藏向量做不加权平均（含 PAD）",
          "C. 随机采样一个 token 的隐藏向量",
          "D. 用 Word2Vec 对整句求均值"
        ],
        "answer": "A",
        "explanation": "CLS 向量最简单最常用，但依赖 NSP 预训练——RoBERTa 去掉 NSP 后 CLS 效果变弱。此时应改用 mean pooling（排除 PAD 的 mask 加权平均），长文本/语义相似度任务也首选 mean pooling；max pooling 需把 padding 置 -inf 再取 max，保留最显著特征。",
        "tags": [
          "nlp",
          "text-classification",
          "bert",
          "pooling"
        ],
        "week": "week6-文本分类",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "为什么 RoBERTa 上 CLS 向量效果变弱？这时该用什么池化？",
          "mean pooling 和 max pooling 分别怎么处理 PAD token？",
          "单标签和多标签文本分类在输出层与损失函数上有什么不同？"
        ],
        "floor": 4
      },
      {
        "id": "nlp-002",
        "difficulty": "medium",
        "type": "single",
        "question": "在 TNEWS 新闻分类项目三路对比（BERT 微调 53K 条 / Qwen2-0.5B Zero-shot / LoRA SFT 5K 条）中，哪项实测结论正确？",
        "options": [
          "A. Zero-shot 准确率最高，且输出格式稳定无需解析",
          "B. LoRA SFT 仅用 BERT 1/10 的数据就达到同等准确率，并把无法解析率从 29% 压到 1%",
          "C. BERT 微调需要标注量最少，标注不足时首选",
          "D. LoRA 微调的可训练参数占全量参数的 20% 左右"
        ],
        "answer": "B",
        "explanation": "实测：BERT 微调 val_acc 0.56 / macro-F1 0.55、无法解析 0%；Zero-shot 0.36、无法解析 29%（58/200，输出格式极不稳定）；LoRA SFT（5K 条）0.58、无法解析 1%。SFT 靠 Loss 掩码学会输出格式，是「格式学习」的胜利。D 错：LoRA r=8/alpha=16 可训练参数仅 1.08M/495M ≈ 0.22%。",
        "tags": [
          "nlp",
          "text-classification",
          "lora",
          "sft",
          "zero-shot"
        ],
        "week": "week6-文本分类",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "为什么小模型 Zero-shot 分类不可靠？如何缓解（换 7B/API 模型、加解析兜底）？",
          "LoRA 可训练参数占比约多少？为什么能大幅省显存？",
          "SFT 的 Loss 掩码（prompt 部分 label=-100）起什么作用？"
        ],
        "floor": 4
      },
      {
        "id": "nlp-003",
        "difficulty": "medium",
        "type": "boolean",
        "question": "LLM SFT 训练文本分类时，通常对 prompt/指令部分设置 label=-100 做 Loss 掩码，只在 output 部分计算损失。",
        "answer": true,
        "explanation": "SFT 的目标是让模型学会「回答格式与标签输出」，prompt 部分无需学习，label=-100 在交叉熵计算时被忽略。这正是 SFT 能把无法解析率从 29% 压到 1% 的关键机制之一。同时标签用自然语言（正面/负面）而非整数索引，与推理时 Prompt 对齐。",
        "tags": [
          "nlp",
          "text-classification",
          "sft",
          "loss-mask"
        ],
        "week": "week6-文本分类",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "不做 Loss 掩码直接全序列算损失会怎样？",
          "训练时标签为什么用自然语言而不是整数索引？",
          "多标签分类应该用 Softmax 还是 Sigmoid + BCEWithLogitsLoss？"
        ],
        "floor": 4
      },
      {
        "id": "nlp-004",
        "difficulty": "hard",
        "type": "open",
        "question": "对比 BERT 全量微调、LLM Zero-shot、LoRA SFT 三种文本分类方案（数据需求、效果、成本、适用场景），并给出选型建议。",
        "points": [
          "BERT 微调：需数百~几万条标注；延迟低（<100ms）、成本低、判别式稳定（无法解析 0%）；全量微调几乎总是优于冻结微调",
          "Zero-shot：零标注分钟级上线，但小模型格式不稳（实测无法解析 29%）、延迟高成本高；适合无标注快速验证、类别常变场景",
          "LoRA SFT：千条数据 + 单卡即可，可训练参数仅 0.22%，避免灾难性遗忘，推理时 W'=W+BA 合并无额外开销；5K 条 SFT 达 0.58，超过 BERT 53K 条的 0.56",
          "选型决策树：标注 ≥500 条/类 + 延迟 <100ms → BERT 全量微调；<100 条/类或类别频繁新增 → 大模型 Few-shot；Agent 路由/高频调用（QPS>100）→ 轻量分类模型；无标注快速验证 → Zero-shot 后收集标注"
        ],
        "answer": [
          "三方案的数据需求、效果、成本差异",
          "实测数字：SFT 5K 条 0.58 vs BERT 53K 条 0.56，无法解析率 29%→1%",
          "按场景给出选型建议"
        ],
        "explanation": "核心认知是「SFT 的威力在格式学习」与「小模型零样本不可靠」：LLM 分类必须配解析兜底或 SFT；LoRA 用 0.22% 可训练参数拿到数据效率优势。回答时最好带上真实数字，体现做过三路对比。",
        "tags": [
          "nlp",
          "text-classification",
          "lora",
          "sft",
          "model-selection"
        ],
        "week": "week6-文本分类",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "Agent 场景的分类路由（意图分发/Query 路由）为什么用轻量分类模型而不用大模型判断？",
          "类别频繁新增时，有什么替代重新训练分类模型的方案？",
          "全量 SFT 和 LoRA SFT 怎么选？各自代价是什么？"
        ],
        "floor": 4
      },
      {
        "id": "nlp-005",
        "difficulty": "easy",
        "type": "single",
        "question": "用 per-token 独立 Softmax 预测 NER 标签，主要问题是什么？",
        "options": [
          "A. 训练速度太慢，无法收敛",
          "B. 会预测出非法的标签序列（如 B-PER 后接 I-LOC、I-X 出现在开头）",
          "C. 无法处理中文文本",
          "D. 参数过多导致严重过拟合"
        ],
        "answer": "B",
        "explanation": "独立预测忽略标签间依赖，会破坏 BIO 约束：I-X 不能出现在开头、I-X 前不能接不同类型的 B-Y、不能接 O。CRF 通过可学习的转移矩阵 T(num_tags, num_tags) 自动学会「非法转移 = 极大负数」，再配合维特比解码输出全局合法的序列。",
        "tags": [
          "nlp",
          "ner",
          "crf",
          "bio"
        ],
        "week": "week7-序列标注",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "BIO 和 BIOES 标注体系有什么区别？什么场景用 BIOES？",
          "中文分词任务用哪套标注体系（BIES）？为什么对 OOV 鲁棒？",
          "CRF 的转移矩阵是怎么「学会」非法转移的？"
        ],
        "floor": 4
      },
      {
        "id": "nlp-006",
        "difficulty": "medium",
        "type": "single",
        "question": "关于 BERT 微调与 LLM 做 NER 的对比（CLUENER 实测），哪项结论正确？",
        "options": [
          "A. Qwen-plus Zero-shot 的 F1 最高，边界识别最强",
          "B. 数据充足时判别式 BERT 仍最优：BERT 微调(0.756) > LLM SFT(0.680) > LLM zero-shot(0.518)，CRF 相对 Linear 提升 <0.5%",
          "C. BERT+CRF 训练速度比 BERT+Linear 快",
          "D. LLM SFT 输出格式最不稳定，parse_fail 很高"
        ],
        "answer": "B",
        "explanation": "四方案实测：BERT+Linear 0.756 / BERT+CRF 0.753（CRF 本例略降，但非法转移 264→244 确实变少）/ Qwen-plus zero-shot 0.518（边界识别弱）/ few-shot 0.484（示例质量影响，反而更低）/ Qwen SFT 0.680 且 parse_fail=0 格式完全可控。CRF 因维特比串行解码，训练每 epoch ~430s 是 Linear ~130s 的 3 倍——收益 <0.5% 但代价明显。",
        "tags": [
          "nlp",
          "ner",
          "crf",
          "llm",
          "discriminative-vs-generative"
        ],
        "week": "week7-序列标注",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "为什么 BERT 强基座时 CRF 收益有限？什么时候才值得加 CRF？",
          "few-shot 为什么可能比 zero-shot 还低？",
          "LLM 做 NER 的三种方式（Prompt / Function Calling / SFT）各有什么优劣？"
        ],
        "floor": 4
      },
      {
        "id": "nlp-007",
        "difficulty": "easy",
        "type": "boolean",
        "question": "评估 NER 应使用实体级 F1（起止边界 + 类型完全匹配），Token 级准确率会虚高——实体仅占约 10% token 时，全部预测 O 也有约 90% 准确率。",
        "answer": true,
        "explanation": "O 标签主导下 Token 准确率被稀释，边界错、漏识、类型错全被掩盖。实体级 F1 中一个实体正确 ⇔ 边界与类型都 Exact Match，用 seqeval 工具直接支持 BIO/BIOES。错误模式对症优化：边界截断加长实体样本、类型混淆加混淆样本、漏识(低 recall)扩充数据、误识(低 precision)加负样本。",
        "tags": [
          "nlp",
          "ner",
          "evaluation",
          "seqeval"
        ],
        "week": "week7-序列标注",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "实体级 F1 中「一个实体正确」的判定标准是什么？",
          "实体漏识多（低 recall）该怎么优化？误识多（低 precision）呢？",
          "为什么不均衡的文本分类也要看 Macro-F1 而不是 Accuracy？"
        ],
        "floor": 4
      },
      {
        "id": "nlp-008",
        "difficulty": "hard",
        "type": "open",
        "question": "对比判别式（BERT+CRF）与生成式（LLM）两种 NER 方案的优劣，说明数据充足与冷启动场景各自的选型，并描述生产环境推荐的最佳实践（混合方案）。",
        "points": [
          "判别式：精度高/推理快/格式可控（实测 0.75-0.76），但需要标注数据，新实体类型要重训",
          "生成式：零标注可冷启动，但边界识别弱（zero-shot 0.52）、格式不稳；SFT 后格式可控（parse_fail=0）精度 0.68",
          "选型：数据充足 → BERT+CRF；冷启动/低资源 → LLM",
          "混合方案（推荐）：LLM 伪标注 → 人工审核 → 种子集训练 BERT → 上线 → 滚雪球扩充（高置信过滤 >0.9 + 人工审核，保留独立测试集）"
        ],
        "answer": [
          "两方案优劣对比（精度/成本/格式/标注依赖）",
          "选型：数据充足 vs 冷启动",
          "混合流水线（LLM 伪标注→审核→BERT 训练→滚雪球）描述"
        ],
        "explanation": "核心认知：NER 本质是通用 span 分类器——实体=业务关心的文本 span，换业务只换标注数据，同一套 BERT+CRF 框架即可迁移。LLM 更适合做冷启动的数据来源而非唯一部署形态；远程监督（词典/知识库自动标注）可快速获数据但有漏标噪声风险。",
        "tags": [
          "nlp",
          "ner",
          "crf",
          "llm",
          "cold-start",
          "distant-supervision"
        ],
        "week": "week7-序列标注",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "远程监督（Distant Supervision）怎么自动生成标注？有什么风险？",
          "滚雪球迭代的具体流程是什么？为什么保留独立人工测试集？",
          "NER 为什么被称为「泛信息抽取框架」？医疗/金融实体类型怎么定义？"
        ],
        "floor": 4
      },
      {
        "id": "nlp-009",
        "difficulty": "easy",
        "type": "single",
        "question": "哪种文本匹配架构可以把文档向量离线预计算，在线检索时只需 ANN 向量相似度查找？",
        "options": [
          "A. CrossEncoder",
          "B. BiEncoder（双塔）",
          "C. 编辑距离",
          "D. BM25"
        ],
        "answer": "B",
        "explanation": "BiEncoder 让两段文本各自过共享权重 BERT 编码成向量（CLS/mean pooling），文档向量可离线预计算，在线只需向量相似度（ANN），O(1) 查找支持百万级召回。CrossEncoder 联合编码无法预计算，N 个候选 = N 次 BERT 推理。编辑距离/BM25 是传统词面方法，不涉及向量编码。",
        "tags": [
          "nlp",
          "text-matching",
          "biencoder",
          "crossencoder"
        ],
        "week": "week8-文本匹配",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "BiEncoder 训练常用哪些损失函数？SimCSE 怎么构造正例？",
          "为什么 CrossEncoder 无法离线预计算向量？",
          "BiEncoder 的向量质量受什么影响（mean pooling vs CLS）？"
        ],
        "floor": 4
      },
      {
        "id": "nlp-010",
        "difficulty": "medium",
        "type": "single",
        "question": "工业界标准的「两阶段检索」流水线是？",
        "options": [
          "A. CrossEncoder 粗召回 → BiEncoder 精排",
          "B. BiEncoder 粗召回（百万级 ANN Top-K，K=50~200，<1ms）→ CrossEncoder 精排（K 个候选打分取 Top-N，50~200ms）",
          "C. BM25 精排 → 向量检索粗召回",
          "D. 只用 CrossEncoder 直接扫全库打分"
        ],
        "answer": "B",
        "explanation": "BiEncoder 快但精度中，负责在百万级文档库 ANN 粗召回 Top-K；CrossEncoder 准但慢，只对 K 个候选做 token 级交互精排取 Top-N，兼顾规模与精度。实测 AFQMC：CrossEncoder 0.8629 > BiEncoder cosine 0.8524，交互型精度优势成立，两阶段级联是工程最优解。",
        "tags": [
          "nlp",
          "text-matching",
          "retrieval",
          "rerank",
          "two-stage"
        ],
        "week": "week8-文本匹配",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "两阶段检索中 K 一般取多少？为什么 CrossEncoder 只能精排几十~几百条？",
          "重排（Rerank）为什么能提升 RAG 效果？",
          "跨语言/领域偏移场景，向量检索会退化，怎么缓解？"
        ],
        "floor": 4
      },
      {
        "id": "nlp-011",
        "difficulty": "easy",
        "type": "boolean",
        "question": "BiEncoder 与 CrossEncoder 是互补关系而非替代关系：BiEncoder 负责大规模召回，CrossEncoder 负责小候选集精排，工业界用两阶段组合兼得效率与精度。",
        "answer": true,
        "explanation": "BiEncoder：编码独立/可预计算/O(1) 查找/百万级/精度中；CrossEncoder：联合编码/不可预计算/O(N) 推理/百千级/精度高。两者互补，两阶段级联是工程最优解；实测也印证 CrossEncoder 0.8629 高于 BiEncoder cosine 0.8524。单一架构都有明显短板，所以不存在「替代」。",
        "tags": [
          "nlp",
          "text-matching",
          "biencoder",
          "crossencoder",
          "two-stage"
        ],
        "week": "week8-文本匹配",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "什么场景只用 CrossEncoder 就够了（小候选集精确判断/精排）？",
          "CrossEncoder 延迟高，工程上怎么缓解（知识蒸馏/INT8 量化/候选集 <100）？",
          "难负例挖掘（BM25 难负例 / in-batch negatives）为什么比模型选型更重要？"
        ],
        "floor": 4
      },
      {
        "id": "nlp-012",
        "difficulty": "hard",
        "type": "open",
        "question": "对比 BiEncoder 和 CrossEncoder（原理、精度、效率、可预计算性），说明为什么工业界用两阶段组合，并指出训练阶段提升匹配效果的关键细节（损失函数/负样本/阈值）。",
        "points": [
          "BiEncoder：共享 BERT 分别编码 → cosine 相似度；可离线预计算、ANN O(1) 召回、百万级；损失：CosineEmbeddingLoss / Triplet Loss / 对比学习（SimCSE 两次 Dropout 前向构造正例 + InfoNCE）",
          "CrossEncoder：CLS A [SEP] B 联合编码，所有层 Self-Attention 跨文本 token 级交互；精度最高但 N 候选 = N 次推理、不可预计算；适用精排",
          "两阶段：BiEncoder 粗召回 Top-K（K=50~200）→ CrossEncoder 精排取 Top-N，兼得规模与精度（实测 CE 0.8629 > Bi cosine 0.8524 > triplet 0.8023）",
          "训练细节：难负例 > 模型选型（BM25 难负例 / in-batch negatives）；样本不均衡用 Focal Loss/过采样；阈值必须按 val 网格搜索校准（cosine 0.51 vs triplet 0.81）"
        ],
        "answer": [
          "两者原理与效率对比（编码方式/可预计算/复杂度）",
          "两阶段组合的理由",
          "至少两个训练/部署细节（损失函数、难负例、阈值校准、蒸馏）"
        ],
        "explanation": "核心权衡是「效率 vs 精度」；AFQMC 实测 cosine 损失稳定优于 triplet；LLM zero-shot 精确率高但召回仅 0.48（太抠字眼），LLM 定位是冷启动数据生成老师（蒸馏小模型快 100x）而非直接部署对象。",
        "tags": [
          "nlp",
          "text-matching",
          "biencoder",
          "crossencoder",
          "two-stage",
          "triplet-loss",
          "distillation"
        ],
        "week": "week8-文本匹配",
        "project": "none",
        "stack": "nlp",
        "variants": [
          "如何用 LLM 生成 (query, 正例, 负例) 三元组并蒸馏小模型？",
          "AFQMC 实测中为什么 BiEncoder Triplet 弱于 Cosine？margin 怎么调？",
          "部署端 ANN 精度损失（nprobe/ef 调参）和向量库增量更新怎么处理？"
        ],
        "floor": 4
      },
      {
        "id": "proj-001",
        "difficulty": "hard",
        "type": "open",
        "question": "请完整描述 ReAct 范式的工作循环，并说明它为什么比\"一次性回答\"更有效。",
        "points": [
          "ReAct = Reasoning + Acting，Thought-Action-Observation 循环",
          "走一步看一步，根据 Observation 决定下一步 Action",
          "每一步能拿到外部信息（工具/知识库），不凭空编造",
          "Thought 全程可见，可审计、可 debug",
          "终止条件：达到最大步数/得出答案/主动放弃"
        ],
        "answer": [
          "Thought-Action-Observation 循环",
          "外部信息 + 可审计"
        ],
        "explanation": "ReAct 核心是推理与行动交替，像人一样边查边想；外部工具补信息、过程可审计是两大价值。要讲清循环和终止条件。",
        "tags": [
          "react",
          "agent"
        ],
        "week": "week12-AGENT",
        "project": "ticket-diagnose-agent",
        "stack": "agent",
        "variants": [
          "ReAct 循环怎么终止？死循环了怎么办？",
          "如果工具调用失败了，Agent 应该怎么恢复？"
        ],
        "floor": 4
      },
      {
        "id": "proj-002",
        "difficulty": "hard",
        "type": "open",
        "question": "你的工单智能诊断 Agent 为什么设计成「BERT 分类初筛 + Agent 并行诊断」两级结构？直接全用 LLM 不行吗？",
        "points": [
          "BERT 分类器快、成本低，做初筛/路由（产品大类/问题类型/优先级）",
          "低置信样本（13.3%）自动转人工兜底，保证安全可控",
          "Agent 只处理需要复杂推理的工单，避免每个工单都走 LLM（成本）",
          "复用已有工单分类器与派送引擎，平滑接入现有流程",
          "保留技能匹配、负载均衡机制"
        ],
        "answer": [
          "快慢结合：BERT 粗筛 + Agent 精诊",
          "低置信转人工兜底"
        ],
        "explanation": "两级结构是成本与质量的平衡：简单工单 BERT 秒级分流，复杂工单 Agent 深度诊断，低置信人工兜底。全用 LLM 成本高且慢，全用分类器能力不足。",
        "tags": [
          "agent",
          "architecture"
        ],
        "week": "week12-AGENT",
        "project": "ticket-diagnose-agent",
        "stack": "agent",
        "variants": [
          "低置信转人工的比例怎么控制？",
          "如果工单量暴增，这个架构的瓶颈在哪？"
        ],
        "floor": 4
      },
      {
        "id": "proj-003",
        "difficulty": "medium",
        "type": "single",
        "question": "工单 Agent 中 LangGraph 状态图相比自研 ReAct 实现的核心优势是？",
        "options": [
          "A. 推理能力更强",
          "B. 显式的状态编排（节点/边/状态流转），复杂流程可控可观测",
          "C. 不需要大模型",
          "D. 自动生成评测集"
        ],
        "answer": "B",
        "explanation": "LangGraph 用 StateGraph 显式定义节点和状态流转（初筛→路由→并行派发→分派→结论五节点），流程可控、可回滚、可观测；自研 ReAct 灵活但状态管理弱。项目里做了 A/B 对比验证。",
        "tags": [
          "langgraph",
          "agent"
        ],
        "week": "week12-AGENT",
        "project": "ticket-diagnose-agent",
        "stack": "agent",
        "variants": [
          "LangGraph 的状态（state）是怎么在节点间传递的？",
          "五节点流程里并行派发节点做了什么？"
        ],
        "floor": 4
      },
      {
        "id": "proj-004",
        "difficulty": "medium",
        "type": "boolean",
        "question": "工单 Agent 的并行诊断用 ThreadPoolExecutor 派发多个 Worker 并发查询故障知识库，实测较串行加速 1.55-2.38 倍。",
        "answer": true,
        "explanation": "简历实测数字。多 Worker 并行查询知识库替代人工串行排查；ThreadPoolExecutor 对 I/O 密集型任务足够，加速比受知识库查询耗时占比影响。",
        "tags": [
          "parallel",
          "agent"
        ],
        "week": "week12-AGENT",
        "project": "ticket-diagnose-agent",
        "stack": "agent",
        "variants": [
          "为什么用线程池而不是 asyncio？",
          "并行加速的瓶颈可能在哪？"
        ],
        "floor": 4
      },
      {
        "id": "proj-005",
        "difficulty": "hard",
        "type": "open",
        "question": "你的评测集分类准确率 100%，面试官会质疑过拟合。你怎么回应？",
        "points": [
          "300 条评测集是典型故障工单构建，聚焦覆盖安全/大云场景",
          "准确率是评测集内指标，还有低置信 13.3% 转人工兜底（生产安全）",
          "另用真实 LLM 端到端验证 + 离线 Mock 双后端可插拔",
          "承认局限：真实工单分布更复杂，靠人工兜底 + 持续迭代评测集",
          "不硬撑 100% 是真实分布，讲清评测口径"
        ],
        "answer": [
          "评测集口径 + 人工兜底 + 端到端验证"
        ],
        "explanation": "诚实 + 口径清晰：评测集内 100% 是设计目标（典型样本），生产靠低置信转人工兜底，且做了真实 LLM 端到端验证。这是项目里最容易被挑战的点，要主动讲口径。",
        "tags": [
          "eval",
          "agent"
        ],
        "week": "week12-AGENT",
        "project": "ticket-diagnose-agent",
        "stack": "agent",
        "variants": [
          "评测集怎么构建才不容易过拟合？",
          "低置信判定用什么方法？"
        ],
        "floor": 4
      },
      {
        "id": "proj-006",
        "difficulty": "hard",
        "type": "open",
        "question": "描述你的 RAG 助手三级高精度召回管线（从文档到答案），并说明每一级解决什么问题。",
        "points": [
          "语义分块 + 父子块策略：小块检索准、父块上下文完整",
          "粗排：BGE 向量（FAISS/Milvus/ES 三后端可切换）+ BM25 稀疏 + RRF 融合",
          "精排：CrossEncoder 重排，问题+文档交互打分",
          "评测：100 条 QA，Hit@1 55%（固定分块纯向量）→ 81%（语义分块+混合）→ 91%（+重排），Hit@5 99%",
          "幻觉控制：Prompt 约束 + 溯源引用 + 低置信拒答"
        ],
        "answer": [
          "分块 → 粗排（向量+BM25+RRF）→ 精排（CE）→ 生成",
          "每级提升来源"
        ],
        "explanation": "三级管线是 RAG 项目核心，数字要讲清每级提升来源：分块策略升级 + 混合检索 + 重排各自贡献。Hit@1 91% 是简历亮点。",
        "tags": [
          "rag",
          "pipeline"
        ],
        "week": "week10-检索增强生成",
        "project": "delivery-rag",
        "stack": "rag",
        "variants": [
          "为什么先向量粗排再 CE 精排，不直接用 CE？",
          "父子块策略的父块和子块分别怎么用？"
        ],
        "floor": 4
      },
      {
        "id": "proj-007",
        "difficulty": "medium",
        "type": "single",
        "question": "RAG 中引入 CrossEncoder 重排为什么能提升效果？",
        "options": [
          "A. CrossEncoder 比向量模型快",
          "B. 问题和文档一起输入做深度交互（Cross-Attention），比双塔向量相似度更准",
          "C. CrossEncoder 不需要训练",
          "D. 它直接生成答案"
        ],
        "answer": "B",
        "explanation": "向量检索是双塔（各自编码后算相似度），交互少；CrossEncoder 将问题和文档拼接一起输入做交互打分，精度高但慢，所以只对粗排 Top50 精排出 Top5。",
        "tags": [
          "rag",
          "reranker"
        ],
        "week": "week10-检索增强生成",
        "project": "delivery-rag",
        "stack": "rag",
        "variants": [
          "BiEncoder 和 CrossEncoder 的本质区别？",
          "重排阶段通常对多少条做精排？"
        ],
        "floor": 4
      },
      {
        "id": "proj-008",
        "difficulty": "hard",
        "type": "open",
        "question": "你的 RAG 项目怎么控制幻觉？如果面试官问\"Faithfulness 0.967 怎么来的\"，你怎么答？",
        "points": [
          "幻觉控制三件套：Prompt 约束（只能基于上下文）+ 答案溯源引用 + 低置信拒答",
          "评测：RAGAS 框架，Faithfulness 衡量答案能否从上下文找到依据",
          "以 DeepSeek-as-Judge 实测 30 题抽样 Faithfulness 0.967",
          "配合 Phoenix/OpenTelemetry 可观测持续对齐",
          "承认抽样规模，讲清评测口径"
        ],
        "answer": [
          "三层控制 + RAGAS 评测方法"
        ],
        "explanation": "幻觉控制是 RAG 核心卖点。0.967 是 30 题抽样的实测值，要讲清评测方法和口径（DeepSeek-as-Judge + RAGAS）。",
        "tags": [
          "rag",
          "hallucination"
        ],
        "week": "week10-检索增强生成",
        "project": "delivery-rag",
        "stack": "rag",
        "variants": [
          "低置信拒答的阈值怎么定？拒答后给用户什么？",
          "溯源引用在答案里怎么呈现？"
        ],
        "floor": 4
      },
      {
        "id": "proj-009",
        "difficulty": "hard",
        "type": "open",
        "question": "面试官质疑\"100 条评测集太少了，91% 不可信\"，你怎么回应？",
        "points": [
          "承认评测集规模有限，但数字是实测可复现（一键跑评测脚本）",
          "91% 是 Hit@1，Hit@5 达 99%，说明答案基本在 Top5 内",
          "领域 QA 聚焦硬知识（产品手册/FAQ/故障记录），难度不低",
          "用 Faithfulness 0.967 佐证生成质量，多指标互相印证",
          "说明后续扩展方向：扩大评测集 + 真实用户反馈回流"
        ],
        "answer": [
          "可复现 + 多指标互证 + 承认局限"
        ],
        "explanation": "诚实承认 + 用可复现性和多指标支撑。简历数字必须能说清来源，评测脚本可一键复现是底气。",
        "tags": [
          "rag",
          "eval"
        ],
        "week": "week10-检索增强生成",
        "project": "delivery-rag",
        "stack": "rag",
        "variants": [
          "评测集怎么构建才更可信？",
          "Hit@1 和 Hit@5 各说明什么问题？"
        ],
        "floor": 4
      },
      {
        "id": "proj-010",
        "difficulty": "medium",
        "type": "single",
        "question": "你的 RAG 用 FAISS / Milvus / Elasticsearch 三后端可切换。它们各自的典型适用场景是？",
        "options": [
          "A. FAISS 轻量单机 / Milvus 分布式大规模向量 / ES 文本+向量混合检索",
          "B. 三者完全等价可互换",
          "C. Milvus 只适合文本检索",
          "D. ES 不支持向量"
        ],
        "answer": "A",
        "explanation": "FAISS 轻量易集成适合单机；Milvus 面向大规模向量分布式场景；ES 原生文本检索强，也支持向量（混合检索友好）。项目通过统一接口抽象实现可切换。",
        "tags": [
          "rag",
          "vector-db"
        ],
        "week": "week10-检索增强生成",
        "project": "delivery-rag",
        "stack": "rag",
        "variants": [
          "三后端切换的接口抽象怎么设计？",
          "什么场景选 ES 而不是 Milvus？"
        ],
        "floor": 4
      },
      {
        "id": "proj-011",
        "difficulty": "medium",
        "type": "boolean",
        "question": "RAG 项目的 Docker 容器化 + FastAPI 微服务私有化部署，核心诉求是数据不出域、满足企业信息安全合规。",
        "answer": true,
        "explanation": "面向交付场景，客户数据不能出域，私有化部署是合规刚需；Docker 容器化 + FastAPI 微服务是落地手段。",
        "tags": [
          "rag",
          "deployment"
        ],
        "week": "week10-检索增强生成",
        "project": "delivery-rag",
        "stack": "rag",
        "variants": [
          "私有化部署相比 API 调用的优缺点？",
          "FastAPI 服务有哪些接口？"
        ],
        "floor": 4
      },
      {
        "id": "proj-012",
        "difficulty": "hard",
        "type": "open",
        "question": "为什么你的 LoRA 微调选 0.5B 小模型？面试官问\"小模型能力够吗\"怎么答？",
        "points": [
          "场景定位：交付领域专用小模型，面向低资源/边缘/私有化部署",
          "成本：QLoRA 4bit 在 2GB 显存 GPU 实测跑通（峰值 1140MB）",
          "部署：INT4 量化后加载峰值 535MB、推理 547MB，单卡可部署",
          "效果：领域硬知识问答准确率较 base 显著提升（+13.3pp）",
          "取舍：通用能力弱于大模型，但领域专用 + 数据不出域是核心价值"
        ],
        "answer": [
          "场景定位 + 成本部署优势 + 领域效果"
        ],
        "explanation": "0.5B 不是\"能力不够\"，是\"面向边缘私有化场景的最优解\"。要主动讲清场景定位和取舍，数字（2GB/1140MB/535MB/547MB/+13.3pp）要能脱口而出。",
        "tags": [
          "lora",
          "deployment"
        ],
        "week": "week9-大模型应用补充",
        "project": "delivery-lora",
        "stack": "pretrain-sft",
        "variants": [
          "小模型 + LoRA 和大模型 API 怎么选型？",
          "为什么选 Qwen2-0.5B 而不是更大的？"
        ],
        "floor": 4
      },
      {
        "id": "proj-013",
        "difficulty": "hard",
        "type": "open",
        "question": "LoRA 为什么能大幅降低显存和训练成本？请从原理讲起。",
        "points": [
          "冻结原始权重 W，只训练低秩矩阵 A×B（近似 ΔW）",
          "可训练参数仅 0.22%（r=8, alpha=16, 全层注入 q/k/v/o）",
          "不需要保存大模型全部梯度与优化器状态",
          "QLoRA 4bit 量化基座进一步压缩显存（NF4 量化）",
          "效果：领域适配接近全量微调"
        ],
        "answer": [
          "低秩分解 + 冻结基座 + 只训少量参数"
        ],
        "explanation": "LoRA 原理是\"权重更新低秩化\"：A×B 参数量远小于 W。r 控制秩，alpha 缩放，0.22% 参数是简历数字要能讲清来源。",
        "tags": [
          "lora",
          "finetune"
        ],
        "week": "week9-大模型应用补充",
        "project": "delivery-lora",
        "stack": "pretrain-sft",
        "variants": [
          "r 和 alpha 怎么选？r 太大/太小会怎样？",
          "序列打包（packing）解决什么问题？"
        ],
        "floor": 4
      },
      {
        "id": "proj-014",
        "difficulty": "medium",
        "type": "boolean",
        "question": "你的 LoRA 项目用独立黄金评测集（与训练集分开）以 LLM-as-a-Judge 评测，领域硬知识问答准确率较 base 模型显著提升。",
        "answer": true,
        "explanation": "独立黄金评测集防止训练集污染评测；LLM-as-a-Judge 自动化评分。提升口径 +13.3pp（base 3.3% → QLoRA 16.7%，30 条黄金评测），简历里写\"显著提升\"、面试讲具体数字。",
        "tags": [
          "lora",
          "eval"
        ],
        "week": "week9-大模型应用补充",
        "project": "delivery-lora",
        "stack": "pretrain-sft",
        "variants": [
          "为什么用 LLM-as-a-Judge 而不是人工评测？",
          "训练集和评测集为什么要分开？"
        ],
        "floor": 4
      },
      {
        "id": "ml-001",
        "difficulty": "easy",
        "type": "single",
        "question": "关于 ReLU 激活函数（f(x)=max(0,x)），下列说法正确的是？",
        "options": [
          "A. 计算简单，且正区间导数为 1，能缓解梯度消失",
          "B. 输出以 0 为中心，天然利于收敛",
          "C. 输出范围在 0~1 之间，适合做概率输出",
          "D. 导数处处非零，不存在神经元死亡问题"
        ],
        "answer": "A",
        "explanation": "ReLU=max(0,x)，只需比较取最大值，是计算最简单的激活函数；x>0 时导数为 1，梯度连乘不会快速衰减，缓解梯度消失。B 错——ReLU 输出非负、不是零中心（零中心的是 Tanh）；C 是 Sigmoid 的特点；D 错——x≤0 时导数为 0，会出现神经元\"死亡\"。",
        "tags": [
          "activation",
          "relu"
        ],
        "week": "week2-深度学习基础",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "Transformer 的 FFN 用的什么激活函数？GELU 相比 ReLU 有什么特点？",
          "什么是\"死亡 ReLU\"？如何缓解？",
          "ReLU 相比 Sigmoid 为什么更适合深层网络？"
        ],
        "floor": 4
      },
      {
        "id": "ml-002",
        "difficulty": "easy",
        "type": "single",
        "question": "关于 Sigmoid 激活函数 σ(x)=1/(1+e⁻ˣ)，下列说法正确的是？",
        "options": [
          "A. 输出范围 0~1，适合二分类输出层，其导数 = σ(x)(1−σ(x))",
          "B. 输出范围 −1~1，零中心，适合隐藏层",
          "C. 导数恒为 1，不会出现饱和",
          "D. 多分类任务的标配输出激活函数"
        ],
        "answer": "A",
        "explanation": "Sigmoid 输出 0~1，可解释为二分类概率，常用于二分类输出层；其导数 σ(x)(1−σ(x)) 是高频考点。B 是 Tanh（输出 −1~1、零中心，优于 Sigmoid）；C 错——Sigmoid 两端导数趋近 0 会饱和；D 是 Softmax（多分类输出层，输出概率分布）。",
        "tags": [
          "activation",
          "sigmoid"
        ],
        "week": "week2-深度学习基础",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "Sigmoid 放在深层隐藏层为什么容易引起梯度消失？",
          "Sigmoid 和 Softmax 分别在什么场景使用？"
        ],
        "floor": 4
      },
      {
        "id": "ml-003",
        "difficulty": "medium",
        "type": "single",
        "question": "Adam 优化器相比 SGD 的核心改进是什么？",
        "options": [
          "A. 同时用一阶矩（动量）和二阶矩（梯度方差）为每个参数自适应调整学习率",
          "B. 完全固定学习率，只按梯度符号更新",
          "C. 每次只用单个样本更新，噪声更大",
          "D. 不需要设置任何超参数"
        ],
        "answer": "A",
        "explanation": "Adam=动量+自适应学习率：一阶矩 mₜ 做指数移动平均平滑噪声（β₁≈0.9），二阶矩 vₜ 估计梯度尺度（β₂≈0.999），更新 θₜ=θₜ₋₁−η·m̂ₜ/(√v̂ₜ+ε)，并做偏差修正消除初期低估。效果上梯度大的参数步长自动缩小、梯度小的放大。SGD 的局限是学习率难调（过大震荡/过小慢）、各参数同等对待、鞍点停滞。实践建议：Adam 是默认首选，尤其 NLP/Transformer。",
        "tags": [
          "optimizer",
          "adam"
        ],
        "week": "week3-深度学习组件",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "简述 Adam 的五个步骤（从算梯度到参数更新）？",
          "Adam 里的 β₁、β₂ 分别控制什么？偏差修正解决什么问题？",
          "什么情况下 SGD+Momentum 反而比 Adam 好？"
        ],
        "floor": 4
      },
      {
        "id": "ml-004",
        "difficulty": "medium",
        "type": "single",
        "question": "关于损失函数的选择，下列说法正确的是？",
        "options": [
          "A. 分类任务标配 Softmax+交叉熵，回归任务常用 MSE",
          "B. 分类任务用 MSE，回归任务用交叉熵",
          "C. 交叉熵只能用于二分类任务",
          "D. MSE 的输出一定可以解释为概率"
        ],
        "answer": "A",
        "explanation": "MSE=(ŷ−y)² 衡量数值差距，适合回归；交叉熵 L=−Σyᵢlog(ŷᵢ) 衡量预测分布与真实分布的差异，配合 Softmax（输出概率分布、和为 1）是分类标配——课程实战手写 softmax+onehot+log 交叉熵与 torch 结果完全一致（0.7676）。三者闭环：损失函数给目标 → 反向传播算梯度 → 梯度下降更新。",
        "tags": [
          "loss",
          "cross-entropy"
        ],
        "week": "week2-深度学习基础",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "为什么交叉熵要和 Softmax 配合使用？",
          "nn.CrossEntropyLoss 内部已经包含 Softmax，它和手动先 Softmax 再算交叉熵有什么区别？"
        ],
        "floor": 4
      },
      {
        "id": "ml-005",
        "difficulty": "easy",
        "type": "single",
        "question": "Transformer/BERT 等 NLP 模型为什么用 LayerNorm 而不用 BatchNorm？",
        "options": [
          "A. BN 依赖 batch 统计量，NLP 序列长度不一、batch 又小，统计不稳定",
          "B. LN 在 batch 维度归一化，依赖 batch size",
          "C. BN 不需要可学习参数 γ、β",
          "D. LN 无法在 GPU 上运行"
        ],
        "answer": "A",
        "explanation": "BN 在 batch 方向归一化（每个特征维），训练用当前 batch 统计、推理用移动平均；NLP 序列长度不一、padding 多，且 batch 小（显存限制），BN 统计量不准。LN 对每个样本在特征方向归一化，不依赖 batch 和序列长度，训练/推理一致，是 Transformer/BERT 的标准。归一化公式 x̂=(x−μ)/√(σ²+ε)，γ、β 可学习。",
        "tags": [
          "normalization",
          "layernorm"
        ],
        "week": "week3-深度学习组件",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "什么场景下 BatchNorm 反而更合适？",
          "现代大模型常用的 RMSNorm 和 LayerNorm 有什么区别？",
          "归一化公式里的 γ、β 是什么？为什么需要它们？"
        ],
        "floor": 4
      },
      {
        "id": "ml-006",
        "difficulty": "hard",
        "type": "single",
        "question": "PyTorch 默认采用 inverted dropout，下列说法正确的是？",
        "options": [
          "A. 训练时输出除以 (1−p) 保持期望不变，推理时不做任何缩放",
          "B. 训练和推理时都按 p 随机屏蔽神经元",
          "C. 只有推理时做屏蔽，训练时不屏蔽",
          "D. 训练时屏蔽后不缩放，推理时乘 (1−p)"
        ],
        "answer": "A",
        "explanation": "inverted dropout 训练时 y=x·mask/(1−p)：屏蔽 p 比例神经元并放大保留值，使输出期望不变；推理时 y=x 无需缩放（PyTorch 默认）。注意推理前必须 model.eval() 关闭屏蔽，否则预测不稳定。Dropout 强迫网络学分散特征，相当于 2ⁿ 个子网络集成，防过拟合；与权重衰减（L2 正则化，惩罚大权重）是常用正则化组合。",
        "tags": [
          "regularization",
          "dropout"
        ],
        "week": "week3-深度学习组件",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "为什么推理前必须调用 model.eval()？不调用会怎样？",
          "权重衰减（L2 正则化）和 Dropout 防过拟合的机制有何不同？",
          "Dropout 的 p 一般怎么设（Embedding 后 / 全连接层前）？"
        ],
        "floor": 4
      },
      {
        "id": "ml-007",
        "difficulty": "easy",
        "type": "boolean",
        "question": "梯度下降中，学习率设置过大可能导致损失震荡甚至发散，设置过小则收敛极慢。",
        "answer": true,
        "explanation": "更新式 W←W−η·∇L，η 太大一步跨过头（震荡/发散），η 太小每步挪动极小（收敛慢）。课程 GradientDescent 实战（合理学习率）loss 47.75→0.0006 即为效果验证。实践中常用学习率调度：初期 warmup 小学习率线性增，后期阶梯衰减或余弦退火——开始大步探索、后期小步精调。",
        "tags": [
          "optimizer",
          "learning-rate"
        ],
        "week": "week2-深度学习基础",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "学习率调度有哪些方式？warmup 的作用是什么？",
          "训练时怎么判断当前学习率设置过大还是过小？"
        ],
        "floor": 4
      },
      {
        "id": "ml-008",
        "difficulty": "medium",
        "type": "boolean",
        "question": "LSTM 通过细胞状态 c 直接传播信息，彻底解决了 RNN 的梯度消失问题。",
        "answer": false,
        "explanation": "LSTM 用遗忘门/输入门/输出门控制信息流动，细胞状态 cₜ=fₜ⊙cₜ₋₁+iₜ⊙c̃ₜ 直接传播、梯度通道顺畅，显著缓解（而不是彻底解决）梯度消失——课程笔记明确写\"缓解梯度消失\"。超长序列仍会梯度衰减，所以后续才用 Attention：任意两位置直接相连 + 残差连接保底梯度，才真正解决长距离依赖。",
        "tags": [
          "rnn",
          "lstm",
          "gradient"
        ],
        "week": "week3-深度学习组件",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "LSTM 的三个门分别控制什么？细胞状态更新公式怎么写？",
          "为什么 Attention 能解决 RNN 的长距离依赖问题？"
        ],
        "floor": 4
      },
      {
        "id": "ml-009",
        "difficulty": "medium",
        "type": "boolean",
        "question": "如果不加任何激活函数，无论叠加多少层全连接层，整个网络仍然等价于一个线性变换。",
        "answer": true,
        "explanation": "多层线性层连乘 W₃(W₂(W₁x+b₁)+b₂)+b₃ 可以合并为单个线性变换 Wx+b，表达能力不变——多层线性=仍线性。激活函数（ReLU 等）引入非线性，深度才有意义；课程强调深度比宽度更重要，正是建立在非线性激活之上。",
        "tags": [
          "activation",
          "mlp"
        ],
        "week": "week2-深度学习基础",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "为什么说\"深度比宽度更重要\"？",
          "激活函数在神经网络中的根本作用是什么？"
        ],
        "floor": 4
      },
      {
        "id": "ml-010",
        "difficulty": "medium",
        "type": "open",
        "question": "请用直觉解释反向传播（Backpropagation）的过程，并说明它和链式法则的关系。",
        "points": [
          "前向传播：输入逐层计算得到预测 ŷ，与真实 y 算出损失 L（损失函数给目标）",
          "反向：从损失出发，用链式法则（dy/dx=f'(g(x))·g'(x)，局部梯度逐层相乘）从输出层往回计算每个权重对损失的偏导——梯度",
          "梯度方向是损失上升最快的方向，负梯度方向下降最快",
          "参数更新：W←W−η·∇L，由优化器完成",
          "框架层面：PyTorch 自动微分代劳，训练循环 loss.backward() → optimizer.step()，且每轮先 zero_grad() 清空梯度"
        ],
        "answer": [
          "前向算出损失，反向用链式法则从输出层逐层计算每个权重的梯度",
          "梯度指向损失上升最快的方向，沿负梯度方向更新参数"
        ],
        "explanation": "反向传播=链式法则的工程化应用。面试强调三点：①逐层局部梯度相乘；②梯度的几何含义（上升最快方向，负梯度下降）；③框架帮你算梯度（zero_grad→backward→step 循环）。week1 手写梯度下降踩过学习率/符号的坑，week2 用 torch 自动微分即体会到\"框架算梯度\"的价值。",
        "tags": [
          "backprop",
          "chain-rule"
        ],
        "week": "week2-深度学习基础",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "训练循环里为什么要 optimizer.zero_grad()？不清零会怎样？",
          "手推一个两层网络某个权重的梯度计算过程。"
        ],
        "floor": 4
      },
      {
        "id": "ml-011",
        "difficulty": "hard",
        "type": "open",
        "question": "对比 BatchNorm 和 LayerNorm 的归一化方式，并说明为什么 NLP/Transformer 首选 LayerNorm。",
        "points": [
          "归一化维度：BN 在 batch 方向按特征维归一化（依赖 batch 统计量）；LN 对每个样本在特征方向归一化（不依赖 batch）",
          "序列长度不一/padding：NLP 变长序列 padding 多，BN 统计量被污染、不准",
          "batch 小：显存限制下 batch size 小，BN 统计不稳定；推理时 BN 用移动平均的全局统计量，变长序列下不好用",
          "LN 训练/推理一致，是 Transformer/BERT 的标准选择",
          "加分项：现代大模型常用 RMSNorm（去掉均值中心化、只做缩放，更快更省）"
        ],
        "answer": [
          "BN 按 batch 归一化、LN 按样本归一化",
          "序列变长、batch 小、推理统计量三个原因"
        ],
        "explanation": "先答定义对比（归一化维度），再答三个原因（变长/padding、batch 小、推理一致性），最后答出 RMSNorm 加分。归一化解决的是内部协变量偏移（各层输入分布漂移导致训练不稳定）。week3 实战手写 BN 与 torch 输出一致验证过。",
        "tags": [
          "normalization",
          "batchnorm",
          "layernorm"
        ],
        "week": "week3-深度学习组件",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "什么是内部协变量偏移（Internal Covariate Shift）？归一化如何缓解它？",
          "图像任务里 BatchNorm 为什么效果好？"
        ],
        "floor": 4
      },
      {
        "id": "ml-012",
        "difficulty": "hard",
        "type": "open",
        "question": "什么是梯度消失和梯度爆炸？为什么深度网络会出现？请至少列出三种缓解手段。",
        "points": [
          "定义：反向传播梯度逐层连乘，连乘结果 <1 时深层梯度趋近 0（消失），>1 时指数放大（爆炸）",
          "原因：链式法则连乘 + 层数深；Sigmoid/Tanh 两端导数趋近 0（饱和区）加剧消失；RNN 长序列隐状态 tanh 反复传递尤其严重",
          "缓解 1：激活函数换 ReLU（正区间导数恒为 1，梯度不衰减）",
          "缓解 2：残差连接 y=x+f(x)，梯度有恒等通路保底（∂y/∂x=1+∂f/∂x），Transformer 靠它堆几十上百层",
          "缓解 3：归一化（LayerNorm/BatchNorm）稳定各层输入分布，避免进入激活饱和区",
          "其他可选：合理初始化、梯度裁剪、LSTM 细胞状态直接传播"
        ],
        "answer": [
          "梯度连乘趋 0 或爆炸，深度网络 + Sigmoid/Tanh 饱和加剧",
          "缓解：ReLU、残差连接、LayerNorm/BN、梯度裁剪、LSTM"
        ],
        "explanation": "从\"梯度=链式连乘\"切入，原因列 1-2 条、缓解列 2-3 条即可拿满分。残差连接和 LayerNorm 是 Transformer 两大保梯度机制，务必答出；RNN 场景可补 LSTM/Attention。",
        "tags": [
          "gradient",
          "vanishing",
          "residual"
        ],
        "week": "week2-深度学习基础",
        "project": "none",
        "stack": "transformer",
        "variants": [
          "残差连接为什么能缓解梯度消失？写出梯度表达式。",
          "梯度爆炸一般怎么处理？梯度裁剪的原理是什么？"
        ],
        "floor": 4
      },
      {
        "id": "agx-001",
        "difficulty": "easy",
        "type": "single",
        "question": "在 FC/MCP/CLI 三层工具调用架构中，\"把 shell 当作模型可调用的通用工具：模型生成命令字符串，宿主沙箱执行后把 stdout/stderr 回传模型解读\"属于哪一层？",
        "options": [
          "A. 意图生成层（Function Call）",
          "B. 协议接入层（MCP）",
          "C. 执行实现层（CLI）",
          "D. 记忆检索层（RAG）"
        ],
        "answer": "C",
        "explanation": "三层架构：Function Call 是模型能力层（意图生成，输出 name+args 结构化指令）、MCP 是协议标准层（接入规范，工具发现/鉴权）、CLI 是工具实现层（执行手段，把 shell 当通用工具）。CLI 通常仍由 Function Call 触发（run_shell 工具），本质是\"与其为每个操作写工具，不如把整个 shell 交给模型\"——一个 run_shell 能抵无数工具。",
        "tags": [
          "agent",
          "tool-calling",
          "cli"
        ],
        "week": "week11-工具调用",
        "project": "none",
        "stack": "agent",
        "variants": [
          "CLI 的两种形态（单一 run_bash vs 具名封装工具）分别适用什么场景？",
          "为什么说\"一个 run_shell 能抵无数工具\"？它有什么安全风险？",
          "使用 CLI 时应该把命令行当作什么级别的用户对待？为什么必须配沙箱？"
        ],
        "floor": 4
      },
      {
        "id": "agx-002",
        "difficulty": "medium",
        "type": "single",
        "question": "真实生产系统中，Function Calling、MCP、CLI 三者是怎样的关系？",
        "options": [
          "A. 三选一：工具少用 FC、工具多用 MCP、工程师场景用 CLI，只能互斥选一个",
          "B. 分层协作不互斥：Function Call 生成意图 → 经 MCP 发现+鉴权 → 由 CLI 或具名工具执行，三层叠加成一套栈",
          "C. MCP 是最底层的执行手段，CLI 是最上层的协议标准，FC 在中间",
          "D. 三者是同一能力的三种叫法，本质完全相同"
        ],
        "answer": "B",
        "explanation": "三者分层不互斥：FC 是指令（意图），MCP 是协议与门禁（接入），CLI 是双手（执行）——真实系统三层叠加。模型先输出 FC 意图，经 MCP 动态发现工具并鉴权，最终由 CLI 或具名工具执行。选型参考：工具少/快速原型→Function Call；多工具生态/跨产品→MCP；工程师场景/现成命令→CLI+沙箱；企业级高安全→MCP+Function Call。MCP 核心价值是把 M×N 对接降成 M+N 线性扩展。",
        "tags": [
          "agent",
          "tool-calling",
          "mcp",
          "cli"
        ],
        "week": "week11-工具调用",
        "project": "none",
        "stack": "agent",
        "variants": [
          "什么时候优先选 MCP？什么时候纯 Function Call 就够？",
          "三种方式的接入成本从低到高怎么排？为什么？"
        ],
        "floor": 4
      },
      {
        "id": "agx-003",
        "difficulty": "medium",
        "type": "single",
        "question": "Agent 循环中，\"连续几步反复调用同一个工具、传入同样的参数\"这个现象，最应该用哪种手段拦截？",
        "options": [
          "A. 最大步数硬限制（max_steps）",
          "B. 重复 Action 检测：识别\"相同工具+相同参数\"的循环调用，打断并提示换方法",
          "C. Observation 质量监控：检测返回结果没有新信息",
          "D. 反思机制：多步无进展时让模型停下来重新想思路"
        ],
        "answer": "B",
        "explanation": "防死循环四手段各司其职：最大步数是兜底硬限制；重复 Action 检测专门拦截\"反复调同一工具同一参数\"的重试循环；Observation 质量监控管\"返回结果无新信息，提示换方法\"；反思机制管\"走了 N 步还没进展，让模型停下反思是不是思路错了\"。四者配合使用，生产实践 max_steps 通常设 5-15。无论模型多强，最大步数硬限制都必须有。",
        "tags": [
          "agent",
          "react",
          "死循环"
        ],
        "week": "week12-AGENT",
        "project": "none",
        "stack": "agent",
        "variants": [
          "Agent 循环的终止条件有哪几类？",
          "最大步数设太大或太小分别有什么问题？",
          "反思机制和重复 Action 检测的区别是什么？"
        ],
        "floor": 4
      },
      {
        "id": "agx-004",
        "difficulty": "easy",
        "type": "single",
        "question": "关于 Skill（技能）的定位，下列说法最准确的是？",
        "options": [
          "A. Skill 是给 Agent 的\"程序性记忆\"：封装行为逻辑 + 内嵌知识 + 工具调用，可复用、可渐进式加载",
          "B. Skill 就是函数调用（Function Call），只是换了个名字",
          "C. Skill 是外部向量库的一种检索索引",
          "D. Skill 是模型微调时的一种数据格式"
        ],
        "answer": "A",
        "explanation": "Skill 是 Agent 的程序性记忆（过程性知识：怎么做一件事的完整流程），区别于声明性记忆（事实/偏好）。Skills = 行为逻辑 + 内嵌知识 + 工具调用 + 渐进式 Context 管理；它是 FC/MCP/RAG 的上层调度者，FC/MCP/RAG 都是 Skill 内部可选执行模块，不是替代关系。设计核心是单一职责：一个 Skill 做一件事，拆分后更易测试复用。",
        "tags": [
          "agent",
          "skill",
          "harness"
        ],
        "week": "week13-harness和skills",
        "project": "none",
        "stack": "agent",
        "variants": [
          "Skill 和 Function Call 的本质区别是什么？",
          "为什么说 Skill 是\"程序性记忆\"？它和声明性记忆有什么区别？",
          "Skill 的四种形态（纯代码工具/工作流编排/知识复合型/元技能）分别是什么？"
        ],
        "floor": 4
      },
      {
        "id": "agx-005",
        "difficulty": "hard",
        "type": "single",
        "question": "自进化 Agent 的\"个体学习（运行时自改进）\"机制，其核心工作方式是什么？",
        "options": [
          "A. 模型每次回答前都重新读取并对比全部 Skill，选择最优的用",
          "B. Nudge 触发：每 N 次工具调用后异步派生后台回顾 Agent，审查对话快照，用 skill_manage(create/patch) 把经验沉淀成或更新 Skill",
          "C. 用参数量更大的模型定期对全部 Skill 做全量重写",
          "D. 每次任务失败就把失败日志直接追加进 system prompt，越堆越长"
        ],
        "answer": "B",
        "explanation": "个体学习是经验/失败驱动：每 10 次工具调用触发一次 Nudge，在响应交付后（不抢占注意力）非同步派生独立后台回顾 Agent，审查对话快照判断是否有值得沉淀的经验，用 skill_manage(create/patch) 写回 Skill。关键约束：nudge_interval=0 禁止嵌套触发（防无限递归）、max_iterations 轻量执行（如 20）、主动调用归零（避免刚创建又提醒）。自进化的本质是评估驱动——没有评估集就没有进化方向。",
        "tags": [
          "agent",
          "self-evolving",
          "skill",
          "nudge"
        ],
        "week": "week14-自进化agent",
        "project": "none",
        "stack": "agent",
        "variants": [
          "自进化的两层机制（个体学习 + 种群进化）分别是什么？有什么区别？",
          "为什么 Nudge 要在\"响应交付后\"异步触发，而不是回答前？",
          "自进化引擎有哪些安全边界（防嵌套/轻量化约束）？"
        ],
        "floor": 4
      },
      {
        "id": "agx-006",
        "difficulty": "medium",
        "type": "single",
        "question": "关于提升工具调用准确率，以下说法错误的是？",
        "options": [
          "A. 工具 description 写清楚\"做什么/什么时候用/参数含义\"，直接影响模型何时调用、怎么调用",
          "B. 参数加枚举值让模型从候选中选，比自由发挥更稳",
          "C. 用 JSON Schema 约束解码（guided_json）保证参数格式 100% 合法，就能彻底解决工具选错的问题",
          "D. 让模型先 Thought 再 Action，先想清楚再调用，准确率更高"
        ],
        "answer": "C",
        "explanation": "约束解码只保证\"输出格式 100% 合法\"（Schema 通过率从 60-80% 提升到 100%，速度影响 <5%），但格式合法 ≠ 调用了正确的工具。工具选错是语义/意图决策问题，要靠描述清晰、few-shot 示例、工具路由、先 Thought 再 Action 等手段解决。A/B/D 都是有效的准确率提升手段。描述模糊正是工具调用失败的主因之一。",
        "tags": [
          "agent",
          "tool-calling",
          "准确率",
          "guided-json"
        ],
        "week": "week11-工具调用",
        "project": "none",
        "stack": "agent",
        "variants": [
          "约束解码和\"让模型自己吐 JSON\"相比强在哪？它解决不了什么问题？",
          "工具路由（先分大类、再在小类里选）为什么能提升准确率？"
        ],
        "floor": 4
      },
      {
        "id": "agx-007",
        "difficulty": "medium",
        "type": "boolean",
        "question": "Agent 记忆系统设计时，把对话中的信息尽量完整地记下来（记得越多越好），这样长期记忆最全、Agent 表现最好。",
        "answer": false,
        "explanation": "设计原则恰恰相反：\"重要的记下来，没用的忘掉\"——记忆太多反而会干扰当前推理、污染上下文。四层记忆各司其职：工作记忆（当前对话上下文）→ 短期记忆（最近 N 轮）→ 长期记忆（重要知识/偏好/事实）→ 语义记忆（向量库+全文检索做模糊召回）。靠 Memory Flush（对话结束把工作记忆里的重要信息三趟提取：知识点/偏好/待办，写入长期记忆）和 Compaction（长期记忆条目 >50 自动合并精简，防止无限膨胀）保证记忆\"精\"而非\"多\"。",
        "tags": [
          "agent",
          "memory",
          "compaction",
          "flush"
        ],
        "week": "week12-AGENT",
        "project": "none",
        "stack": "agent",
        "variants": [
          "Memory Flush 和 Compaction 分别解决什么问题？触发条件是什么？",
          "四层记忆分别用什么存储？为什么这么分层？"
        ],
        "floor": 4
      },
      {
        "id": "agx-008",
        "difficulty": "easy",
        "type": "boolean",
        "question": "Skills 范式是 Function Calling、MCP、RAG 的上层调度者——FC/MCP/RAG 都可以作为 Skill 内部的执行模块，四者不互斥。",
        "answer": true,
        "explanation": "演进路径：Function Call（2023 单次调用）→ MCP（2024 标准化接口）→ RAG（知识检索注入）→ Skills（2024-25 封装行为+知识，渐进式加载）。Skills 为解决\"能力越强、上下文越重、推理越低效\"的核心矛盾而生：工具膨胀（定义涌入 prompt，误触发率上升）、上下文爆炸（工具描述+系统 Prompt 占 65%+ 非任务内容，成本 2-3x 倍增）、能力模糊（调用与知识检索混杂）。Skill 内部可内嵌 RAG 作为知识获取步骤、调用 FC 作为执行原语——是上层调度者，不是替代。",
        "tags": [
          "agent",
          "skill",
          "harness"
        ],
        "week": "week13-harness和skills",
        "project": "none",
        "stack": "agent",
        "variants": [
          "Skills 范式要解决的核心矛盾是什么？",
          "演进路径 FC → MCP → RAG → Skills 每一步分别解决了什么问题？"
        ],
        "floor": 4
      },
      {
        "id": "agx-009",
        "difficulty": "medium",
        "type": "boolean",
        "question": "自进化 Agent 的后台回顾 Agent（负责把经验写成 Skill）必须禁止嵌套触发（如 nudge_interval=0），否则会陷入无限递归。",
        "answer": true,
        "explanation": "如果后台回顾 Agent 自己也在跑 Agent 循环、也能触发 Nudge，就会形成\"回顾 Agent → 又触发 Nudge → 又派生回顾 Agent\"的无限递归。所以个体学习机制强制 nudge_interval=0 禁止嵌套触发，并限制 max_iterations 轻量执行（如 20 次），这是自进化的安全边界之一。类似的，delegate_task 垂直委托会排除 delegate 工具本身，防止子 Agent 递归委派。",
        "tags": [
          "agent",
          "self-evolving",
          "防递归"
        ],
        "week": "week14-自进化agent",
        "project": "none",
        "stack": "agent",
        "variants": [
          "自进化引擎还有哪些安全边界（除了禁止嵌套触发）？",
          "为什么要对后台回顾 Agent 做轻量化约束（max_iterations）？如果不约束会怎样？"
        ],
        "floor": 4
      },
      {
        "id": "agx-010",
        "difficulty": "hard",
        "type": "open",
        "question": "请从多个层面说明：怎么提升 Agent 工具调用的准确率？",
        "points": [
          "Prompt/描述层面：工具 description 写清楚\"做什么/什么时候用/参数含义\"（模糊描述是调用失败主因，直接影响模型何时调、怎么调）；参数加枚举值让模型从候选中选而非自由发挥；给 examples（few-shot）展示\"什么情况调用什么工具\"",
          "技术层面：用支持 function calling 的模型（输出格式由 API 保证），比让模型自己吐 JSON 准得多；用 JSON Schema 约束解码（guided_json）保证参数格式 100% 合法（Schema 通过率 60-80%→100%，速度影响 <5%）；参数校验 + 自动重试，把错误信息回灌让模型修正",
          "流程层面：工具路由先分类确定大类别、再在小类里选；让模型先 Thought 再 Action，先想清楚再调用，准确率更高",
          "指出约束解码只保证\"格式合法\"、不解决\"选对工具\"的语义决策问题（加分项）"
        ],
        "answer": [
          "描述清晰 + 枚举约束 + few-shot（Prompt 层）",
          "约束解码 + 参数校验重试（技术层）",
          "工具路由 + Thought 先行（流程层）"
        ],
        "explanation": "三层缺一不可：描述影响\"何时调、怎么调\"，约束解码保证\"格式对\"，路由和 Thought 保证\"选对工具\"。能指出\"格式合法 ≠ 选对工具\"说明真正理解工具调用系统。",
        "tags": [
          "agent",
          "tool-calling",
          "准确率"
        ],
        "week": "week11-工具调用",
        "project": "none",
        "stack": "agent",
        "variants": [
          "模型反复调用同一个错误工具，你会从哪些方向排查和修复？",
          "约束解码（guided_json）的原理是什么？对推理速度影响多大？"
        ],
        "floor": 4
      },
      {
        "id": "agx-011",
        "difficulty": "medium",
        "type": "open",
        "question": "Agent 循环（ReAct/OTAC）怎么终止？出现死循环时有哪些处理手段？",
        "points": [
          "终止条件四类：任务完成（模型输出 Final Answer / 明确说任务完成）；达到最大步数（硬限制防死循环，最兜底必须有）；工具连续调用失败 N 次则终止报错；模型主动放弃（判断信息不够，主动说明需要更多信息）",
          "死循环预防手段：最大步数硬限制；重复 Action 检测（连续几步同工具同参数则打断）；Observation 质量监控（返回结果没有新信息，提示模型换方法）；反思机制（走了 N 步还没进展，让模型停下来反思是不是思路错了）",
          "加分项：OTAC 循环的 Check 三决策 PASS/RETRY/ROLLBACK（先做再查，把错误消灭在当步）；幻觉传播缓解（错误 Observation 污染后续推理，用工具层验证/循环层 Check/系统层 RAG+人工审核）"
        ],
        "answer": [
          "终止：Final Answer / 最大步数 / 连续失败 / 主动放弃",
          "防死循环：步数硬限制 + 重复检测 + 质量监控 + 反思"
        ],
        "explanation": "核心是讲清\"终止\"与\"防死循环\"两层：最大步数是最兜底的硬限制必须有；重复 Action 检测、Observation 质量监控、反思机制分别拦截不同类型的空转。能补 OTAC 的 Check（PASS/RETRY/ROLLBACK）和幻觉传播说明有工程认知。",
        "tags": [
          "agent",
          "react",
          "死循环"
        ],
        "week": "week12-AGENT",
        "project": "none",
        "stack": "agent",
        "variants": [
          "ReAct 循环的局限是什么？OTAC 循环是怎么弥补的？",
          "幻觉在 Agent 循环中为什么会不断放大？怎么缓解？"
        ],
        "floor": 4
      },
      {
        "id": "agx-012",
        "difficulty": "hard",
        "type": "open",
        "question": "描述自进化 Agent 的\"失败驱动 Skill 进化\"机制：经验从哪里来、怎么沉淀、怎么系统优化？",
        "points": [
          "失败/经验是进化的原始信号：Agent 执行任务失败或发现更好做法时才有进化素材（如 flash-card skill 首次在 Hermes 环境执行必然失败——旧版把 Cursor 的 .cursor 目录硬编码，Hermes 不存在；根因是环境硬编码，是最隐蔽的 bug）",
          "个体学习（运行时自改进）：Nudge 每 10 次工具调用触发，响应交付后异步派生后台回顾 Agent，审查对话快照，调用 skill_manage(create/patch) 沉淀/更新 Skill；约束 nudge_interval=0 防嵌套、max_iterations 轻量、主动调用归零",
          "系统优化（种群进化 GEPA）：把 SKILL.md 当\"基因\"，DSPy 遗传算法——突变（LLM 改写指令步骤）/交叉（混合两变体段落）/自然选择（帕累托排序淘汰）；多目标：准确性 + Token 效率 + 鲁棒性，保留帕累托前沿多个优质变体按任务选用",
          "评估驱动：没有评估集就没有进化方向（如 60 题评估集发现规则盲区）；进化要验证\"零功能损失\"（产物 md5 一致才算成功）"
        ],
        "answer": [
          "失败是信号 → Nudge 后台回顾沉淀成 Skill（个体学习）",
          "GEPA 把 Skill 当基因，多目标帕累托优化（种群进化）",
          "评估集驱动 + 零功能损失（md5 一致）验证"
        ],
        "explanation": "核心逻辑链条：失败驱动发现经验（Nudge 个体学习）→ 评估驱动系统优化（GEPA 种群进化）→ 验证兜底（评估集 + 零功能损失）。能讲清防嵌套安全边界、\"环境硬编码是最隐蔽的 bug\"案例、帕累托多目标优于单一指标，即可得满分。",
        "tags": [
          "agent",
          "self-evolving",
          "skill",
          "gepa"
        ],
        "week": "week14-自进化agent",
        "project": "none",
        "stack": "agent",
        "variants": [
          "为什么说\"环境硬编码是最隐蔽的 bug\"？flash-card 优化案例说明了什么？",
          "种群进化（GEPA）对比其他方案（Voyager/ADAS/DSPy MIPROv2）强在哪里？",
          "帕累托多目标优化为什么不要求唯一的\"最优解\"？变体怎么按任务选用？"
        ],
        "floor": 4
      },
      {
        "id": "grf-001",
        "difficulty": "easy",
        "type": "single",
        "question": "知识图谱中最基本的知识表示单元「三元组」指的是什么？",
        "options": [
          "A. (实体, 属性, 属性值)",
          "B. (主语, 谓语, 宾语)，如（李白, 创作, 静夜思）",
          "C. (头实体, 尾实体, 向量)",
          "D. (查询, 上下文, 答案)"
        ],
        "answer": "B",
        "explanation": "三元组 (Subject, Predicate, Object) 是知识图谱的最小知识单元，主语和宾语是实体（节点），谓语是实体间的关系（边）。如（李白, 创作, 静夜思）。A 是属性三元组的一种变体，不是标准定义；C/D 不是知识表示单元。",
        "tags": [
          "graph",
          "knowledge-graph",
          "triple"
        ],
        "week": "week15-graph和llm",
        "project": "none",
        "stack": "rag",
        "variants": [
          "三元组中的实体、关系和属性分别对应图结构中的什么？",
          "如何用三元组表示「某公司的子公司」这类关系？"
        ],
        "floor": 4
      },
      {
        "id": "grf-002",
        "difficulty": "medium",
        "type": "single",
        "question": "相比纯向量检索 RAG，知识图谱/GraphRAG 最核心的增量优势是什么？",
        "options": [
          "A. 构建成本更低、索引速度更快",
          "B. 支持多跳关系推理，且答案路径可溯源、可解释",
          "C. 能处理超长上下文，不再需要分块",
          "D. 完全消除 LLM 幻觉"
        ],
        "answer": "B",
        "explanation": "KG 补齐 LLM 的两大短板：幻觉（无溯源）+ 结构推理弱（多跳/关系链不稳）。图结构天然支持沿关系链做多跳推理，且每条答案都有实体/路径可回溯，可解释性高。向量 RAG 做语义相似召回，单跳事实强但多跳弱。A 相反（GraphRAG 成本更高）；D 夸大了能力，只能缓解幻觉（如幻觉核验）。",
        "tags": [
          "graphrag",
          "rag",
          "multi-hop"
        ],
        "week": "week15-graph和llm",
        "project": "none",
        "stack": "rag",
        "variants": [
          "什么类型的查询适合走图而不是向量检索？",
          "KG 如何帮助缓解 LLM 的幻觉问题？"
        ],
        "floor": 4
      },
      {
        "id": "grf-003",
        "difficulty": "medium",
        "type": "single",
        "question": "关于图数据库（如 Neo4j）与向量数据库的本质区别，下列说法正确的是？",
        "options": [
          "A. 两者都能高效做语义相似度召回，只是存储格式不同",
          "B. 图数据库擅长按关系遍历、多跳查询；向量数据库擅长语义相似度检索",
          "C. 向量数据库基于 Cypher 查询语言，图数据库基于 ANN 索引",
          "D. 图数据库只能存关系，不能存实体属性"
        ],
        "answer": "B",
        "explanation": "图数据库以节点/边/属性组织数据，针对关系遍历和多跳查询优化（Cypher 查询）；向量数据库以向量 + ANN（近似最近邻）索引为核心，擅长语义相似度召回。两者是互补的：向量负责语义入口找相关，图负责多跳精确推理，不是同一种东西的两种格式。A/C/D 都混淆了两者。",
        "tags": [
          "graph",
          "neo4j",
          "vector-db",
          "database"
        ],
        "week": "week15-graph和llm",
        "project": "none",
        "stack": "rag",
        "variants": [
          "在实际 RAG 系统中，图数据库和向量数据库如何协同工作？",
          "什么场景下只靠向量库不够，需要引入图数据库？"
        ],
        "floor": 4
      },
      {
        "id": "grf-004",
        "difficulty": "medium",
        "type": "single",
        "question": "GraphRAG 的 Local Search 与 Global Search 两种在线查询模式，分别适合什么类型的问题？",
        "options": [
          "A. Local 适合全局主题总结，Global 适合具体实体查询",
          "B. Local 适合具体实体查询（如「张三和李四在哪些项目合作？」），Global 适合全局主题查询（如「这批论文的核心主题是什么？」）",
          "C. 两者都只做向量召回，只是排序方式不同",
          "D. Local 走社区摘要 Map-Reduce，Global 走实体链接 + 邻居扩展"
        ],
        "answer": "B",
        "explanation": "Local Search：实体链接 → k 跳邻居扩展 → 子图提取 → LLM 合成，针对具体实体/关系问答；Global Search：社区摘要分发 → Map 并行生成局部答案 → Reduce 聚合 → LLM 合成，针对跨社区的全局主题总结。A 说反了，C 错（都不做向量召回，走图谱），D 把两种模式的手段对调了。",
        "tags": [
          "graphrag",
          "local-search",
          "global-search"
        ],
        "week": "week15-graph和llm",
        "project": "none",
        "stack": "rag",
        "variants": [
          "Global Search 的 Map-Reduce 流程中，Map 和 Reduce 各负责什么？",
          "社区摘要为什么只适合全局主题问题而不适合具体实体问题？"
        ],
        "floor": 4
      },
      {
        "id": "grf-005",
        "difficulty": "easy",
        "type": "boolean",
        "question": "GraphRAG 的离线索引成本通常比向量 RAG 高 5-10 倍（因为要调用 LLM 做实体/关系抽取），但能显著提升全局主题问答的准确率（实测约 +30%）。",
        "answer": true,
        "explanation": "离线索引阶段 GraphRAG 要对每个文档分块调用 LLM 抽取实体和关系、建图、做 Leiden 社区检测并生成社区摘要，LLM 调用量大，成本是向量 RAG 的 5-10x；但换来全局主题问答准确率提升 30%+。值得为全局主题分析投资，所以选型要看查询类型。",
        "tags": [
          "graphrag",
          "index",
          "cost"
        ],
        "week": "week15-graph和llm",
        "project": "none",
        "stack": "rag",
        "variants": [
          "既然索引成本高，什么场景下才值得用 GraphRAG？",
          "有哪些降低 GraphRAG 索引成本的手段？"
        ],
        "floor": 4
      },
      {
        "id": "grf-006",
        "difficulty": "medium",
        "type": "boolean",
        "question": "在 Graph Engineering（多 Agent 拓扑设计）中，应该让 LLM 自由决定路由和边（即「模型定边、代码定节点内」）。",
        "answer": false,
        "explanation": "正确原则是「代码定边、模型定节点内」——路由和拓扑边用确定性 Python 保证可控可审计，LLM 只在节点内部做决策（如是否派发、如何综合）。顺序任务用图反而降性能（SWE-bench 降 1.2-12.8%）；便宜模型做路由、贵模型做推理是落地要点。",
        "tags": [
          "graph-engineering",
          "agent",
          "orchestration"
        ],
        "week": "week15-graph和llm",
        "project": "none",
        "stack": "agent",
        "variants": [
          "Orchestrator-Workers 和 Pipeline+门 两种拓扑各适合什么场景？",
          "为什么路由用确定性代码而不是让 LLM 决定更可控？"
        ],
        "floor": 4
      },
      {
        "id": "grf-007",
        "difficulty": "medium",
        "type": "open",
        "question": "请描述 GraphRAG 的离线索引（构建）流程，从原始文档到可检索的图，并说明每步的作用。",
        "points": [
          "原始文档切块（400-600 token），为抽取做准备",
          "调用 LLM 做实体/关系抽取（Prompt 驱动三元组抽取，Few-shot 零标注）",
          "基于三元组构建图谱（实体规范化，节点/边/属性入库，如 Neo4j）",
          "Leiden 社区检测（分层聚类，把图拆成社区，按公司/主题边界聚合）",
          "为每个社区生成摘要（作为 Global Search 的检索单元，离线快照）",
          "说明成本高（LLM 调用量大，约向量 RAG 的 5-10x）与收益（全局问答 +30%）"
        ],
        "answer": [
          "分块 → LLM 抽取实体关系 → 建图 → 社区检测 → 社区摘要",
          "离线一次性构建，在线查询直接读图"
        ],
        "explanation": "五步管线。要点：LLM 抽取是成本大头、Leiden 分社区、社区摘要是离线快照（数据变更后必须联动刷新，否则 Global 检索会\"无相关\"）。",
        "tags": [
          "graphrag",
          "knowledge-graph",
          "pipeline",
          "index"
        ],
        "week": "week15-graph和llm",
        "project": "none",
        "stack": "rag",
        "variants": [
          "社区摘要是离线快照，数据更新后不刷新会出什么问题？",
          "实体抽取环节如何做实体规范化，避免同一实体建出多个节点？"
        ],
        "floor": 4
      },
      {
        "id": "grf-008",
        "difficulty": "hard",
        "type": "open",
        "question": "对比「知识图谱/GraphRAG」「向量 RAG」「长上下文 LLM」三种范式（至少从多跳推理、可解释性、构建成本三维度），并说明主流混合架构如何组织，以及什么查询类型走哪条路。",
        "points": [
          "多跳推理：图强（图路径）、向量弱（相似召回）、长上下文中等（依赖 CoT）",
          "可解释性：图高（路径可溯）、向量低、长上下文低",
          "构建成本：图高、向量低、长上下文极低",
          "混合架构三层协同：向量召回（语义入口）→ 图谱推理（多跳精确）→ LLM 生成（自然语言输出）",
          "查询路由：简单单跳走向量、多跳/可审计走图；选型信号（医疗/金融风控/法律合规走图）",
          "可提 NL2Cypher 作为轻量替代（直接查图）或幻觉核验（声明转三元组查 KG）"
        ],
        "answer": [
          "三维度对比表（多跳/可解释/成本）",
          "混合三层：向量召回 → 图推理 → LLM 生成",
          "按查询类型路由"
        ],
        "explanation": "核心是\"不是越复杂越好\"：多跳/关系密集/可审计场景走图，单跳/快速上线走向量，单文档深析走长上下文。混合架构是主流，查询路由决定每类问题走哪条路。答出三维对比 + 路由原则即得高分。",
        "tags": [
          "graphrag",
          "rag",
          "architecture",
          "selection"
        ],
        "week": "week15-graph和llm",
        "project": "none",
        "stack": "rag",
        "variants": [
          "金融风控 / 法律合规场景为什么更适合图而不是纯向量检索？",
          "NL2Cypher 和 GraphRAG 有什么区别？什么时候用 NL2Cypher 更合适？"
        ],
        "floor": 4
      },
      {
        "id": "eng-001",
        "difficulty": "easy",
        "type": "single",
        "question": "Docker 中「镜像」和「容器」的关系是什么？",
        "options": [
          "A. 两者是同一个东西，叫法不同",
          "B. 镜像是只读模板，容器是镜像的运行实例（带可写层）",
          "C. 容器是镜像的压缩包",
          "D. 镜像运行完就自动销毁，容器永久保留"
        ],
        "answer": "B",
        "explanation": "镜像是只读的分层模板（代码+依赖+环境），docker run 基于镜像创建容器，容器拥有独立的可写层和隔离的运行环境。同一个镜像可启动多个容器，互不影响。项目里 docker run -d --name auth -p 443:443 就是「用镜像起容器」的标准姿势。",
        "tags": [
          "docker",
          "container",
          "devops"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "为什么说镜像是分层的？分层对镜像复用有什么好处？",
          "docker run 中 -p（端口映射）和 -v（数据卷挂载）分别解决什么问题？"
        ],
        "floor": 4
      },
      {
        "id": "eng-002",
        "difficulty": "medium",
        "type": "single",
        "question": "Docker 多阶段构建（multi-stage build）的主要作用是什么？",
        "options": [
          "A. 让构建过程可视化，方便调试",
          "B. 在最终镜像里只保留运行所需产物，显著减小镜像体积",
          "C. 加快源代码编译速度",
          "D. 支持一个 Dockerfile 构建多种语言"
        ],
        "answer": "B",
        "explanation": "多阶段构建用多个 FROM：第一阶段装编译/安装依赖（工具链、源码），第二阶段只 COPY 运行产物和最小运行依赖。构建依赖不会进最终镜像，体积从几百 MB 降到几十 MB。对 AI 服务（如 RAG 的向量模型、FastAPI 应用）尤其重要：镜像小、拉取快、攻击面小。",
        "tags": [
          "docker",
          "multi-stage",
          "devops"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "不用多阶段构建的话，镜像为什么会很大？如何看镜像分层大小？",
          "私有化交付场景下，镜像体积大会带来哪些具体问题？"
        ],
        "floor": 4
      },
      {
        "id": "eng-003",
        "difficulty": "medium",
        "type": "single",
        "question": "FastAPI 中 async def 路由和普通 def 路由的区别是什么？",
        "options": [
          "A. async def 更快，所有路由都应该写成 async def",
          "B. async def 在事件循环中运行，def 在线程池中运行（不阻塞事件循环）",
          "C. def 只能处理 GET，async def 才能处理 POST",
          "D. 两者没有区别，只是语法糖"
        ],
        "answer": "B",
        "explanation": "FastAPI 用 async def 定义协程路由（IO 密集型如调 LLM API 可并发）；普通 def 会被放到线程池执行，避免阻塞事件循环。所以 CPU 密集（向量化、重排）用 def，IO 密集（等模型返回）用 async def。delivery-rag 的 /health、/query 就是 FastAPI + uvicorn 部署的标准形态。",
        "tags": [
          "fastapi",
          "async",
          "microservice"
        ],
        "week": "week9-大模型应用补充",
        "project": "none",
        "stack": "inference",
        "variants": [
          "uvicorn 启动 FastAPI 应用时 --host 0.0.0.0 和 --port 的含义是什么？",
          "为什么调 LLM API 的接口适合用 async？GIL 对线程池有什么影响？"
        ],
        "floor": 4
      },
      {
        "id": "eng-004",
        "difficulty": "medium",
        "type": "single",
        "question": "在 OpenTelemetry 全链路追踪中，一次请求的完整调用链（如 RAG 的检索→重排→生成）称为什么？",
        "options": [
          "A. Span",
          "B. Trace",
          "C. Log",
          "D. Metric"
        ],
        "answer": "B",
        "explanation": "Trace 是一条请求的完整调用链，由多个 Span 组成；Span 是链路中的单个操作（如 hybrid_search、generation 各记一个 span，带耗时与属性）。delivery-rag 用 OpenTelemetry 标准埋点，检索/生成/评测逐 span 上报 Phoenix，RAG 命中率与 Faithfulness 可逐题追溯。",
        "tags": [
          "observability",
          "opentelemetry",
          "phoenix"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "Trace、Span、Metric 三种信号分别解决什么问题？",
          "在 span 上记录 attribute 和 event（如命中数、token 数）有什么用？"
        ],
        "floor": 4
      },
      {
        "id": "eng-005",
        "difficulty": "medium",
        "type": "single",
        "question": "RAG 评估中 Faithfulness（忠实度）衡量的是什么？",
        "options": [
          "A. 检索结果中正确答案的比例",
          "B. 答案的每个陈述能否从检索到的上下文中找到依据",
          "C. 答案生成的速度",
          "D. 知识库文档的覆盖度"
        ],
        "answer": "B",
        "explanation": "Faithfulness 是防幻觉的核心指标：把答案拆成陈述句，逐句验证能否从上下文溯源。查的是生成环节（Context Precision 才查检索）。课程最佳实践阈值 ≥0.85；delivery-rag 用 DeepSeek-as-Judge 实测 0.967，达标且超出。",
        "tags": [
          "rag",
          "evaluation",
          "faithfulness"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "Faithfulness 低说明问题在哪个环节？怎么定位是检索还是生成的问题？",
          "LLM-as-Judge 评估 Faithfulness 的原理和局限是什么？"
        ],
        "floor": 4
      },
      {
        "id": "eng-006",
        "difficulty": "easy",
        "type": "single",
        "question": "Python 项目中使用 venv 虚拟环境的主要目的是什么？",
        "options": [
          "A. 提升代码运行速度",
          "B. 隔离项目依赖，避免不同项目的包版本互相冲突",
          "C. 加密源代码",
          "D. 替代 Docker 实现容器化"
        ],
        "answer": "B",
        "explanation": "venv 为每个项目建立独立 site-packages，避免 A 项目要 fastapi 0.9、B 项目要 1.0 时的版本冲突（踩过：后台任务用系统 python 跑爬虫 → ModuleNotFoundError，必须用 venv 的绝对路径 python）。交付项目（delivery-rag、ticket-diagnose-agent）统一 python3 -m venv .venv + source .venv/bin/activate 起手。",
        "tags": [
          "python",
          "venv",
          "devops"
        ],
        "week": "week1-基本介绍",
        "project": "none",
        "stack": "rag",
        "variants": [
          "venv 和 conda、Docker 在环境隔离上有什么区别？",
          "为什么 cron/后台任务里要写 venv 下 python 的绝对路径而不是 python？"
        ],
        "floor": 4
      },
      {
        "id": "eng-007",
        "difficulty": "easy",
        "type": "boolean",
        "question": "Docker 容器通过 Linux 内核的 namespace 隔离进程、cgroup 限制资源，因此比虚拟机更轻量（秒级启动、共享宿主机内核）。",
        "answer": true,
        "explanation": "namespace 提供隔离（PID/网络/文件系统等），cgroup 限制 CPU/内存，两者都是内核特性，容器因此没有独立内核、启动快、开销小。虚拟机则需要完整的 Guest OS。这也解释了为什么容器适合微服务（FastAPI 单服务一容器）而不适合直接跑需要完整内核的场景。",
        "tags": [
          "docker",
          "namespace",
          "container"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "容器和虚拟机在安全隔离上的差异是什么？什么时候必须用虚拟机？",
          "Docker Compose 多服务编排和单容器 docker run 的区别？"
        ],
        "floor": 4
      },
      {
        "id": "eng-008",
        "difficulty": "medium",
        "type": "boolean",
        "question": "分布式存储中副本数越多系统越安全，所以副本应该尽可能多。",
        "answer": false,
        "explanation": "副本增多提升容错，但代价是写放大（每次写都要写 N 份）、空间成本、副本间一致性开销，且副本若放在同一故障域（同机柜/同交换机）会一起故障，多副本形同虚设。工程上 3 副本是常见平衡（容忍单点故障，如 EDS 重要数据至少 3 副本）；还需配合故障域规划和故障重建。",
        "tags": [
          "distributed-storage",
          "replication",
          "high-availability"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "副本放在同一机柜和跨机柜部署，可用性差别有多大？",
          "除了多副本，分布式存储还有哪些数据保护手段（如纠删码）？"
        ],
        "floor": 4
      },
      {
        "id": "eng-009",
        "difficulty": "easy",
        "type": "boolean",
        "question": "OpenTelemetry 是开源的可观测性标准（跨语言统一埋点协议），Phoenix 是基于该标准做 AI 应用 trace 可视化与分析的可观测平台，二者配合实现全链路追踪。",
        "answer": true,
        "explanation": "OpenTelemetry 提供 SDK/协议（OTLP exporter）负责采集与上报，Phoenix 负责接收、可视化与分析（LangSmith 风格 trace 视图）。delivery-rag 即 OTel 标准埋点 → Phoenix trace 全链路（检索/生成/评测逐 span），Phoenix 不可用时降级为无观测，不影响业务。",
        "tags": [
          "observability",
          "opentelemetry",
          "phoenix"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "可观测三支柱（Trace/Log/Metric）在排查 RAG 问题时各自能回答什么问题？",
          "为什么 AI 应用可观测要区分检索、生成、评测三段埋点？"
        ],
        "floor": 4
      },
      {
        "id": "eng-010",
        "difficulty": "hard",
        "type": "open",
        "question": "你在 delivery-rag 中如何用 Docker + FastAPI 做私有化部署？请说明容器化部署的关键步骤、多阶段构建解决了什么问题，以及私有化场景还要考虑哪些点。",
        "points": [
          "基础镜像选择（Python 官方 slim 镜像）+ 复制依赖清单、安装依赖（分层缓存）",
          "多阶段构建：构建阶段装全部依赖，运行阶段只 COPY 运行产物，镜像体积小、攻击面小",
          "uvicorn 启动 FastAPI 应用（--host 0.0.0.0 --port 8000），暴露 /health 健康检查、/query 接口",
          "端口映射 -p、数据卷 -v 挂载知识库/配置，config.vector_store 切换 FAISS/Milvus/ES 后端",
          "私有化要点：依赖与模型离线打包、数据不出域（企业安全合规/涉密审计）、Phoenix 可观测降级不影响业务"
        ],
        "answer": [
          "Dockerfile 多阶段构建：构建产物只留运行所需",
          "uvicorn + FastAPI 启动与 /health 健康检查",
          "私有化：离线依赖 + 数据不出域"
        ],
        "explanation": "答出「镜像→容器→启动服务」链路 + 多阶段构建瘦身 + 至少两个私有化考量点得满分。可与简历「全链路私有化独立部署，数据不出域」呼应。",
        "tags": [
          "docker",
          "fastapi",
          "deployment"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "镜像里装不进向量模型权重时，运行时挂载/下载模型的方案怎么设计？",
          "多副本部署 FastAPI 服务时，如何做负载均衡和健康检查（容器编排层）？"
        ],
        "floor": 4
      },
      {
        "id": "eng-011",
        "difficulty": "hard",
        "type": "open",
        "question": "如何为 RAG 系统搭建自动化评测体系？请说明评测集怎么构建、用哪些指标、如何防回归。",
        "points": [
          "评测集构建：领域文档为基础，LLM 辅助生成 QA + golden_context 原文校验（delivery-rag 25 篇文档 × 4 题 = 100 条；ticket 300 条程序化构造，带期望标注）",
          "指标分层：检索层 Hit Rate@K / MRR（查召回与排序），生成层 Faithfulness / Context Precision（查忠实与幻觉），RAGAS 综合框架",
          "自动化：脚本一键复现（run_ab_eval.py / run_rag_eval_deepseek.py），报告落盘，可对比方案 A/B/C",
          "防回归：离线 Mock 秒级回归（35 测 0.40s），评测集同时是回归校验锚点，改检索/生成后全量重跑对比基线，新策略上线前做 A/B"
        ],
        "answer": [
          "评测集：领域文档生成 QA + golden_context 校验",
          "指标：Hit Rate/MRR 查检索，Faithfulness 查生成",
          "回归：离线秒级 + A/B 对比基线"
        ],
        "explanation": "评测集来源可溯源 + 指标分环节 + 自动化可复现 + 回归机制，四点齐全得满分。呼应课程「RAG 评估必须分环节：Faithfulness 查生成、Context Precision 查检索」。",
        "tags": [
          "evaluation",
          "rag",
          "regression"
        ],
        "week": "week10-检索增强生成",
        "project": "none",
        "stack": "rag",
        "variants": [
          "LLM 生成的评测集如何防止「模型自己出题自己答」的偏差？",
          "上线后线上效果和离线指标不一致，可能是什么原因？"
        ],
        "floor": 4
      },
      {
        "id": "eng-012",
        "difficulty": "medium",
        "type": "open",
        "question": "分布式存储与高可用集群架构中，如何保证数据不丢、服务不中断？请结合你熟悉的 EDS/超融合场景说明关键机制。",
        "points": [
          "多副本：重要数据至少 3 副本，容忍单点故障，读写按副本数冗余",
          "故障域规划：副本跨节点/跨机柜放置，避免同故障域一起失效",
          "故障重建/自愈：节点故障后自动在健康节点重建副本，恢复冗余度",
          "高可用集群：服务多副本（负载均衡 + 故障切换），业务无感知迁移（V2V/P2V 迁移场景）",
          "一致性权衡：副本间数据一致性协议与写放大的取舍（呼应副本数不是越多越好）"
        ],
        "answer": [
          "3 副本 + 跨故障域放置",
          "故障自动重建、服务负载均衡与切换",
          "无感知迁移 + 一致性/写放大权衡"
        ],
        "explanation": "答出「副本冗余 + 故障域 + 自愈重建 + 高可用切换」四条骨架即可，能讲清副本数与成本/一致性的取舍是加分项。对应简历工作经历（EDS 分布式存储、业务无感知迁移至云）。",
        "tags": [
          "distributed-storage",
          "high-availability",
          "cluster"
        ],
        "week": "week16-大模型结构演进",
        "project": "none",
        "stack": "pretrain-sft",
        "variants": [
          "3 副本和纠删码（EC）在空间利用率和重建开销上怎么取舍？",
          "高可用集群的「脑裂」（split-brain）问题是什么？如何避免？"
        ],
        "floor": 4
      }
    ]
  }
};

// 兼容旧接口：默认题库 = 第一个
window.QUESTION_BANK = window.QUESTION_BANKS[Object.keys(window.QUESTION_BANKS)[0]].questions;
