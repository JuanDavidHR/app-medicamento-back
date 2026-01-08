import { UpdatePatientDto } from "../../../infrastructure/dtos/request/update-patient.dto";

export class UpdatePatientCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdatePatientDto
  ) {}
}
