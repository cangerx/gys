import { Controller, Get } from '@nestjs/common'
import { QuotationService } from './quotation.service'

@Controller('quotations')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Get('meta')
  getMeta() {
    return this.quotationService.getMeta()
  }
}
