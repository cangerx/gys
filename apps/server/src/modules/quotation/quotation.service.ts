import { Injectable } from '@nestjs/common'

@Injectable()
export class QuotationService {
  getMeta() {
    return {
      module: 'quotation',
      entities: ['Quotation', 'QuotationItem'],
    }
  }
}
