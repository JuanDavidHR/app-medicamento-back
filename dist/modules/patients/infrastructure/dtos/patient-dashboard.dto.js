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
exports.DashboardResponseDto = exports.PatientDashboardDto = exports.PatientSummaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PatientSummaryDto {
}
exports.PatientSummaryDto = PatientSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PatientSummaryDto.prototype, "completedCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "array", items: { type: "object" } }),
    __metadata("design:type", Array)
], PatientSummaryDto.prototype, "history", void 0);
class PatientDashboardDto {
}
exports.PatientDashboardDto = PatientDashboardDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PatientDashboardDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PatientDashboardDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PatientDashboardDto.prototype, "condition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PatientSummaryDto, required: false }),
    __metadata("design:type", PatientSummaryDto)
], PatientDashboardDto.prototype, "summary", void 0);
class DashboardResponseDto {
}
exports.DashboardResponseDto = DashboardResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DashboardResponseDto.prototype, "totalPatients", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PatientDashboardDto] }),
    __metadata("design:type", Array)
], DashboardResponseDto.prototype, "patients", void 0);
//# sourceMappingURL=patient-dashboard.dto.js.map