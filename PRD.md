# 企业产品资料与报价管理平台 — 产品需求文档（PRD）

## 一、产品定位

对外报价与选品网站 + 内部销售生产台 + 资料资产中台。
同一份产品数据服务三个角色：客户（选品下载）、销售（报价/手卡/PPT）、运营（资料维护）。

## 二、技术选型

| 层级 | 方案 |
|------|------|
| B端前台 | art-design-pro（Vue3 + TS + Element Plus + Tailwind） |
| C端门户 | 同仓独立入口，Nuxt3 SSR（SEO友好）或 Vue3 SPA |
| 后端 API | NestJS / Spring Boot（按团队技术栈选） |
| 数据库 | MySQL 8 / PostgreSQL |
| 对象存储 | 阿里云 OSS / 腾讯 COS |
| 文档生成 | ExcelJS（报价单）、PptxGenJS（PPT）、Puppeteer（PDF） |
| 缓存/队列 | Redis |
| 企微SDK | @wecom/jssdk |

---

## 三、角色定义

| 角色 | 说明 |
|------|------|
| 超级管理员 | 全部权限，系统配置 |
| 运营 | 产品管理、资料维护、模板管理、渠道管理 |
| 销售 | 报价生成、手卡/PPT生成、客户管理、询价处理 |
| 客服 | 话术查看、客户咨询记录 |
| 客户 | 选品浏览、资料下载、询价提交、收藏 |

---

## 四、功能模块详细设计

### 模块1：产品主数据

#### 1.1 产品信息
- SPU基础信息：名称、编码、品类、品牌、产地、状态（在售/预售/停产/清仓）
- 食品属性：保质期、保质期单位（天/月）、生产日期、批次号、储存条件、食用方式、配料表、营养成分表、净含量、包装规格、执行标准、食品生产许可证编号
- SKU矩阵：口味/规格/包装等规格组合，每个SKU独立价格与库存
- MOQ（最小起订量）：按产品或按客户等级设置
- 产品标签：热销、新品、推荐、清仓等
- 负责人绑定
- 临期预警：按剩余保质期自动预警，支持临期品单独标识与报价策略

#### 1.2 价格体系
- 客户分级定价：零售价 / 批发价 / VIP价 / 代理价
- 阶梯报价：10件价、100件价、1000件价
- 币种支持：人民币、美元、欧元，汇率配置
- 报价有效期：30天/60天/90天，到期自动提醒

#### 1.3 产品对比
- 客户可勾选多个产品做参数横向对比

---

### 模块2：资料资产库

#### 2.1 资料类型
| 类型 | 格式 | 说明 |
|------|------|------|
| 产品详情页 | 富文本/模块化 | 对外展示用 |
| 产品主图 | JPG/PNG/WebP | 多角度，支持批量上传 |
| 产品视频 | MP4 | 产品展示视频 |
| 报价单模板 | Excel模板 | 可配置字段与样式 |
| 客服话术 | 富文本 | 按场景分类（售前/售后/异议处理） |
| 公司介绍 | 富文本/PDF | 企业资质、荣誉、工厂实拍 |

#### 2.2 版本管理
- 每次修改生成新版本，可回溯历史版本
- 发布审批流：编辑 → 审核 → 发布

#### 2.3 存储
- 文件统一上传至 OSS，数据库存元信息
- CDN加速分发

---

### 模块3：运费计算

#### 3.1 运费模板
- 按发货仓 → 目的地区（省/市/区）设置
- 支持多个发货仓

#### 3.2 计费方式
- 按重量：首重X元 + 续重Y元/kg
- 按体积（抛重）：长×宽×高÷系数
- 按件数：首件X元 + 续件Y元

#### 3.3 特殊规则
- 偏远地区加价（新疆/西藏/内蒙古/青海/宁夏/港澳台）
- 海外运费单独模板
- 满额包邮规则

#### 3.4 物流商
- 绑定不同物流商（顺丰/中通/德邦/跨境物流等）
- 同一订单可对比不同物流商运费

#### 3.5 报价联动
- 生成报价单时自动计算运费
- 客户看到"产品价 + 运费"总价

---

### 模块4：客户门户（对外网站）

