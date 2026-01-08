import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { GetMedicationByIdQuery } from "../impl/get-medication-by-id.query";
import { IMedicationRepository } from "../../../domain/repositories/medication.repository.interface";
import { Medication } from "../../../domain/entities/medication.entity";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";

@QueryHandler(GetMedicationByIdQuery)
export class GetMedicationByIdHandler implements IQueryHandler<GetMedicationByIdQuery> {
  constructor(
    @Inject(IMedicationRepository)
    private readonly medicationRepository: IMedicationRepository
  ) {}

  async execute(query: GetMedicationByIdQuery): Promise<Medication> {
    const medication = await this.medicationRepository.findById(query.id);
    if (!medication) {
      throw new CustomHttpException(
        "Medication not found",
        "ERR_MEDICATION_NOT_FOUND",
        HttpStatus.NOT_FOUND
      );
    }
    return medication;
  }
}
