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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../../auth/infrastructure/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../auth/infrastructure/guards/roles.guard");
const roles_decorator_1 = require("../../../../auth/infrastructure/decorators/roles.decorator");
const user_role_enum_1 = require("../../../../users/domain/enums/user-role.enum");
const cqrs_1 = require("@nestjs/cqrs");
const create_patient_command_1 = require("../../../application/commands/impl/create-patient.command");
const get_dashboard_query_1 = require("../../../application/queries/impl/get-dashboard.query");
const swagger_1 = require("@nestjs/swagger");
const create_patient_dto_1 = require("../../../infrastructure/dtos/request/create-patient.dto");
const update_patient_dto_1 = require("../../../infrastructure/dtos/request/update-patient.dto");
const patient_search_query_dto_1 = require("../../../infrastructure/dtos/request/patient-search-query.dto");
const patient_dashboard_dto_1 = require("../../../infrastructure/dtos/response/patient-dashboard.dto");
const search_patients_query_1 = require("../../../application/queries/impl/search-patients.query");
const update_patient_command_1 = require("../../../application/commands/impl/update-patient.command");
let PatientsController = class PatientsController {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async create(dto) {
        const command = new create_patient_command_1.CreatePatientCommand(dto.name, dto.condition);
        return this.commandBus.execute(command);
    }
    async getDashboard() {
        return this.queryBus.execute(new get_dashboard_query_1.GetDashboardQuery());
    }
    async search(query) {
        return this.queryBus.execute(new search_patients_query_1.SearchPatientsQuery(query));
    }
    async update(id, dto) {
        return this.commandBus.execute(new update_patient_command_1.UpdatePatientCommand(id, dto));
    }
};
exports.PatientsController = PatientsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Create a new patient" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Patient created successfully" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("dashboard"),
    (0, swagger_1.ApiOperation)({ summary: "Get patients dashboard" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: patient_dashboard_dto_1.DashboardResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)("search"),
    (0, swagger_1.ApiOperation)({ summary: "Search patients" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patient_search_query_dto_1.PatientSearchQueryDto]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "search", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a patient" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_patient_dto_1.UpdatePatientDto]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "update", null);
exports.PatientsController = PatientsController = __decorate([
    (0, swagger_1.ApiTags)("Patients"),
    (0, common_1.Controller)("patients"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], PatientsController);
//# sourceMappingURL=patients.controller.js.map