#### 4.1 产品浏览
- 品类筛选、价格带筛选、场景筛选、关键词搜索
- 食品专属筛选：保质期区间、储存方式（常温/冷藏/冷冻）、口味、净含量、是否临期
- 产品列表（卡片/列表切换）
- 产品详情页（主图轮播、参数表、详情富文本、渠道链接）
- 详情页重点展示：保质期、生产日期、建议储存条件、配料表、营养成分表、食用说明、食品资质信息

#### 4.2 资料下载
- 主图打包下载（ZIP）
- 详情页导出PDF
- 规格书下载
- 下载需登录，记录下载行为

#### 4.3 选品与收藏
- 收藏夹
- 创建选品清单，可命名、可分享
- 产品对比功能

#### 4.4 询价闭环
- 客户提交询价单（勾选产品+数量+目的地）
- 系统自动计算预估报价（含运费）
- 食品类询价默认带出保质期、建议发货批次要求、储存/运输要求
- 销售收到通知 → 确认/调整报价 → 回复客户
- 客户确认 → 形成意向订单

#### 4.5 客户账号
- 注册/登录（手机号+验证码）
- 企业认证（公司名、营业执照）
- 绑定对接销售
- 客户等级自动/手动调整

#### 4.6 渠道链接
- 产品详情页展示各平台购买链接
- 淘宝 / 天猫 / 抖音 / 视频号 / 小红书 / 拼多多
- 链接可用性定期巡检

---

### 模块5：销售工作台

#### 5.1 报价单生成
- 勾选产品 → 选择客户 → 选择目的地 → 自动算价（产品价+运费）
- 输出格式：Excel / PDF
- 报价单自动加客户名水印（防串货）
- 报价单有效期标注
- 历史报价版本管理，同一客户可对比
- 组合报价：A+B+C打包价，支持套餐优惠
- 食品报价默认展示：保质期、生产批次/生产日期、净含量、装箱规格、储存条件、发货时效要求

#### 5.2 直播手卡生成
- 勾选产品 → 选择手卡模板 → 自动填充
- 手卡内容：
  - 产品主图
  - 核心卖点（3-5条）
  - 价格机制（原价/直播价/赠品）
  - 推荐话术
  - 异议处理话术
  - 上架顺序编号
- 多模板：抖音竖版、淘宝横版、通用版
- 输出：网页预览 / PDF下载

#### 5.3 手卡PPT生成
- 勾选产品 → 选择PPT模板 → 一键生成
- PPT结构：
  - 封面页（直播主题、日期、主播）
  - 目录页（产品清单）
  - 产品页 × N（每个产品一页：主图+卖点+价格+话术）
  - 对比页（竞品对比，可选）
  - 收尾页（福利/抽奖/引导关注）
- 输出：PPTX文件下载

#### 5.4 报价追踪
- 发送报价后追踪：客户是否打开、查看了哪些产品、停留时长
- 追踪数据推送给销售（企微通知）

#### 5.5 场次管理
- 按直播场次组织产品排序
- 预估GMV
- 直播后数据回填（实际销量、转化率）

---

### 模块6：企微集成

#### 6.1 登录与身份
- 企微扫码登录B端后台
- 企微内H5免登

#### 6.2 客户绑定
- 企微外部联系人自动关联系统客户档案

#### 6.3 素材同步
- 运营发布的产品资料自动同步到企微素材库
- 销售在企微聊天中一键转发产品卡片

#### 6.4 消息通知
- 新询价通知
- 报价到期提醒
- 客户浏览/下载行为提醒
- 审批结果通知

#### 6.5 名片小程序
- 销售个人名片页
- 带产品推荐和公司介绍
- 客户扫码即可查看

---

### 模块7：模板引擎

#### 7.1 报价单模板
- 可视化配置：logo、表头字段、备注区、水印
- 多套模板切换

#### 7.2 手卡模板
- 按平台/品类预设模板
- 支持自定义布局（拖拽式，二期）

#### 7.3 PPT模板
- 预设主题风格（商务/活泼/简约）
- 可替换封面背景、配色方案

---

### 模块8：数据看板

#### 8.1 产品热度
- 浏览量、下载量、询价量排行
- 趋势图（日/周/月）

#### 8.2 销售业绩
- 报价数量、转化率
- 客户跟进漏斗

#### 8.3 资料使用
- 话术使用频次
- 手卡/PPT生成次数
- 模板使用排行

#### 8.4 渠道分析
- 各平台链接点击量
- 渠道引流效果对比

---

