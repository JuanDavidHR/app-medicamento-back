export class CreateMedicationCommand {
  constructor(
    public readonly name: string,
    public readonly description?: string,
    public readonly dosage_form?: string,
    public readonly strength?: string,
    public readonly manufacturer?: string
  ) {}
}
