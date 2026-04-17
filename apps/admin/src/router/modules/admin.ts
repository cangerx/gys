import type { RouteRecordRaw } from 'vue-router'

const placeholderComponent = () => import('@/views/PlaceholderPage.vue')

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      { path: '', redirect: '/dashboard' },
      {
        path: 'dashboard',
        component: placeholderComponent,
        props: { title: '工作台', desc: '展示经营概览、待办事项与 AI 使用概况。' },
      },
      {
        path: 'product/spu',
        component: placeholderComponent,
        props: { title: 'SPU 管理', desc: '维护食品商品主数据、详情资料与上下架状态。' },
      },
      {
        path: 'product/spu/create',
        component: placeholderComponent,
        props: { title: '新建 SPU', desc: '录入食品基础属性、配料表、营养信息与主图素材。' },
      },
      {
        path: 'product/category',
        component: placeholderComponent,
        props: { title: '分类管理', desc: '维护商品分类、品牌与标签体系。' },
      },
      {
        path: 'asset/list',
        component: placeholderComponent,
        props: { title: '素材库', desc: '管理主图、详情图、PDF、PPT 和视频素材。' },
      },
      {
        path: 'channel/links',
        component: placeholderComponent,
        props: { title: '渠道链接', desc: '沉淀淘宝、抖音、小红书、视频号等渠道链接。' },
      },
      {
        path: 'shipping/template',
        component: placeholderComponent,
        props: { title: '运费模板', desc: '维护地区运费与冷链/常温发货规则。' },
      },
      {
        path: 'customer/inquiry',
        component: placeholderComponent,
        props: { title: '询价管理', desc: '处理客户询价、选品需求和销售跟进。' },
      },
      {
        path: 'sales/quotation',
        component: placeholderComponent,
        props: { title: '报价管理', desc: '生成报价单、报价备注和导出文件。' },
      },
      {
        path: 'script/list',
        component: placeholderComponent,
        props: { title: '话术中心', desc: '沉淀客服话术、直播手卡与销售脚本。' },
      },
      {
        path: 'ai/records',
        component: placeholderComponent,
        props: { title: 'AI 记录', desc: '查看 AI 生成记录、审核状态和采用情况。' },
      },
      {
        path: 'ai/prompt',
        component: placeholderComponent,
        props: { title: 'Prompt 配置', desc: '维护 AI 模板与食品行业约束。' },
      },
      {
        path: 'ai/review',
        component: placeholderComponent,
        props: { title: 'AI 审核', desc: '审核卖点、详情文案、话术和多平台改写内容。' },
      },
    ],
  },
]