### 模块9：系统管理

#### 9.1 权限管理
- 角色管理（RBAC）
- 菜单权限 + 数据权限（销售只看自己客户）
- 操作日志/审计日志

#### 9.2 系统配置
- 公司信息配置
- 汇率配置
- 地区数据维护
- 物流商配置

---

### 模块10：AI文案辅助

#### 10.1 商品卖点生成
- 根据产品资料、配料表、口味、规格、净含量、保质期、储存条件生成卖点文案
- 输出 3 条版 / 5 条版 / 精简版 / 标准版
- 用于产品卡片、详情页、销售话术补充

#### 10.2 详情页文案生成
- 生成产品简介、食用场景、推荐理由、核心优势
- 支持品牌官方风 / 电商转化风 / 招商分销风
- 生成为草稿后进入人工审核

#### 10.3 客服话术生成
- 场景：售前咨询、催单跟进、异议处理
- 输出标准版、简短版、口语化版本
- 可一键采纳到客服话术库

#### 10.4 直播手卡文案生成
- 生成主播口播词、福利话术、节奏提示、引导下单话术
- 适配单品讲解、多品连播、秒杀场景
- 可直接采纳到直播手卡编辑器

#### 10.5 报价备注生成
- 生成储存条件说明、保质期说明、发货说明、批次说明、包装说明
- 用于报价单备注区和销售发送附言

#### 10.6 多平台改写
- 基于同一原始文案生成淘宝版、抖音版、小红书版
- 控制标题长度、语气风格、互动引导差异
- 支持多次重生成和人工改写

#### 10.7 审核与追溯
- 所有 AI 结果默认为草稿，不可直接对外发布
- 记录输入内容、Prompt版本、模型、生成结果、操作人、审核状态
- 食品行业内容必须避免疗效暗示、绝对化宣传、虚构成分与功能

---

## 五、分期实施计划

### 一期 MVP（核心成交链路）
| 功能 | 说明 |
|------|------|
| 产品管理 | SPU/SKU、价格、状态、品类、食品基础字段（保质期/储存条件/净含量） |
| 资料上传 | 主图、详情、公司介绍、食品规格资料 |
| 客户门户 | 产品浏览、筛选、详情页、资料下载 |
| 报价单生成 | 勾选产品 → Excel/PDF，含运费 |
| 运费计算 | 基础运费模板（按重量+地区） |
| 渠道链接 | 各平台链接展示 |
| 基础权限 | 管理员/运营/销售三个角色 |

### 二期（销售效率）
| 功能 | 说明 |
|------|------|
| 直播手卡生成 | 多模板、PDF输出 |
| 手卡PPT生成 | PPTX一键生成 |
| 客户账号体系 | 注册登录、企业认证 |
| 询价闭环 | 客户询价 → 销售报价 → 确认 |
| 客户分级定价 | 多级价格、阶梯报价 |
| 报价水印 | 防串货 |
| 话术管理 | 客服话术分类维护 |
| AI卖点生成 | 根据食品信息生成商品卖点草稿 |
| AI详情文案 | 生成详情页文案草稿 |
| AI报价备注 | 生成报价备注草稿 |
| 临期预警 | 保质期预警、临期品标识与报价策略 |

### 三期（企微与运营）
| 功能 | 说明 |
|------|------|
| 企微登录 | 扫码登录、H5免登 |
| 企微通知 | 询价/报价/浏览提醒 |
| 素材同步 | 资料同步企微素材库 |
| 报价追踪 | 打开率、浏览行为 |
| 数据看板 | 产品热度、销售业绩、资料使用 |
| 场次管理 | 直播场次组织与复盘 |
| AI客服话术 | 生成售前/催单/异议处理话术 |
| AI手卡文案 | 生成口播词、福利话术、节奏提示 |
| AI多平台改写 | 生成淘宝/抖音/小红书版本 |
| 食品合规资料管理 | 配料表、营养成分表、资质证照统一维护 |

### 四期（扩展能力）
| 功能 | 说明 |
|------|------|
| 多币种 | 美元/欧元报价 + 汇率 |
| SEO优化 | SSR/预渲染，搜索引擎收录 |
| 移动端适配 | 微信内H5体验优化 |
| 名片小程序 | 销售名片+产品推荐 |
| 模板可视化编辑 | 拖拽式手卡/PPT模板编辑 |
| 渠道巡检 | 链接可用性自动检测 |

