import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../../models/patient';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractRestService} from '../../../services/genericservice';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
    @ViewChild('notify') notify !: ElementRef;
    formGroup !: FormGroup;
    validated = true;
    typeUser !: string | null;
    error !: boolean;

    constructor(private patientService: AbstractRestService<Patient>, private router: Router, private activeRoute: ActivatedRoute) {}

    async ngOnInit(): Promise<void> {
        this.typeUser = localStorage.getItem('typeUser');
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.required]),
            familyName: new FormControl('', [Validators.required]),
            birthdate: new FormControl('', [Validators.required]),
        });
        if (localStorage.getItem('typeUser') !== 'parent')
        {
           this.formGroup.addControl('parentCin', new FormControl('', [Validators.required]));
        }
    }

    async submit(event: Event): Promise<void> {
        this.validated = true;
        event.preventDefault();
        localStorage.setItem('patient', JSON.stringify(this.formGroup.value));
        await this.router.navigate([`/form/${localStorage.getItem('typeUser')}/1`]);
    }
}
