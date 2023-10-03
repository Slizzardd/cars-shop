import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {

  constructor(private dialogRef: MatDialogRef<AuthorizationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  public registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      this.emailValidator
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      this.phoneNumberValidator
    ]),
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  });
  public error: string = '';

  public registration: boolean = true;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      this.emailValidator
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  });


  // REGISTRATION
  public onSubmitReg() {
    if (this.registrationForm.valid) {
      this.data = {
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        phoneNumber: this.registrationForm.value.phoneNumber,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password1,
        registration: this.registration
      };

      this.dialogRef.close(this.data)
    } else {
      this.error = "Check all the input fields!";

      const emailControl = this.registrationForm.get('email');
      const phoneNumberControl = this.registrationForm.get('phoneNumber');

      if (emailControl && emailControl.hasError('invalidEmail')) {
        this.error = "Invalid email format!";
      }
      if (phoneNumberControl && phoneNumberControl.hasError('invalidPhoneNumber')) {
        this.error = "Invalid phone number format!";
      }
      if (!this.passwordMatch()) {
        this.error = "Passwords do not match!";
      }
    }
  }

  // LOGIN
  public onSubmitLogin() {
    if (this.loginForm.valid) {
      this.data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        registration: this.registration
      };

      this.dialogRef.close(this.data)
    } else {
      this.error = "Check all the input fields!";

      const emailControl = this.registrationForm.get('email');

      if (emailControl && emailControl.hasError('invalidEmail')) {
        this.error = "Invalid email format!";
      }
    }
  }


  private emailValidator(control: FormControl): { [key: string]: any } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(control.value) ? null : {invalidEmail: true};
  }

  private phoneNumberValidator(control: FormControl): { [key: string]: any } | null {
    const phonePattern = /^\+\d{1,4}\d{3,}$/;
    return phonePattern.test(control.value) ? null : {invalidPhoneNumber: true};
  }

  private passwordMatch(): boolean {
    return this.registrationForm.value.password1 === this.registrationForm.value.password2;
  }

  public goToLogin() {
    this.registration = !this.registration;
    this.error = '';
    this.dialogRef.updateSize("500px", "400px")
  }

  public goToRegistration() {
    this.registration = !this.registration;
    this.error = '';
    this.dialogRef.updateSize("500px", "620px")
  }

  public close() {
    this.dialogRef.close(null);
  }
}
