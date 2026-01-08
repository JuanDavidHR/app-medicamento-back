import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatePatientDto } from "../../../infrastructure/dtos/create-patient.dto";
import { DashboardResponseDto } from "../../../infrastructure/dtos/patient-dashboard.dto";
export declare class PatientsController {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    create(dto: CreatePatientDto): Promise<any>;
    getDashboard(): Promise<DashboardResponseDto>;
}
