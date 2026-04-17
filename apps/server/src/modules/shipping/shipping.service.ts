import { Injectable } from '@nestjs/common'

@Injectable()
export class ShippingService {
  getMeta() {
    return {
      module: 'shipping',
      entities: ['ShippingTemplate', 'ShippingRule'],
    }
  }
}
