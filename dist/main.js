"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const redoc_express_1 = __importDefault(require("redoc-express"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Caregiver App API")
        .setDescription("API for managing patient treatments and medication administrations")
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/docs", app, document);
    app.use("/docs", (0, redoc_express_1.default)({
        title: "Caregiver API Documentation",
        specUrl: "/api/docs-json",
    }));
    app.getHttpAdapter().get("/api/docs-json", (req, res) => {
        res.json(document);
    });
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Redoc documentation available at: ${await app.getUrl()}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map