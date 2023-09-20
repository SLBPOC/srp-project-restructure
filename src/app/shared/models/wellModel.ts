import { Node } from "../services/models";

export interface WellModel {
    fieldName: string;
    batteryName: string;
    padName: string;
    id: number;
    wellName: string;
    wellStatus: string;
    location: string;
    spm: details;
    pumpFillage: details;
    wellState: string;
    pumpCardDiagnostics: string;
    motorCurrent: number;
    pumpDisplacement: number;
    currentCardArea: number;
    commStatus: string;
    controllerStatus: string;
    performanceStatus: string;
    inferredProduction: details;
    effectiveRunTime: details;
    cyclesToday: details;
    structuralLoad: details;
    minMaxLoad: detailsMinMax;
    gearboxLoad: details;
    rodStress: details;
    yesterdayCycle: number;
    battery: string;
    pad: string;
    field: string;
    createdBy: number;
    updatedBy: number;
    noOfAlerts: number;
    dateAndTime: any;
    inferredChartObj: Highcharts.Options;
    spmChartObj: Highcharts.Options;
    pumpFillageChartObj: Highcharts.Options;
    effectiveRunChartObj: Highcharts.Options;
    cycleChartObj: Highcharts.Options;
    structuralLoadChartObj: Highcharts.Options;
    minMaxLoadChartObj: Highcharts.Options;
    gearBoxLoadChartObj: Highcharts.Options;
    roadStressChartObj: Highcharts.Options;
    fieldId: number,
    batteryId: number,
    padId: number
}

export class details {
    value!: string;
    data!: any[];
}

export class detailsMinMax {
    value!: string;
    min!: any[];
    max!: any[];
}

export interface WellModelResult {
    data: Node[];
    success: boolean;
    totalCount: number;
    totalOptimalPumping: number;
    totalOverpumping: number;
    totalUnderpumping: number;
}