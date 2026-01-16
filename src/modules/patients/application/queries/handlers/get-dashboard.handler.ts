import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetDashboardQuery } from "../impl/get-dashboard.query";
import { PatientMapper } from "../../mappers/patient.mapper";
import { IPatientRepository } from "../../../domain/repositories/patient.repository.interface";

import { UserRole } from "../../../../users/domain/enums/user-role.enum";

@QueryHandler(GetDashboardQuery)
export class GetDashboardHandler implements IQueryHandler<GetDashboardQuery> {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository,
  ) {}

  async execute(query: GetDashboardQuery) {
    const { userId, role } = query;
    let patients = [];

    if (role === UserRole.ADMIN) {
      patients = await this.patientRepository.findAll();
    } else {
      patients = await this.patientRepository.findByCaregiverId(userId);
    }

    return {
      totalPatients: patients.length,
      patients: PatientMapper.toDashboardDtoList(patients),
    };
  }
}
