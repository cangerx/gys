export type AppModuleKey = 'auth' | 'product' | 'asset' | 'quotation' | 'shipping' | 'customer' | 'ai'

export const appModules: Record<AppModuleKey, string> = {
  auth: '认证与权限',
  product: '商品资料',
  asset: '素材中心',
  quotation: '报价管理',
  shipping: '运费模板',
  customer: '客户与询价',
  ai: 'AI 文案辅助',
}

export function buildAppInfo(database: 'connected' | 'disconnected') {
  return {
    name: 'qiye-server',
    status: 'bootstrapped',
    database,
    modules: appModules,
  }
}
