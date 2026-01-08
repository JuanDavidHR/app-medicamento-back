import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetAllMedicationsQuery } from "../impl/get-all-medications.query";
import { IMedicationRepository } from "../../../domain/repositories/medication.repository.interface";

@QueryHandler(GetAllMedicationsQuery)
export class GetAllMedicationsHandler implements IQueryHandler<GetAllMedicationsQuery> {
  constructor(
    @Inject(IMedicationRepository)
    private readonly medicationRepository: IMedicationRepository
  ) {}

  async execute() {
    return this.medicationRepository.findAll();
  }
}
