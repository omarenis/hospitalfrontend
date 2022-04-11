import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../../models/patient';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractRestService} from '../../../services/genericservice';
import {environment} from '../../../../environments/environment';
import {Person} from '../../../models/person';
import {SecureStorageService} from '../../../services/secure-storage.service';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
    @ViewChild('notify') notify !: ElementRef;
    formGroup !: FormGroup;
    validated = true;
    typeUser !: string;
    error !: boolean;

    constructor(private patientService: AbstractRestService<Patient>, private router: Router, private activeRoute: ActivatedRoute) {}

    async ngOnInit(): Promise<void> {
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.required]),
            familyName: new FormControl('', [Validators.required]),
            birthdate: new FormControl('', [Validators.required]),
            school: new FormControl('', [])
        });
    }

    async submit(event: Event): Promise<void> {
        this.validated = true;
        event.preventDefault();
        localStorage.setItem('patient', JSON.stringify(this.formGroup.value));
        await this.router.navigate([`/form/${localStorage.getItem('typeUser')}/1`]);
    }
}
