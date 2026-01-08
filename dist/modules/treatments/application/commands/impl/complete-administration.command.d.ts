import { ICommand } from "@nestjs/cqrs";
export declare class CompleteAdministrationCommand implements ICommand {
    readonly administrationId: string;
    constructor(administrationId: string);
}
