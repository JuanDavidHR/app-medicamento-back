"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const patients_module_1 = require("./modules/patients/patients.module");
const treatments_module_1 = require("./modules/treatments/treatments.module");
const patient_entity_1 = require("./modules/patients/domain/entities/patient.entity");
const treatment_plan_entity_1 = require("./modules/treatments/domain/entities/treatment-plan.entity");
const medication_administration_entity_1 = require("./modules/treatments/domain/entities/medication-administration.entity");
const domain_event_entity_1 = require("./common/persistence/domain-event.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: "postgres",
                    host: configService.get("DB_HOST") || "localhost",
                    port: configService.get("DB_PORT") || 5432,
                    username: configService.get("DB_USER") || "postgres",
                    password: configService.get("DB_PASSWORD") || "postgres",
                    database: configService.get("DB_NAME") || "caregiver_db",
                    entities: [
                        patient_entity_1.Patient,
                        treatment_plan_entity_1.TreatmentPlan,
                        medication_administration_entity_1.MedicationAdministration,
                        domain_event_entity_1.DomainEventEntity,
                    ],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            patients_module_1.PatientsModule,
            treatments_module_1.TreatmentsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map