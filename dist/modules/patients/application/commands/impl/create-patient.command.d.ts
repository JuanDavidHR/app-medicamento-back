import { ICommand } from '@nestjs/cqrs';
export declare class CreatePatientCommand implements ICommand {
    readonly name: string;
    readonly condition?: string;
    constructor(name: string, condition?: string);
}
