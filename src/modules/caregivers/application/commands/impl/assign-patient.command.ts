export class AssignPatientCommand {
  constructor(
    public readonly caregiverId: string,
    public readonly patientId: string
  ) {}
}
