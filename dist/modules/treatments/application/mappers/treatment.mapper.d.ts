import { MedicationAdministration } from "../../domain/entities/medication-administration.entity";
import { MedicationAdministrationDto } from "../../infrastructure/dtos/response/medication-administration.dto";
export declare class TreatmentMapper {
    static toAdministrationDto(entity: MedicationAdministration): MedicationAdministrationDto;
}
