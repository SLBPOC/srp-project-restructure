export class DynaCardModel {
    SurfaceCard: any;
    SurfaceCardTime: any;
    SurfaceCardPosition: any;
    SurfaceCardLoad: any;
    DownholeCardPosition: any;
    DownholeCardLoad: any;
    DownholeCard: any;
    DownholeCardTime: any;
}


export class DynacardModel2 {
    id!: number;
    surface_Card!: string;
    surface_Card_Time!: string;
    surface_Card_Position!: number;
    surface_Card_Load!: number;
    downhole_Card_Position!: number;
    downhole_Card_Load!: number;
    downhole_Card!: string;
    downhole_Card_Time!: string;
    dynacard_Classification!: string;
    secondary_Classification!: string;
    confidence!: string
}

export class CardDetailsModel {
    id!: string;
    pumpFillage_per!: number;
    SPM!: number;
    minPolishedRodLoad_lbs!: number;
    peakPolishedRodLoad_lbs!: number;
    surfaceStrokeLength_in!: number;
    downholeStrokeLength_in!: number;
    totalFluid_in!: number
  frame: any;
}

export interface Classification {
    name: string;
    count: number;
}

export interface DateRangeBubbleChart {
    from: string;
    to: string;
    classfications: Classification[];
}

export interface BubbleChartInfo {
    cards: DateRangeBubbleChart[];
    classfication: Classification[];
}

export interface FramesDynameter {
    classfication: string,
    frame: Date
}

export interface ClassficationInfo {
    id: number,
    type: string,
    value: number,
    symbolClass: string
}