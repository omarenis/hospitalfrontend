import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicTableCrud} from '../dynamic-table.crud';
import {Person} from '../../../models/person';
import {AbstractRestService} from '../../../services/genericservice';
import {SecureStorageService} from '../../../services/secure-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent extends DynamicTableCrud<Person> implements OnInit {
    typeUser: any;
    isSuperDoctor !: boolean;
    formGroup !: FormGroup;
    displayPerson = false;
    typeDisplayedPerson !: string;
    isCreated !: boolean;
    @ViewChild('addUserForm') addUserForm !: ElementRef;
    submitted !: boolean;

    constructor(protected service: AbstractRestService<Person>, protected secureStorageService: SecureStorageService,
                private httpClient: HttpClient, private router: Router) {
        super(service, `${environment.url}/api/persons`, secureStorageService);
    }

    async ngOnInit(): Promise<void> {
        this.submitted = false;
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.required]),
            telephone: new FormControl('', [Validators.required]),
            loginNumber: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            email: new FormControl('', []),
            delegation: new FormControl('', [Validators.required]),
            governorate: new FormControl('', [Validators.required]),
            zipCode: new FormControl('', [Validators.required])
        });
        this.typeUser = localStorage.getItem('typeUser');
        if (this.typeUser === 'admin' && this.isSuperDoctor || this.typeUser === 'school' || this.typeUser === 'superdoctor') {
            this.formGroup.addControl('familyName', new FormControl('', [Validators.required]));
            if (this.typeUser === 'superdoctor') {
                this.formGroup.addControl('speciality', new FormControl('', [Validators.required]));
            }
        }
        if (this.typeUser === 'admin') {
            this.formGroup.addControl('typeUser', new FormControl('', [Validators.required]));
        }
        await this.getData();
    }

    async change_data(event: any): Promise<void> {
        event.preventDefault();
        const typeUser = event.target.value;
        await this.getData({typeUser});
    }

    async addUser($event: Event): Promise<void> {
        $event.preventDefault();
        console.log(this.formGroup.value);
        this.submitted = true;
        let typeUser: string;
        if (this.typeUser === 'admin') {
            typeUser = this.formGroup.value.typeUser;
        } else {
            typeUser = this.typeUser === 'superdoctor' ? 'doctor' : 'teacher';
        }
        try {
            const data = await this.service.create(this.actionUrl, {
                telephone: this.formGroup.value.telephone,
                typeUser,
                school_id: this.typeUser === 'school' ? localStorage.getItem('userId') : undefined,
                is_super: this.typeUser === 'superdoctor' ? false : undefined,
                super_doctor_id: this.typeUser === 'superdoctor' ? localStorage.getItem('userId') : undefined,
                name: this.formGroup.value.name,
                familyName: this.formGroup.value?.familyName,
                password: this.formGroup.value.password,
                speciality: this.formGroup.value?.speciality,
                loginNumber: this.formGroup.value.loginNumber,
                email: this.formGroup.value?.email,
                localisation: this.formGroup.value.delegation === null ? null : {
                    governorate: this.formGroup.value.governorate,
                    delegation: this.formGroup.value.delegation,
                    zipCode: this.formGroup.value.zipCode
                }
            }, this.options);
            this.data.push(data);
            this.addUserForm.nativeElement.click();
            this.numberItems++;
            this.formGroup.reset();
        } catch (err: any) {
            this.isCreated = err.error.created;
        }
    }

    async changeTypeUserToAdd($event: any): Promise<void> {
        // console.log($event.target.value);
        // console.log(this.formGroup.value);
        if ($event.target.value === 'superdoctor') {
            this.isSuperDoctor = true;
            this.formGroup.addControl('familyName', new FormControl('', [Validators.required]));
        } else {
            this.isSuperDoctor = false;
            if (this.formGroup.contains('familyName')) {
                this.formGroup.removeControl('familyName');
            }
            if (this.formGroup.contains('speciality')){
                this.formGroup.removeControl('speciality');
            }
        }
        await this.getData();
    }

    displayUser(i: number): void {
        this.displayPerson = true;
        const person = this.data[i];
        // console.log(person.typeUser !== 'admin' && person.typeUser !== 'superdoctor');
        this.typeDisplayedPerson = person.typeUser;
        this.formGroup.controls.name.setValue(person.name);
        this.formGroup.controls.typeUser.setValue(person.typeUser);
        this.formGroup.controls.email.setValue(person.email);
        this.formGroup.controls.password.setValue(person.password);
        this.formGroup.controls.loginNumber.setValue(person.loginNumber);
        this.formGroup.controls.telephone.setValue(person.telephone);
        if (person.typeUser === 'doctor') {
            if (this.formGroup.contains('speciality')) {
                this.formGroup.controls.speciality.setValue(person.speciality);
            } else {
                this.formGroup.addControl('speciality', new FormControl(person.speciality, [Validators.required]));
            }
        }
        if (this.typeUser !== 'school') {
            if (this.formGroup.contains('familyName')) {
                this.formGroup.controls.familyName.setValue(person.familyName);
            } else {
                this.formGroup.addControl('familyName', new FormControl(person.familyName, [Validators.required]));
            }
        }
        if (person.localisation !== null) {
            this.formGroup.controls.familyName.setValue(person.familyName);
            this.formGroup.controls.governorate.setValue(person.localisation?.governorate);
            this.formGroup.controls.delegation.setValue(person.localisation?.delegation);
            this.formGroup.controls.zipCode.setValue(person.localisation?.zipCode);
        }
    }

    openUserDialog(): void {
        this.formGroup.reset();
        this.submitted = false;
        this.displayPerson = false;
        this.isCreated = false;
    }
    clearData(): void{
        const access = localStorage.getItem('access');
        if (access !== null){
           this.httpClient.delete<void>(`${environment.url}/api/delete_data`,
               {headers: {Authorization: `Bearer ${this.secureStorageService.getToken(access)}`}}).toPromise().then(() => {
                   this.router.navigate(['/dashboard/users']);
                   window.location.reload();
           });
        }
    }
}
