import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicTableCrud} from '../dynamic-table.crud';
import {Person} from '../../../models/person';
import {AbstractRestService} from '../../../services/genericservice';
import {SecureStorageService} from '../../../services/secure-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
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
    @ViewChild('addUserForm') addUserForm !: ElementRef;

    constructor(protected service: AbstractRestService<Person>, protected secureStorageService: SecureStorageService) {
        super(service, `${environment.url}/api/persons`, secureStorageService);
    }

    async ngOnInit(): Promise<void> {
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
        if (this.typeUser === 'admin') {
            this.formGroup.addControl('typeUser', new FormControl('', [Validators.required]));
        }
        else {
            this.formGroup.addControl('familyName', new FormControl('', [Validators.required]));
            if (this.typeUser === 'superdoctor') {
                this.formGroup.addControl('speciality', new FormControl('', [Validators.required]));
            }
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
        let typeUser: string;
        if (this.typeUser === 'admin'){
            typeUser = this.formGroup.value.typeUser;
        } else {
            typeUser = this.typeUser === 'superdoctor' ? 'doctor' : 'teacher';
        }
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
    }

    async changeTypeUserToAdd($event: any): Promise<void> {
        if ($event.target.value === 'superdoctor') {
            this.isSuperDoctor = true;
            if (this.formGroup.contains('governorate')) {
                this.formGroup.removeControl('governorate');
                this.formGroup.removeControl('delegation');
                this.formGroup.removeControl('zipCode');
            }
            this.formGroup.addControl('familyName', new FormControl('', [Validators.required]));
        } else {
            this.isSuperDoctor = false;
            if (this.formGroup.contains('familyName')) {
                this.formGroup.removeControl('familyName');
            }
            this.formGroup.addControl('governorate', new FormControl('', [Validators.required]));
            this.formGroup.addControl('delegation', new FormControl('', [Validators.required]));
            this.formGroup.addControl('zipCode', new FormControl('', [Validators.required]));
        }
        await this.getData();
    }

    displayUser(i: number): void {
        this.displayPerson = true;
        const person = this.data[i];
        console.log(person);
        // console.log(person.typeUser !== 'admin' && person.typeUser !== 'superdoctor');
        this.typeDisplayedPerson = person.typeUser;
        this.formGroup.setValue({
            name: person.name,
            typeUser: person.typeUser,
            email: person.email,
            password: person.password,
            loginNumber: person.loginNumber,
            telephone: person.telephone
        });
        if (person.typeUser !== 'admin' && person.typeUser !== 'superdoctor'){
            console.log('localisation = ', person.localisation);
            this.formGroup.controls.familyName.setValue(person.familyName);
            this.formGroup.controls.governorate.setValue(person.localisation?.governorate);
            this.formGroup.controls.delegation.setValue(person.localisation?.delegation);
            this.formGroup.controls.zipCode.setValue(person.localisation?.zipCode);
            if (person.typeUser !== 'school')
            {
                this.formGroup.addControl('familyName', new FormControl(person.familyName, [Validators.required]));
            }
        }
    }

    openUserDialog(): void {
        this.formGroup.reset();
        this.displayPerson = false;
    }
}
