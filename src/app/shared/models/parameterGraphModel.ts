export class ParameterGraphModel{
    
    date!:Date ;
    value!:number;
    well!:string;

    constructor()
    {        
        this.date=new Date();
        this.value=0;
        this.well="";
    }
}


export class ParaModel{
    Id !:number;
    wellId !:number;
    strPM !:number;
    pumpFillage !:number;
    pumpCardDiagnostics !:number;
    motorCurrent !:number;
    pumpDisplacement !:string;
    currentCardArea !:number;
    inferredProduction !:number;
    effectiveRuntime!:number;
    cycleToday !:number;
    structuralLoad !:number;
    minMaxLoad !:number;
    gearBoxLoad !:number;
    rodStress !:number;
    yesterdayCycle !:number;
    createdBy !:number;
    updatedBy !:number;
    createdDateTime !: any;
    updatedDateTime !:any;
    wellName !: string; 
}

export class TelemetryModel{   
    dateAndTime !:any;    
    inferredProduction !:number;
    vfdSpeed!:number;
    optimizerPI!:number;
}
export class TelemetryBarChartModel{   
    dateAndTime !:any;    
    fluidpound !:number;
    gasinterference !:number;
    tagging !:number;
    flatlining !:number;
}




