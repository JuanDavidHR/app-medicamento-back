export class UpdateMedicationCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly description?: string,
    public readonly dosage_form?: string,
    public readonly strength?: string,
    public readonly manufacturer?: string
  ) {}
}
