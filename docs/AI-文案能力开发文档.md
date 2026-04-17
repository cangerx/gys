# AI 文案能力开发文档

## 1. 目标

在现有“企业产品资料与报价管理平台”中，先落地一批 **AI 文案辅助功能**，用于提升食品类产品上新、销售报价、客服接待、直播准备、多平台分发的效率。

本阶段只做以下 6 类能力：

1. 生成商品卖点
2. 生成详情页文案
3. 生成客服话术
4. 生成直播手卡文案
5. 生成报价备注
6. 生成多平台改写

原则：
- **AI 负责生成草稿**
- **人工负责审核与发布**
- 食品行业相关内容必须避免夸大宣传、疗效暗示、虚假承诺

---

## 2. 本期范围

### 2.1 生成商品卖点
根据以下输入生成卖点文案：
- 产品名称
- 品类
- 配料表
- 口味
- 规格
- 净含量
- 储存条件
- 保质期
- 使用场景
- 已有产品资料

输出：
- 3 条版卖点
- 5 条版卖点
- 精简版卖点（适合列表页/卡片）
- 标准版卖点（适合详情页）

### 2.2 生成详情页文案
生成：
- 产品简介
- 食用场景
- 推荐理由
- 核心优势
- 购买理由
- FAQ 初稿（可选）

输出风格：
- 简洁电商风
- 品牌官方风
- 招商分销风

### 2.3 生成客服话术
生成场景：
- 售前咨询
- 催单跟进
- 异议处理

输出结构：
- 标准回复
- 简短回复
- 更口语化版本

### 2.4 生成直播手卡文案
生成：
- 主播口播词
- 福利话术
- 节奏提示
- 引导下单话术
- 异议应对话术

输出适配：
- 单品讲解
- 多品连播
- 秒杀福利场景

### 2.5 生成报价备注
生成内容：
- 储存条件说明
- 保质期说明
- 发货说明
- 批次说明
- 包装/装箱说明

适配报价单导出和销售发送时附言。

### 2.6 生成多平台改写
对同一产品文案生成不同平台风格版本：
- 淘宝版
- 抖音版
- 小红书版

差异点：
- 标题长度
- 语气风格
- 卖点展开方式
- 互动引导方式

---

## 3. 明确不做

本阶段不做：
- 自动发布到外部渠道
- 自动生成并直接上线商品详情页
- 自动生成食品功效类宣传结论
- 自动生成图片/海报
- 自动审核合规
- 基于历史数据做训练/微调

这些留到后续版本。

---

## 4. 业务规则

### 4.1 审核机制
所有 AI 生成内容默认状态为：
- `draft` 草稿

只有人工确认后才能：
- 保存到正式产品资料
- 进入报价单
- 进入客服话术库
- 进入直播手卡
- 用于对外展示

### 4.2 食品行业限制
必须避免输出：
- 疗效承诺
- 医疗暗示
- 绝对化宣传（如“最好”“最安全”“100%治愈”）
- 虚构配料、营养、检测结果
- 与产品真实字段不一致的内容

### 4.3 数据优先级
生成时按以下优先级取数：
1. 产品主数据
2. SKU/规格数据
3. 食品字段（保质期、配料、营养、储存）
4. 已发布产品资料
5. 用户临时补充输入

### 4.4 可追溯要求
每次生成都要记录：
- 输入内容
- prompt 模板版本
- 模型名称
- 输出结果
- 生成人
- 生成时间
- 审核状态

---

## 5. 系统设计

## 5.1 模块划分
建议在后端新增 `ai` 领域模块。

模块拆分：
- `ai-template`：Prompt 模板管理
- `ai-generate`：调用模型生成内容
- `ai-record`：保存生成记录
- `ai-review`：审核与采纳
- `ai-policy`：行业限制词与风格规则

## 5.2 前端入口
B 端后台增加“AI辅助”入口，挂到以下页面：
- 产品编辑页
- 客服话术页
- 直播手卡页
- 报价单页
- 渠道文案页

交互方式：
- 填写/选择基础信息
- 点击“AI生成”
- 查看结果
- 支持“重新生成”
- 支持“采纳到表单”
- 支持“保存为草稿”

---

## 6. 数据表设计

### 6.1 ai_prompt_template
用于管理不同业务场景的 prompt 模板。

字段建议：
- id
- code
- name
- biz_type
- platform
- prompt_text
- output_schema_json
- status
- version
- created_by
- created_at
- updated_at

示例 `biz_type`：
- selling_points
- detail_copy
- customer_service_script
- live_card_copy
- quotation_note
- platform_rewrite

### 6.2 ai_generation_record
记录每次生成。

字段建议：
- id
- biz_type
- biz_id
- product_spu_id
- product_sku_id
- platform
- input_json
- prompt_template_id
- prompt_snapshot
- model_name
- output_text
- output_json
- status
- review_comment
- created_by
- reviewed_by
- created_at
- reviewed_at

状态建议：
- draft
- approved
- rejected
- adopted

### 6.3 ai_sensitive_rule
敏感词/限制规则。

字段建议：
- id
- rule_type
- keyword
- action
- level
- remark
- status

示例：
- rule_type: food_compliance
- action: warn / block / replace

---

## 7. API 设计

后端建议统一前缀：`/api/ai`

### 7.1 生成内容
`POST /api/ai/generate`

请求示例：
```json
{
  "bizType": "selling_points",
  "productSpuId": 1001,
  "productSkuId": 2001,
  "platform": "common",
  "extraInput": {
    "tone": "official",
    "count": 5
  }
}
```

