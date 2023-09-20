import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WellsService } from '../../services/wells.service';
import { WellInfoComponent } from './well-info.component';
import { ActivatedRoute, ParamMap } from '@angular/router'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { WellInfoImageDescriptionComponent } from '../well-info-image-description/well-info-image-description.component';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs/internal/observable/of';
import { MtxTooltipModule } from '@ng-matero/extensions/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';

fdescribe('WellInfoComponent', () => {
  let component: WellInfoComponent;
  let fixture: ComponentFixture<WellInfoComponent>;

  let service: WellsService
  let mockDataService: MockDataService;

  let data= {
    provide: ActivatedRoute,
    useValue: {
        snapshot: {
            paramMap: {
                get(): string {
                    return '123';
                },
            },
        },
    },
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellInfoComponent ,WellInfoImageDescriptionComponent],
      
      imports: [
        HttpClientTestingModule,
         HttpClientModule,
         MatCardModule,
         MatIconModule,
         MtxTooltipModule,
         MatTooltipModule,
         MatIconModule

      ],
      
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {         snapshot: {
            params: {
              "id":1234
                
            },
        },
            // Mock ActivatedRoute properties and methods here
          },
          
          
        },
        {provide: WellsService, useClass: MockDataService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockDataService = TestBed.inject(WellsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngoninit methos', () => {

    component.ngOnInit()
   
    
    expect(component.ngOnInit).toBeTruthy();
  });
  
});

class MockDataService extends WellsService {
  // Override the method that makes the HTTP request
  //  search ={pageno:5, pagesize:50}
  override getWellInfoById(abcd: any) {
    let adata: any= {
      "data":[
    {label: 'Current SPM ', value: '5.5 spm'},
    {label: 'Pump Fillage', value: '94.5'},
    {label: 'Well State', value: 'Pumping Normal State'},
    {label: 'Pump Card DiagnisStics ', value: 'Narmal'},
    {label: 'inferred prod', value: '278.0 bbls/day'},
      ],
      "totalCount": 1
    }
     
      
    
    return of(adata);
  }

  
}