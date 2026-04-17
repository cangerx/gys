import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { HealthModule } from './modules/health/health.module'
import { ProductModule } from './modules/product/product.module'
import { CustomerModule } from './modules/customer/customer.module'
import { QuotationModule } from './modules/quotation/quotation.module'
import { ShippingModule } from './modules/shipping/shipping.module'
import { AiModule } from './modules/ai/ai.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [PrismaModule, HealthModule, AuthModule, ProductModule, CustomerModule, QuotationModule, ShippingModule, AiModule],
})
export class AppModule {}
