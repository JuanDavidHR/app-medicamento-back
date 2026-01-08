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
exports.SearchPatientsHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const search_patients_query_1 = require("../impl/search-patients.query");
const patient_repository_interface_1 = require("../../../domain/repositories/patient.repository.interface");
const patient_mapper_1 = require("../../mappers/patient.mapper");
let SearchPatientsHandler = class SearchPatientsHandler {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }
    async execute(query) {
        const { name, condition } = query.filters;
        const patients = await this.patientRepository.search(name, condition);
        return patient_mapper_1.PatientMapper.toDashboardDtoList(patients);
    }
};
exports.SearchPatientsHandler = SearchPatientsHandler;
exports.SearchPatientsHandler = SearchPatientsHandler = __decorate([
    (0, cqrs_1.QueryHandler)(search_patients_query_1.SearchPatientsQuery),
    __param(0, (0, common_1.Inject)(patient_repository_interface_1.IPatientRepository)),
    __metadata("design:paramtypes", [Object])
], SearchPatientsHandler);
//# sourceMappingURL=search-patients.handler.js.map