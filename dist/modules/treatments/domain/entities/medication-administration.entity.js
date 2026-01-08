"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationAdministration = exports.AdministrationStatus = void 0;
const typeorm_1 = require("typeorm");
const treatment_plan_entity_1 = require("./treatment-plan.entity");
var AdministrationStatus;
(function (AdministrationStatus) {
    AdministrationStatus["PENDING"] = "PENDING";
    AdministrationStatus["COMPLETED"] = "COMPLETED";
    AdministrationStatus["SKIPPED"] = "SKIPPED";
})(AdministrationStatus || (exports.AdministrationStatus = AdministrationStatus = {}));
let MedicationAdministration = class MedicationAdministration {
};
exports.MedicationAdministration = MedicationAdministration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MedicationAdministration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicationAdministration.prototype, "treatment_plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicationAdministration.prototype, "patient_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AdministrationStatus,
        default: AdministrationStatus.PENDING,
    }),
    __metadata("design:type", String)
], MedicationAdministration.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], MedicationAdministration.prototype, "scheduled_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], MedicationAdministration.prototype, "completed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], MedicationAdministration.prototype, "aggregate_version", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => treatment_plan_entity_1.TreatmentPlan),
    (0, typeorm_1.JoinColumn)({ name: 'treatment_plan_id' }),
    __metadata("design:type", treatment_plan_entity_1.TreatmentPlan)
], MedicationAdministration.prototype, "treatmentPlan", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MedicationAdministration.prototype, "created_at", void 0);
exports.MedicationAdministration = MedicationAdministration = __decorate([
    (0, typeorm_1.Entity)('medication_administrations')
], MedicationAdministration);
//# sourceMappingURL=medication-administration.entity.js.map