---

## 六、数据库核心表设计（一期）

### 6.1 产品相关

```
product_spu            -- 产品SPU
├── id
├── name               -- 产品名称
├── code               -- 产品编码
├── category_id        -- 品类ID
├── brand              -- 品牌
├── origin             -- 产地
├── status             -- 在售/预售/停产/清仓
├── tags               -- 标签JSON
├── description         -- 简介
├── shelf_life_value   -- 保质期数值
├── shelf_life_unit    -- day/month
├── storage_condition  -- 常温/冷藏/冷冻
├── edible_method      -- 食用方式
├── ingredient_text    -- 配料表
├── nutrition_text     -- 营养成分表
├── net_content        -- 净含量
├── standard_code      -- 执行标准
├── production_license_no -- 食品生产许可证编号
├── owner_id           -- 负责人
├── sort_order
├── created_at / updated_at

product_sku            -- 产品SKU
├── id
├── spu_id
├── sku_code
├── spec_json          -- 规格组合 {"口味":"香辣","规格":"500g"}
├── retail_price       -- 零售价
├── wholesale_price    -- 批发价
├── vip_price          -- VIP价
├── agent_price        -- 代理价
├── weight             -- 重量(kg)
├── volume_l / volume_w / volume_h  -- 体积(cm)
├── moq                -- 最小起订量
├── production_date    -- 生产日期
├── batch_no           -- 批次号
├── expiry_date        -- 到期日期（可选，按批次计算）
├── carton_spec        -- 装箱规格
├── status
├── created_at / updated_at

product_price_tier     -- 阶梯价
├── id
├── sku_id
├── min_qty
├── max_qty
├── price
├── currency           -- CNY/USD/EUR

product_category       -- 品类
├── id
├── parent_id
├── name
├── sort_order
```


### 6.2 资料资产

```
product_asset          -- 产品资料
├── id
├── spu_id
├── type               -- main_image/detail/video/spec_sheet/brochure
├── file_url           -- OSS地址
├── file_name
├── file_size
├── sort_order
├── version            -- 版本号
├── status             -- draft/published
├── created_at / updated_at

company_profile        -- 公司介绍
├── id
├── title
├── content            -- 富文本
├── attachments        -- 附件JSON
├── status
├── created_at / updated_at

customer_script        -- 客服话术
├── id
├── spu_id             -- 可为空（通用话术）
├── scene              -- pre_sale/after_sale/objection
├── title
├── content
├── platform           -- all/douyin/taobao/xiaohongshu
├── sort_order
├── created_at / updated_at
```

### 6.3 渠道链接

```
product_channel_link   -- 渠道链接
├── id
├── spu_id
├── platform           -- taobao/tmall/douyin/kuaishou/xiaohongshu/pinduoduo/wechat_video
├── url
├── short_url
├── status             -- active/expired/broken
├── last_check_at
├── created_at / updated_at
```

### 6.4 运费

```
shipping_template      -- 运费模板
├── id
├── name
├── warehouse_id       -- 发货仓
├── calc_type          -- weight/volume/piece
├── free_shipping_amount -- 满X包邮（0=不包邮）
├── is_default
├── created_at / updated_at

shipping_region_rule   -- 地区运费规则
├── id
├── template_id
├── region_codes       -- 地区编码JSON ["110000","120000"]
├── first_unit         -- 首重(kg)/首件
├── first_price        -- 首重/首件价格
├── additional_unit    -- 续重/续件
├── additional_price   -- 续重/续件价格
├── is_remote          -- 是否偏远地区

shipping_carrier       -- 物流商
├── id
├── name               -- 顺丰/中通/德邦
├── code
├── template_id        -- 关联运费模板
├── status

warehouse              -- 发货仓
├── id
├── name
├── province / city / district
├── address
├── is_default
```

### 6.5 客户与询价

```
customer               -- 客户
├── id
├── phone
├── company_name
├── contact_name
├── level              -- retail/wholesale/vip/agent
├── bindSales_id       -- 绑定销售
├── license_url        -- 营业执照
├── verified           -- 是否认证
├── created_at / updated_at

customer_favorite      -- 收藏
├── id
├── customer_id
├── spu_id
├── created_at

customer_selection     -- 选品清单
├── id
├── customer_id
├── name
├── items_json         -- [{"spu_id":1,"sku_id":2,"qty":100}]
├── created_at / updated_at

inquiry                -- 询价单
├── id
├── customer_id
├── sales_id
├── status             -- pending/quoted/confirmed/expired
├── destination_region -- 目的地区编码
├── items_json         -- 产品明细
├── total_product_price
├── total_shipping
├── total_price
├── valid_until
├── remark
├── created_at / updated_at
```

