import { Component, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
// import { customAlert } from 'src/app/modules/feature/model/customAlert';
// import { CustomAlertService } from 'src/app/modules/feature/services/customAlert.service';
import { ThemePalette } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MatSort } from '@angular/material/sort';
import { customAlert } from 'src/app/shared/models/customAlert';
import { CustomAlertService } from 'src/app/shared/services/customAlert.service';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent {
  @ViewChild(MatPaginator) Paginator!: MatPaginator;
  @Input() SelectedRangeValue!: DateRange<Date>;
  @Output() SelectedRangeValueChange = new EventEmitter<DateRange<Date>>();


  // public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  //     public dateControlMinMax = new FormControl(new Date());
      CustomAlertForm = this.fb.group({
        CustomAlertId:[],
      CustomAlertName: ['', [Validators.required]],
      WellName: ['', [Validators.required]],
      NotificationType: ['', [Validators.required]],
      Priority: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Operator: ['', [Validators.required]],
      Value: ['', [Validators.required]],
      ActualValue: ['', [Validators.required]],
      IsActive: ['', [Validators.required]],
      DateRange: ['', [Validators.required]]       
    });

  //CustomTime: any;
  CustomDate = new Date();
  public Disabled = false;
  public ShowSpinners = true;
  public ShowSeconds = true;
  //public TouchUi = false;
  public EnableMeridian = false; 
  public StepHour = 1;
  public StepMinute = 1;
  public StepSecond = 1;
  public Color: ThemePalette = 'primary';
  StartDate:any;
  EndDate:any;
 // DisableSelect:any;
  //Selected!: Date;
  IsNumeric:boolean = false;
  SelectionModel!:any;
  ActualValue!:any;
  AlertId!:any;
  Submitted = false;
  DateFlag=false;
  ValueFlag=false;
  IsUpdateCondition = false;  
  AlertData!: customAlert[];
  // Grid column variables
  // AlertData!: CustomAlertComponent[];
    public DisplayedColumns = ['CustomAlertName', 'WellName', 'IsActive'];
    DataSource:any;

  // Filter variable
  well!:any[];
  notification:any;
  priority:any;
  category:any;
  operator:any;
  value:any;
  IsActiveValue:boolean=true;
 
  //Pagination variables
  maxPageSize: number = Math.max(...environment.pageSizeOption);
  pageSizeOption:any;
  pageSize: number = 10;
  pageNumber = 1;
  currentPage = 0;
  totalCount = 0;
  model: any = {}   
  sortDirection: string = "";
  sortColumn: string = "";  
  @ViewChild(MatSort) sort!: MatSort; 

  constructor(private fb: FormBuilder,private CustomAlertService:CustomAlertService ,private dialogRef: MatDialogRef<CustomAlertComponent>) {
     this.notification=environment.customAlertNotification;
     this.priority=environment.customAlertPriority;
     this.category=environment.customAlertCategory;
     this.operator=environment.customAlertOperator;
     this.value=environment.customAlertValue;
  }

 
  ngOnInit() {
      this.getAlertDetails();
  }
      

  selectedChange(m: any) {
      if (!this.SelectedRangeValue?.start || this.SelectedRangeValue?.end) {
        this.SelectedRangeValue = new DateRange<Date>(m, null);
      } else {
        const start = this.SelectedRangeValue.start;
        const end = m;
        if (end < start) {
          this.SelectedRangeValue = new DateRange<Date>(end, start);
        } else {
          this.SelectedRangeValue = new DateRange<Date>(start, end);
        }
      }
      this.SelectedRangeValueChange.emit(this.SelectedRangeValue);
      this.DateFlag = false;
  }

    //Create Model for search
  createModel(this: any) {
    this.model.pageSize = this.pageSize;
    this.model.pageNumber = this.pageNumber;
    this.model.sortColumn = this.sortColumn ? this.sortColumn : "";
    this.model.sortDirection = this.sortDirection ? this.sortDirection : "";
    return this.model;
  }

  getAlertDetails(){
    this.Submitted = false;
    var SearchModel = this.createModel();
      this.CustomAlertService.displayDetails(SearchModel)
        .subscribe((response: any)=>{          
          this.AlertData = response.customAlertDto;
          this.well=response.wellFilterListDetails;
          this.totalCount=response.countDetails.totalCount;
         
          this.DataSource = new MatTableDataSource<customAlert>(this.AlertData);
          this.DataSource.sort = this.sort;
          
        setTimeout(() => {
          this.loadPageOptions();    
          this.Paginator.pageIndex = this.currentPage;
          this.Paginator.length = response.countDetails.totalCount;          
        }); 
      })
    }

    public loadPageOptions()
    {
      this.pageSizeOption=[10,20,30];
      if(!this.pageSizeOption.includes(this.totalCount))
          {
            if(this.totalCount>this.maxPageSize)
            {
              this.pageSizeOption.push(this.totalCount);
            }
          }
    }
    public onSortChanged(e: any) {
      this.pageNumber = this.pageNumber;
      this.pageSize = this.pageSize;
      this.sortDirection = this.sort.direction;
      this.sortColumn = (typeof this.sort.active !== "undefined") ? this.sort.active : "";
      this.getAlertDetails();
    }

    pageChanged(event: PageEvent) {      
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.pageNumber = event.pageIndex + 1;
      this.getAlertDetails();
    }

    getSelectedMonth(month: any){
      let m = month + 1;
      return m.toString().padStart(2,'0');
    }
  
    getSelectedDay(day: any){
      return day.toString().padStart(2,'0');
    }
  
    applyDateRangeFilter() {
      let fromDate = this.SelectedRangeValue.start;
      let toDate = this.SelectedRangeValue.end;
      this.StartDate = fromDate?.getFullYear() + '-' + this.getSelectedMonth(fromDate?.getMonth()) + '-' + this.getSelectedDay(fromDate?.getDate());
      this.EndDate = toDate?.getFullYear() + '-' + this.getSelectedMonth(toDate?.getMonth()) + '-' + this.getSelectedDay(toDate?.getDate()); 
    }

    onChange()
    {
      if(this.SelectionModel == this.value[0])
      {
        this.IsNumeric = true;
        this.ValueFlag = false;
      }
      else
      {
      this.IsNumeric = false;
      this.ValueFlag = true;
      }
    }

    CustomDateTime()
    {
      let timeZone = this.CustomDate.toISOString().slice(-4);
      let time = this.CustomDate.toTimeString().slice(0,8);
      let CustomTime = "T" + time + "." + timeZone;
      this.applyDateRangeFilter();
      this.StartDate = this.StartDate +  CustomTime;      
      this.EndDate = this.EndDate +  CustomTime;
    }

    onSubmit(){
      if(this.CustomAlertForm.value!=null)
      {        
        this.Submitted = true;
        this.DateFlag = true;
        if(this.IsNumeric == true)
        {
          if(this.CustomAlertForm.value.ActualValue=="" || this.CustomAlertForm.value.ActualValue==undefined)
            {
              this.ValueFlag = false;
            }
            else
            {
              this.ValueFlag = true;
            }
        }
        // else{
        //   this.flag1 = false;
        // }
      let obj:any;
      this.CustomDateTime();
      obj = { 
        wellName:this.CustomAlertForm.value.WellName,
        customAlertName:this.CustomAlertForm.value.CustomAlertName,     
        notificationType:this.CustomAlertForm.value.NotificationType,
        priority:this.CustomAlertForm.value.Priority,
        category:this.CustomAlertForm.value.Category,
        operator:this.CustomAlertForm.value.Operator,
        value:this.CustomAlertForm.value.Value,
        isActive:this.CustomAlertForm.value.IsActive,
        actualValue:this.CustomAlertForm.value.ActualValue=="" ? null : this.CustomAlertForm.value.ActualValue,
        startDate:this.StartDate,
        endDate:this.EndDate
      }
      if(this.ValueFlag == true)
      {
        this.CustomAlertService.addCustomAlert(obj).subscribe((res: any)=>{ 
        if(res!=null)
        {
          alert("Records added successfully");
        }     
          this.getAlertDetails();     
          this.clear();
          this.IsNumeric = false;
          this.DateFlag = false;
          this.ValueFlag = false;
        });
      }
    }
    this.DateFlag=false;
    this.ValueFlag = true;
    }

    EditAlert(alertId:number)
    {
      this.CloneAlert(alertId);
      this.IsUpdateCondition = true;
    }

    UpdateAlert()
    {
      let obj:any;
      this.CustomDateTime();
      var actual=null;
      if(this.CustomAlertForm.value.Value=="Any numerical value")
      {
        actual=this.CustomAlertForm.value.ActualValue== ""? null : this.CustomAlertForm.value.ActualValue;
        
      }
      obj = { 
        id:this.AlertId,
        wellName:this.CustomAlertForm.value.WellName,
        customAlertName:this.CustomAlertForm.value.CustomAlertName,     
        notificationType:this.CustomAlertForm.value.NotificationType,
        priority:this.CustomAlertForm.value.Priority,
        category:this.CustomAlertForm.value.Category,
        operator:this.CustomAlertForm.value.Operator,
        value:this.CustomAlertForm.value.Value,
        isActive:this.CustomAlertForm.value.IsActive,
        actualValue:actual,//this.CustomAlertForm.value.ActualValue== ? null : this.CustomAlertForm.value.ActualValue,
        startDate:this.StartDate,
        endDate:this.EndDate
      }
      this.CustomAlertService.EditCustomAlert(obj).subscribe((res: any)=>{ 
        if(res!=null)
        {
          alert("Records Updated successfully");
        }     
          this.getAlertDetails();     
          this.clear();
          this.IsUpdateCondition = false;
        });
    }

    CloneAlert(Id:number)
    {      
      this.IsUpdateCondition=false;
      var GetRecord=this.AlertData.filter(a=> a.id==Id)
      if(GetRecord != null)
      {
        this.AlertId = GetRecord[0].id;
        this.IsActiveValue=GetRecord[0].isActive;
        this.CustomAlertForm.controls.CustomAlertName.setValue(GetRecord[0].customAlertName);
        this.CustomAlertForm.controls.WellName.setValue(GetRecord[0].wellName);
        this.CustomAlertForm.controls.NotificationType.setValue(GetRecord[0].notificationType);
        this.CustomAlertForm.controls.NotificationType.setValue(GetRecord[0].notificationType);        
        this.CustomAlertForm.controls.Priority.setValue(GetRecord[0].priority);
        this.CustomAlertForm.controls.Category.setValue(GetRecord[0].category);
        this.CustomAlertForm.controls.Operator.setValue(GetRecord[0].operator);
        this.CustomAlertForm.controls.Value.setValue(GetRecord[0].value);
        this.ActualValue=GetRecord[0].actualValue;
        
        if(this.ActualValue!=null)
        {
          this.IsNumeric=true;
        }
        else
        {
          this.IsNumeric=false;
        }
        let startDate = GetRecord[0].startDate;
        let sDate = startDate.slice(0,10);
        let endDate = GetRecord[0].endDate;
        let eDate =  endDate.slice(0,10);
        this.SelectedRangeValue = new DateRange<Date>(new Date(sDate), new Date(eDate));       
      }
    }

    deleteAlert(id:number)
    {
      if(confirm('Are you sure to delete record?'))
      this.CustomAlertService.deleteCustomAlert(id).subscribe((res: any)=>{
        alert('Record deleted successfully');
        this.getAlertDetails();
      })
    }

    toggle(id:number,event:any){
      let val=event.checked;
      this.CustomAlertService.isActiveCustomAlert(id,val).subscribe((res: any)=>{    
        this.getAlertDetails();    
      })
    }

    clear()
    {
      this.Submitted = false;
      this.DateFlag = false;
      this.IsNumeric = false;
      this.CustomAlertForm.get('CustomAlertName')?.reset();
      this.CustomAlertForm.get('WellName')?.reset();
      this.CustomAlertForm.get('NotificationType')?.reset();
      this.CustomAlertForm.get('Priority')?.reset();
      this.CustomAlertForm.get('Category')?.reset();
      this.CustomAlertForm.get('Operator')?.reset();
      this.CustomAlertForm.get('Value')?.reset();
      this.CustomAlertForm.get('ActualValue')?.reset();
      this.SelectedRangeValue = new DateRange<Date>(null, null);
    }

    cancel()
    {
      this.clear();
    }

    close(){
      this.dialogRef.close();
    }

}