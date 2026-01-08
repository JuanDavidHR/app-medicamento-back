import { CommandBus } from "@nestjs/cqrs";
export declare class TreatmentsController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    complete(id: string): Promise<any>;
}
