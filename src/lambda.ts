import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let configuredProxy: any;
async function bootstrap(...args) {
  if (configuredProxy) {
    return configuredProxy(...args);
  }
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  await app.init();
  configuredProxy = serverlessExpress({
    app: expressApp,
  });
  return configuredProxy(...args);
}

export const handler = bootstrap;
