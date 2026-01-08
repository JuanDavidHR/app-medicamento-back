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
exports.MedicationAdministrationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const medication_administration_entity_1 = require("../../../domain/entities/medication-administration.entity");
class MedicationAdministrationDto {
}
exports.MedicationAdministrationDto = MedicationAdministrationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicationAdministrationDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicationAdministrationDto.prototype, "treatmentPlanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedicationAdministrationDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: medication_administration_entity_1.AdministrationStatus }),
    __metadata("design:type", String)
], MedicationAdministrationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], MedicationAdministrationDto.prototype, "scheduledAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], MedicationAdministrationDto.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MedicationAdministrationDto.prototype, "version", void 0);
//# sourceMappingURL=medication-administration.dto.js.map