import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

export class SignInErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
 }
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

    // signInForm = new FormGroup({});
    hide = true;

    // userName = new FormControl('', [
    //    Validators.required,
    //    Validators.email
    //  ]);
 
    matcher = new SignInErrorStateMatcher();

  constructor(
    public authService: AuthService,
    private fb: FormBuilder
  ) { }

   signInForm = new FormGroup({
     userName: new FormControl('', [
      Validators.required,
      Validators.email]),
     userPassword: new FormControl('',  [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)]),
    });

  ngOnInit() { }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.warn(this.signInForm.value);
  }

}
