export class CreateTreatmentPlanCommand {
  constructor(
    public readonly patientId: string,
    public readonly medication: string,
    public readonly dosage: string,
    public readonly frequency: string,
    public readonly scheduleTimes?: string[],
    public readonly startDate?: Date,
    public readonly endDate?: Date,
    public readonly notes?: string
  ) {}
}
