import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app/app.module';

function checkEnvironment(configService: ConfigService) {
  const requiredEnvVars = [
    'DATABASE_URL',
    'PORT',
    'ISSUER_BASE_URL',
    'AUDIENCE',
    'CLIENT_ORIGIN_URL',
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!configService.get<string>(envVar)) {
      throw Error(`Undefined environment variable: ${envVar}`);
    }
  });
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  checkEnvironment(configService);

  /* NOCACHE */
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });

  /* CORS */
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
    maxAge: 86400,
  });

  if (configService.get<string>('NODE_ENV') !== 'development') {
    app.use(
      helmet({
        hsts: { maxAge: 31536000 },
        frameguard: { action: 'deny' },
        contentSecurityPolicy: {
          directives: {
            'default-src': ["'self'"],
            'frame-ancestors': ["'none'"],
          },
        },
      }),
    );
  }

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