### 6.6 报价与文档

```
quotation              -- 报价单
├── id
├── inquiry_id
├── customer_id
├── sales_id
├── quotation_no       -- 报价单号
├── items_json         -- 明细
├── shipping_json      -- 运费明细
├── total_price
├── currency
├── valid_until
├── watermark_text     -- 水印文字
├── file_url           -- 生成的文件地址
├── version
├── status             -- draft/sent/viewed/expired
├── viewed_at
├── created_at / updated_at

live_card              -- 直播手卡
├── id
├── sales_id
├── template_id
├── session_name       -- 场次名称
├── items_json         -- 产品+卖点+话术
├── file_url
├── format             -- pdf/image
├── created_at / updated_at

live_ppt               -- 手卡PPT
├── id
├── sales_id
├── template_id
├── session_name
├── items_json
├── file_url
├── created_at / updated_at
```

### 6.7 AI文案

```
ai_prompt_template     -- AI提示词模板
├── id
├── code               -- 唯一编码
├── name
├── biz_type           -- selling_points/detail_copy/customer_script/live_card/quotation_note/platform_rewrite
├── platform           -- common/taobao/douyin/xiaohongshu
├── prompt_text
├── output_schema_json
├── version
├── status
├── created_by
├── created_at / updated_at

ai_generation_record   -- AI生成记录
├── id
├── biz_type
├── biz_id             -- 关联业务ID，可为空
├── product_spu_id
├── product_sku_id
├── platform
├── input_json
├── prompt_template_id
├── prompt_snapshot
├── model_name
├── output_text
├── output_json
├── status             -- draft/approved/rejected/adopted
├── review_comment
├── created_by
├── reviewed_by
├── created_at
├── reviewed_at
```

### 6.8 模板

```
doc_template           -- 文档模板
├── id
├── type               -- quotation/live_card/ppt
├── name
├── platform           -- all/douyin/taobao
├── thumbnail_url
├── config_json        -- 模板配置
├── is_default
├── created_at / updated_at
```

### 6.9 系统

```
sys_user               -- 系统用户
├── id
├── username
├── password_hash
├── name
├── phone
├── role_id
├── wecom_userid       -- 企微UserID
├── status
├── created_at / updated_at

sys_role               -- 角色
├── id
├── name
├── permissions_json

operation_log          -- 操作日志
├── id
├── user_id
├── action
├── target_type
├── target_id
├── detail
├── ip
├── created_at

download_log           -- 下载记录
├── id
├── customer_id
├── asset_id
├── spu_id
├── ip
├── created_at
```

---

## 七、API 清单（一期）

### 产品
```
POST   /api/product/spu              创建SPU
PUT    /api/product/spu/:id          更新SPU
DELETE /api/product/spu/:id          删除SPU
GET    /api/product/spu/:id          SPU详情
GET    /api/product/spu/list         SPU列表（分页/筛选）
POST   /api/product/sku              创建SKU
PUT    /api/product/sku/:id          更新SKU
DELETE /api/product/sku/:id          删除SKU
GET    /api/product/category/tree    品类树
POST   /api/product/category         创建品类
```

### 资料
```
POST   /api/asset/upload             上传资料文件
POST   /api/asset                    创建资料记录
PUT    /api/asset/:id                更新资料
DELETE /api/asset/:id                删除资料
GET    /api/asset/list               资料列表（按SPU/类型筛选）
GET    /api/asset/download/:id       下载资料
```

### 运费
```
POST   /api/shipping/template        创建运费模板
PUT    /api/shipping/template/:id    更新运费模板
GET    /api/shipping/template/list   运费模板列表
POST   /api/shipping/rule            创建地区规则
PUT    /api/shipping/rule/:id        更新地区规则
POST   /api/shipping/calculate       计算运费（传SKU+数量+目的地）
GET    /api/shipping/carrier/list    物流商列表
```

