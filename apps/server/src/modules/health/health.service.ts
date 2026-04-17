import { Injectable } from '@nestjs/common'
import { buildAppInfo } from '../../app'
import { PrismaService } from '../../common/prisma'

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async getHealth() {
    const database = await this.prisma.$queryRaw`SELECT 1`
      .then(() => 'connected' as const)
      .catch(() => 'disconnected' as const)

    return buildAppInfo(database)
  }
}
