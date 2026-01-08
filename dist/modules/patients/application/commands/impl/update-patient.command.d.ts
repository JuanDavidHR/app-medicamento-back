import { UpdatePatientDto } from "../../../infrastructure/dtos/request/update-patient.dto";
export declare class UpdatePatientCommand {
    readonly id: string;
    readonly data: UpdatePatientDto;
    constructor(id: string, data: UpdatePatientDto);
}
