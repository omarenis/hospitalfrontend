import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginSignupService, Token} from '../../services/login-signup.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {saveDataToLocalhost} from '../../services/genericservice';
import {SecureStorageService} from '../../services/secure-storage.service';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    formGroup !: FormGroup;
    validated !: boolean;
    error !: string;
    shown !: boolean;
    @Output() connected = new EventEmitter<boolean>();
    constructor(private loginSignupService: LoginSignupService, private router: Router, private secureStorageService: SecureStorageService,
                private connection: ConnectionService){
    }
    ngOnInit(): void {
        this.formGroup = new FormGroup({
            loginNumber: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8)])
        });
        this.error = '';
        this.validated = true;
        this.shown = false;
    }
    showOrHidePassword(event: Event): void {
        event.preventDefault();
        this.shown = !this.shown;
    }
    submit($event: Event): void{
        $event.preventDefault();
        this.loginSignupService.login(this.formGroup.value.loginNumber, this.formGroup.value.password).then(async (response: Token) => {
            response.access = this.secureStorageService.setToken(response.access);
            response.refresh = this.secureStorageService.setToken(response.refresh);
            saveDataToLocalhost(response);
            let url: string;
            if (response.typeUser !== 'admin' && response.typeUser !== 'parent' && response.typeUser !== 'teacher')
            {
                url = '/dashboard/patients';
            }
            else if (response.typeUser === 'admin')
            {
                url = '/dashboard/users';
            }
            else
            {
                url = 'landing/join';
            }
            this.connection.setConnection({
                typeUser: response.typeUser,
                name: response.name
            });
            await this.router.navigate([url]);
        }).catch((err) => {
            this.validated = false;
            this.error = err.error.error;
        });
    }
}
