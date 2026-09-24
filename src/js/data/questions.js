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
    "questionCount": 47,
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
        "min_keywords": 4,
        "floor": 4
      }
    ]
  }
};

// 兼容旧接口：默认题库 = 第一个
window.QUESTION_BANK = window.QUESTION_BANKS[Object.keys(window.QUESTION_BANKS)[0]].questions;
