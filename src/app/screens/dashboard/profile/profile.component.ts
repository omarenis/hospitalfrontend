import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractRestService, saveDataToLocalhost} from '../../../services/genericservice';
import {Person} from '../../../models/person';
import {SecureStorageService} from '../../../services/secure-storage.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    email !: string;
    telephone !: string;
    loginNumber !: string;
    typeUser !: string;
    token !: string;
    formGroup !: FormGroup;
    changePasswordForm !: FormGroup;
    shown = false;
    userId !: number;
    passwordChanged !: boolean;
    constructor(private service: AbstractRestService<Person>, private secureStorageService: SecureStorageService) {}

    ngOnInit(): void {
        const access = localStorage.getItem('access');
        const userId: number = Number(localStorage.getItem('userId'));
        const typeUser = localStorage.getItem('typeUser');
        if( typeUser !== null){
            this.typeUser = typeUser;
        }
        if (access !== null)
        {
            this.token = this.secureStorageService.getToken(access);
        }
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.email]),
            telephone: new FormControl(this.telephone, [Validators.required]),
            loginNumber: new FormControl(this.loginNumber, [Validators.required]),
        });
        if (this.typeUser !== 'admin' && this.typeUser !== 'superdoctor'){
            this.formGroup.addControl('governorate', new FormControl( '', [Validators.required]));
            this.formGroup.addControl('delegation', new FormControl( ''));
            this.formGroup.addControl('zipCode', new FormControl( '', [Validators.required]));
            if (this.typeUser !== 'school'){
                this.formGroup.addControl('familyName', new FormControl('', [Validators.required]));
            }
        }
        this.service.get(`${environment.url}/api/persons`, userId, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }).then((response: Person) => {
            this.formGroup.setValue({
                loginNumber: response.loginNumber,
                name: response.name,
                email: response.email,
                telephone: response.telephone,
                familyName: response?.familyName,
            });
            if (this.typeUser !== 'admin')
            {
                this.formGroup.controls.governorate.setValue(response.localisation?.governorate);
                this.formGroup.controls.delegation.setValue(response.localisation?.delegation);
                this.formGroup.controls.zipCode.setValue(response.localisation?.zipCode);
            }
        });
        this.changePasswordForm = new FormGroup({
            current: new FormControl('', [Validators.required]),
            new: new FormControl('', [Validators.required]),
            confirmed: new FormControl('', [Validators.required])
        });
        this.userId = userId;
    }

    submit($event: any): void {
        $event.preventDefault();
        this.service.put(`${environment.url}/api/persons`, this.userId, {...this.formGroup.value}, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }).then((response: Person) => {
            saveDataToLocalhost(response);
        });
    }

    showOrHidePassword(): void {
        console.log('hello');
    }

    changePassword($event: Event): void {
        $event.preventDefault();
        console.log(this.changePasswordForm.value);
    }
}
