import { generateOpenApi } from "@ts-rest/open-api";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { initContract } from "@ts-rest/core";
import { usersContract } from "./contracts/users";

const c = initContract();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const apiContract = c.router({
    users: usersContract,
  });

  const openApiDocument = generateOpenApi(apiContract, {
    info: {
      title: "Playchat API",
      version: "0.1.0",
    },
  });

  SwaggerModule.setup("docs", app, openApiDocument);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