### 渠道链接
```
POST   /api/channel-link             创建渠道链接
PUT    /api/channel-link/:id         更新
DELETE /api/channel-link/:id         删除
GET    /api/channel-link/list        按SPU查询
```

### 客户门户
```
POST   /api/portal/register          客户注册
POST   /api/portal/login             客户登录
GET    /api/portal/product/list      产品浏览（公开）
GET    /api/portal/product/:id       产品详情（公开）
POST   /api/portal/favorite          收藏/取消收藏
GET    /api/portal/favorite/list     收藏列表
POST   /api/portal/selection         创建选品清单
GET    /api/portal/selection/list    选品清单列表
POST   /api/portal/inquiry           提交询价
GET    /api/portal/inquiry/list      我的询价列表
GET    /api/portal/download/:id      下载资料（记录日志）
```

### 报价
```
POST   /api/quotation/generate       生成报价单
GET    /api/quotation/:id            报价单详情
GET    /api/quotation/list           报价单列表
PUT    /api/quotation/:id/send       发送报价
GET    /api/quotation/:id/track      报价追踪数据
```

### 话术
```
POST   /api/script                   创建话术
PUT    /api/script/:id               更新话术
GET    /api/script/list              话术列表（按场景/平台筛选）
```

### AI文案
```
POST   /api/ai/generate               统一生成入口（卖点/详情/话术/手卡/报价备注/改写）
GET    /api/ai/records/:id           AI生成记录详情
GET    /api/ai/records               AI生成记录列表
POST   /api/ai/records/:id/approve   审核通过
POST   /api/ai/records/:id/reject    审核驳回
POST   /api/ai/records/:id/adopt     采纳到业务内容
GET    /api/ai/prompt/list           Prompt模板列表
POST   /api/ai/prompt                创建Prompt模板
PUT    /api/ai/prompt/:id            更新Prompt模板
```

### 系统
```
POST   /api/auth/login               后台登录
GET    /api/auth/userinfo            当前用户信息
GET    /api/sys/role/list            角色列表
POST   /api/sys/user                 创建用户
PUT    /api/sys/user/:id             更新用户
GET    /api/sys/log/list             操作日志
GET    /api/sys/config               系统配置
PUT    /api/sys/config               更新配置
```

---

## 八、页面清单（art-design-pro 路由规划）

### B端后台

```
/dashboard                          工作台首页（数据概览）

/product/spu                        产品列表
/product/spu/create                 新建产品
/product/spu/:id/edit               编辑产品
/product/spu/:id/detail             产品详情（含SKU/资料/链接）
/product/category                   品类管理
/product/compare                    产品对比配置

/asset/list                         资料库
/asset/upload                       批量上传
/company/profile                    公司介绍编辑

/channel/links                      渠道链接管理
/channel/monitor                    链接状态监控

/shipping/template                  运费模板列表
/shipping/template/create           新建运费模板
/shipping/template/:id/edit         编辑运费模板
/shipping/carrier                   物流商管理
/shipping/warehouse                 发货仓管理

/customer/list                      客户列表
/customer/:id/detail                客户详情（含历史询价/报价）
/customer/inquiry                   询价管理

/sales/quotation                    报价单列表
/sales/quotation/create             生成报价单
/sales/quotation/:id                报价单详情/追踪
/sales/live-card                    直播手卡列表
/sales/live-card/create             生成手卡
/sales/ppt                          手卡PPT列表
/sales/ppt/create                   生成PPT
/sales/session                      场次管理

/script/list                        话术管理
/script/create                      新建话术

/ai/records                         AI生成记录
/ai/prompt                          Prompt模板管理
/ai/review                          AI结果审核

/template/list                      模板管理（报价/手卡/PPT）
/template/:id/edit                  模板编辑

/system/user                        用户管理
/system/role                        角色管理
/system/log                         操作日志
/system/config                      系统配置

/data/product-heat                  产品热度看板
/data/sales-performance             销售业绩看板
/data/asset-usage                   资料使用统计
/data/channel-analysis              渠道分析
```

### C端门户

```
/                                   首页（推荐产品/品类导航）
/products                           产品列表（筛选/搜索）
/products/:id                       产品详情
/compare                            产品对比
/account/login                      登录/注册
/account/profile                    个人中心
/account/favorites                  我的收藏
/account/selections                 我的选品清单
/account/inquiries                  我的询价
/about                              公司介绍
```
