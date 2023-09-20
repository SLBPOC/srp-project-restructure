// export class customAlert {
//     dataList: customAlertModel;
//     totalCount : CountDetails;
// }

export class customAlert {
    id!:number;
    wellName!:string;
    customAlertName!:string;
    notificationType!:string;
    priority!:string;
    category!:string;
    operator!:string;
    value!:string;
    actualValue!:number;
    isActive!:boolean;
    startDate!:string;
    endDate!:string;
    customAlertDto:any;
}

// export class CountDetails
// {
//     totalCount :number;
// }