export class CreateReminderCommand {
  constructor(
    public readonly patientId: string,
    public readonly scheduledAt: Date,
    public readonly scheduledTime: string,
    public readonly treatmentPlanId?: string,
    public readonly message?: string
  ) {}
}
