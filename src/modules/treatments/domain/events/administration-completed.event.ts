export class AdministrationCompletedEvent {
  constructor(
    public readonly patientId: string,
    public readonly administrationId: string
  ) {}
}
