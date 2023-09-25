import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { AuthorizationResponse } from '../../models/authorization-response';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit{

  public error: string | undefined;
  public errorMessage: string | undefined;
  public isWaiting: boolean = true;
  public get hasError(): boolean {
    return !!this.error;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      // read the code 
      console.log('==> generated code/ token', params);
      if(params['code']) {
        console.log('==> code found', params['code'])
        console.log('==> generating token');
        this.getGeneratedCode(params);
      } else {
        console.log('no code detected')
        this.error = 'Code missing. Please authorize. redirecting ...'
        setTimeout(() => {
          this.error = '';
          this.router.navigate(['/well-list']);
        }, 3000);
      }
    });
  }

  getGeneratedCode(params: any) {
    this.error = params['error'];

    if (!!this.error) {
      this.errorMessage = params['error_message'];
      this.authorizationService.removeState(params['state']);
      return;
    }

    const authorizationResponse: AuthorizationResponse = {
      code: params['code'],
      state: params['state'],
    };

    this.authorizationService
      .exchangeAuthorizationCode(authorizationResponse)
      .pipe()
      .subscribe((token) => {
        console.log('==> token', token);
        this.router.navigate(['/dashboard']);
      });
  }
}
