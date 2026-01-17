export class GetRemindersByPatientQuery {
  constructor(
    public readonly patientId: string,
    public readonly date?: string,
  ) {}
}