返回示例：
```json
{
  "recordId": 1,
  "status": "draft",
  "content": {
    "title": "商品卖点",
    "items": [
      "甄选原料，口感层次更丰富",
      "规格清晰，适合零售与团购双场景",
      "储存与保质期信息明确，销售沟通更高效"
    ]
  }
}
```

### 7.2 获取生成记录
`GET /api/ai/records/:id`

### 7.3 列表查询
`GET /api/ai/records?bizType=selling_points&productSpuId=1001`

### 7.4 审核通过
`POST /api/ai/records/:id/approve`

### 7.5 驳回
`POST /api/ai/records/:id/reject`

### 7.6 采纳结果
`POST /api/ai/records/:id/adopt`

说明：
- 卖点采纳到产品卖点字段
- 详情页文案采纳到详情模块草稿
- 客服话术采纳到话术库
- 手卡文案采纳到手卡编辑器
- 报价备注采纳到报价单备注
- 平台改写采纳到渠道文案

---

## 8. 各功能输入输出定义

## 8.1 商品卖点
输入：
- product_spu
- product_sku
- ingredient_text
- flavor/spec
- net_content
- shelf_life
- storage_condition

输出：
- short_points[]
- standard_points[]

## 8.2 详情页文案
输入：
- 产品基础信息
- 食品属性
- 卖点
- 使用场景

输出：
- intro
- scenario_text
- reason_to_buy
- advantage_blocks[]

## 8.3 客服话术
输入：
- 产品信息
- 场景类型
- 常见问题

输出：
- standard_reply
- short_reply
- spoken_reply

## 8.4 直播手卡文案
输入：
- 产品信息
- 卖点
- 价格机制
- 活动信息

输出：
- opening_script
- benefit_script
- rhythm_tips
- closing_script

## 8.5 报价备注
输入：
- 保质期
- 储存条件
- 批次说明
- 发货说明
- 包装说明

输出：
- quote_note_text

## 8.6 多平台改写
输入：
- 原始文案
- 平台类型

输出：
- taobao_version
- douyin_version
- xiaohongshu_version

---

## 9. Prompt 策略

建议采用“模板 + 结构化变量”方式，不要把所有逻辑写死在代码里。

### 9.1 Prompt 组成
- 系统角色说明
- 食品行业限制
- 输出格式要求
- 输入字段注入
- 风格要求
- 禁止项

### 9.2 示例模板思路
以“生成商品卖点”为例：
- 角色：食品产品文案助手
- 目标：根据真实产品信息生成销售卖点
- 限制：不得虚构成分，不得出现疗效暗示
- 输出：3-5 条卖点，简洁、可直接用于销售

### 9.3 输出格式
优先让模型输出 JSON，方便前端直接消费。

---

## 10. 页面交互建议

## 10.1 产品编辑页
新增按钮：
- AI生成卖点
- AI生成详情页文案
- AI生成多平台文案

生成后展示：
- 左侧原内容
- 右侧 AI 结果
- 支持一键采纳

## 10.2 客服话术页
新增：
- 选择场景
- AI生成话术
- 保存到话术库

## 10.3 手卡页
新增：
- AI生成口播词
- AI生成福利话术
- AI生成节奏提示

## 10.4 报价页
新增：
- AI生成报价备注
- 一键插入到备注栏

---

## 11. 权限设计

角色建议：
- 运营：可生成、审核、采纳商品相关文案
- 销售：可生成报价备注、手卡文案、客服话术
- 管理员：全部权限

权限点建议：
- `ai:generate`
- `ai:review`
- `ai:adopt`
- `ai:template:manage`
- `ai:rule:manage`

---

## 12. 日志与监控

需要记录：
- 模型调用耗时
- 成功率/失败率
- 单功能调用次数
- 被驳回比例
- 被采纳比例

后续可以做数据看板：
- 哪类 AI 功能使用最多
- 哪类生成结果最常被采纳
- 哪个平台改写需求最多

---

## 13. 开发实施顺序

### Phase A：基础能力
1. 建 `ai_prompt_template`
2. 建 `ai_generation_record`
3. 建后端 AI 调用模块
4. 建统一生成接口 `/api/ai/generate`
5. 建基础审核流

### Phase B：先做 3 个最高价值场景
1. 商品卖点生成
2. 详情页文案生成
3. 报价备注生成

### Phase C：补销售效率场景
1. 客服话术生成
2. 直播手卡文案生成
3. 多平台改写

---

## 14. MVP 建议

如果要尽快上线，最小可用版本建议只做：
- AI生成商品卖点
- AI生成详情页文案
- AI生成报价备注

原因：
- 和产品主数据耦合最紧
- 对运营和销售价值最大
- 页面接入最简单
- 最容易验证效果

---

## 15. 验收标准

### 功能验收
- 能根据产品信息成功生成文案
- 能保存生成记录
- 能重新生成
- 能审核通过/驳回
- 能采纳到业务表单

### 业务验收
- 输出内容不虚构食品核心字段
- 不出现明显违规表述
- 销售/运营可直接复制使用
- 同一产品可按不同平台输出不同版本

---

## 16. 后续预留

后续可扩展但本期不做：
- 图片识别后辅助生成详情文案
- OCR 识别配料表并自动入库
- 批量生成整批商品文案
- 爆款风格学习
- 外部渠道自动发布
- 合规自动评分

---

## 17. 推荐技术实现

建议沿用当前主技术栈：
- 前端后台：Vue3 + art-design-pro
- 后端：NestJS
- 数据库：MySQL
- ORM：Prisma
- 缓存：Redis
- AI 调用：统一走后端服务封装

实现原则：
- AI 能力全部走后端，不在前端直接调用模型
- Prompt 模板可配置
- 输出结果可追溯
- 所有内容先草稿后审核
