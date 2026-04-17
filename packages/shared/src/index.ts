export const USER_ROLES = ['super_admin', 'operator', 'sales', 'service', 'customer'] as const
export type UserRole = (typeof USER_ROLES)[number]

export const PRODUCT_STATUS = ['on_sale', 'pre_sale', 'discontinued', 'clearance'] as const
export type ProductStatus = (typeof PRODUCT_STATUS)[number]

export const STORAGE_CONDITIONS = ['room_temperature', 'refrigerated', 'frozen'] as const
export type StorageCondition = (typeof STORAGE_CONDITIONS)[number]

export const AI_BIZ_TYPES = [
  'selling_points',
  'detail_copy',
  'customer_script',
  'live_card',
  'quotation_note',
  'platform_rewrite',
] as const
export type AiBizType = (typeof AI_BIZ_TYPES)[number]

export const CONTENT_PLATFORMS = ['common', 'taobao', 'douyin', 'xiaohongshu'] as const
export type ContentPlatform = (typeof CONTENT_PLATFORMS)[number]
