import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.enableCors();

  const configSwagger = new DocumentBuilder()
    .setTitle("PlayChat API")
    .setDescription("Api for a realtime chatting application")
    .setVersion("0.1.0")
    .build();

  const documentation = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup("docs", app, documentation);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
