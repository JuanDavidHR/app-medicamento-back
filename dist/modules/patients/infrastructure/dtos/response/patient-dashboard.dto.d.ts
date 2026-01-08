export declare class PatientSummaryDto {
    readonly completedCount: number;
    readonly history: any[];
}
export declare class PatientDashboardDto {
    readonly id: string;
    readonly name: string;
    readonly condition?: string;
    readonly summary?: PatientSummaryDto;
}
export declare class DashboardResponseDto {
    readonly totalPatients: number;
    readonly patients: PatientDashboardDto[];
}
