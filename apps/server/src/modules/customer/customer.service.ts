import { Injectable } from '@nestjs/common'

@Injectable()
export class CustomerService {
  getMeta() {
    return {
      module: 'customer',
      entities: ['Customer', 'CustomerFavorite', 'Inquiry', 'InquiryItem'],
    }
  }
}
