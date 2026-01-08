import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import redoc from "redoc-express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Caregiver App API")
    .setDescription(
      "API for managing patient treatments and medication administrations"
    )
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  // Redoc setup
  app.use(
    "/docs",
    redoc({
      title: "Caregiver API Documentation",
      specUrl: "/api/docs-json",
    })
  );

  // Serve swagger json for redoc
  app.getHttpAdapter().get("/api/docs-json", (req, res) => {
    res.json(document);
  });

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Redoc documentation available at: ${await app.getUrl()}/docs`);
}
bootstrap();
