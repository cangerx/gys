import { Injectable } from '@nestjs/common'

@Injectable()
export class AiService {
  getMeta() {
    return {
      module: 'ai',
      entities: ['AiPromptTemplate', 'AiGenerationRecord', 'AiSensitiveRule'],
      bizTypes: ['selling_points', 'detail_copy', 'customer_script', 'live_card', 'quotation_note', 'platform_rewrite'],
    }
  }
}
