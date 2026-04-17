import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductService {
  getMeta() {
    return {
      module: 'product',
      entities: ['ProductCategory', 'ProductSpu', 'ProductSku', 'Asset', 'ProductChannelLink'],
    }
  }
}
