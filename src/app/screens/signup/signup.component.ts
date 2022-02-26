import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginSignupService} from '../../services/login-signup.service';
import {Router} from '@angular/router';

interface Error {
    created: boolean;
    message: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    shown = false;
    signupFormControl !: FormGroup;
    selected = false;

    constructor(private loginSignUpService: LoginSignupService, private router: Router){}

    ngOnInit(): void {
        this.signupFormControl = new FormGroup({
        name: new FormControl('', [Validators.required]),
        familyName: new FormControl('', [Validators.required]),
        telephone: new FormControl('', [Validators.required]),
        loginNumber: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        email: new FormControl('', [Validators.email]),
        governorate: new FormControl('', [Validators.required]),
        delegation: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required]),
    });
    }

    showOrHidePassword(): void {
        this.shown = !this.shown;
    }
    submit(event: any): void{
        event.preventDefault();
        this.loginSignUpService.signup({
            name: this.signupFormControl.value.name,
            familyName: this.signupFormControl.value.familyName,
            loginNumber: this.signupFormControl.value.loginNumber,
            email: this.signupFormControl.value.email,
            password: this.signupFormControl.value.password,
            telephone: this.signupFormControl.value.telephone,
            typeUser: 'parent',
            localisation: {
                governorate: this.signupFormControl.value.governorate,
                delegation: this.signupFormControl.value.zipCode,
                zipCode: this.signupFormControl.value.zipCode
            }
        }).then(async () => {
            await this.router.navigate(['/dashboard/patients']);
        }).catch((err: Error) => {
            console.log(err);
        });
    }
}
