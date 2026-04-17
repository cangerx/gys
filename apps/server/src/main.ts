import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const port = Number(process.env.SERVER_PORT ?? 3000)
  await app.listen(port)

  console.log(`qiye-server listening on http://127.0.0.1:${port}`)
}

void bootstrap()
