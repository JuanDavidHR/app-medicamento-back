"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentsModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const treatment_plan_entity_1 = require("./domain/entities/treatment-plan.entity");
const medication_administration_entity_1 = require("./domain/entities/medication-administration.entity");
const complete_administration_handler_1 = require("./application/commands/handlers/complete-administration.handler");
const treatments_controller_1 = require("./interfaces/http/controller/treatments.controller");
const domain_event_entity_1 = require("../../common/persistence/domain-event.entity");
const event_store_service_1 = require("../../common/services/event-store.service");
const medication_repository_interface_1 = require("./domain/repositories/medication.repository.interface");
const medication_repository_1 = require("./infrastructure/repositories/medication.repository");
const CommandHandlers = [complete_administration_handler_1.CompleteAdministrationHandler];
let TreatmentsModule = class TreatmentsModule {
};
exports.TreatmentsModule = TreatmentsModule;
exports.TreatmentsModule = TreatmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            typeorm_1.TypeOrmModule.forFeature([
                treatment_plan_entity_1.TreatmentPlan,
                medication_administration_entity_1.MedicationAdministration,
                domain_event_entity_1.DomainEventEntity,
            ]),
        ],
        controllers: [treatments_controller_1.TreatmentsController],
        providers: [
            ...CommandHandlers,
            event_store_service_1.EventStoreService,
            {
                provide: medication_repository_interface_1.IMedicationRepository,
                useClass: medication_repository_1.MedicationRepository,
            },
        ],
    })
], TreatmentsModule);
//# sourceMappingURL=treatments.module.js.map