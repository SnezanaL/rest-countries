import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  //signUpForm = new FormGroup({});
  hide = true;

   emailFormControl = new FormControl('', [
     Validators.required,
     Validators.email,
   ]);

  matcher = new MyErrorStateMatcher();


  constructor(
    public authService: AuthService,
    private fb: FormBuilder
  ) {
 
   }

    signUpForm = new FormGroup({
     emailFormControl: new FormControl(''),
     password: new FormControl(''),
    });


  ngOnInit() { 

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.signUpForm.value);
  }

}
