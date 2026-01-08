import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatePatientDto } from "../../../infrastructure/dtos/request/create-patient.dto";
import { UpdatePatientDto } from "../../../infrastructure/dtos/request/update-patient.dto";
import { PatientSearchQueryDto } from "../../../infrastructure/dtos/request/patient-search-query.dto";
import { DashboardResponseDto } from "../../../infrastructure/dtos/response/patient-dashboard.dto";
export declare class PatientsController {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    create(dto: CreatePatientDto): Promise<any>;
    getDashboard(): Promise<DashboardResponseDto>;
    search(query: PatientSearchQueryDto): Promise<any>;
    update(id: string, dto: UpdatePatientDto): Promise<any>;
}
