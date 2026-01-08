"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentsController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const complete_administration_command_1 = require("../../../application/commands/impl/complete-administration.command");
const swagger_1 = require("@nestjs/swagger");
let TreatmentsController = class TreatmentsController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async complete(id) {
        return this.commandBus.execute(new complete_administration_command_1.CompleteAdministrationCommand(id));
    }
};
exports.TreatmentsController = TreatmentsController;
__decorate([
    (0, common_1.Post)("administration/:id/complete"),
    (0, swagger_1.ApiOperation)({ summary: "Complete a medication administration" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TreatmentsController.prototype, "complete", null);
exports.TreatmentsController = TreatmentsController = __decorate([
    (0, swagger_1.ApiTags)("Treatments"),
    (0, common_1.Controller)("treatments"),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], TreatmentsController);
//# sourceMappingURL=treatments.controller.js.map