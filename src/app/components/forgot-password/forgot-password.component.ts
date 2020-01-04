import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class ResetPswErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  passwordResetEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  

  matcher = new ResetPswErrorStateMatcher();

  constructor(
    public authService: AuthService,
    private fb: FormBuilder
  ) {
  }

  resetPswForm = new FormGroup({
  passwordResetEmailFormControl: new FormControl(''),
  });

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.passwordResetEmailFormControl.value);
  }

}
