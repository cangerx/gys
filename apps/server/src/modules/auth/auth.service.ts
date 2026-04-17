import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  getMeta() {
    return {
      module: 'auth',
      status: 'ready',
      notes: ['JWT and RBAC will be added next'],
    }
  }
}
