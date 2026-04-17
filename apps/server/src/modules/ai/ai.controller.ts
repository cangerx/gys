import { Controller, Get } from '@nestjs/common'
import { AiService } from './ai.service'

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('meta')
  getMeta() {
    return this.aiService.getMeta()
  }
}
