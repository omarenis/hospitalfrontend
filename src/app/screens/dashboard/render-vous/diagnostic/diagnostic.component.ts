import {Component, OnInit} from '@angular/core';
import {AbstractRestService} from '../../../../services/genericservice';
import {Diagnostic} from '../../../../models/diagnostic';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../../../models/patient';
import {RendezVous} from '../../../../models/rendez-vous';
import {SecureStorageService} from '../../../../services/secure-storage.service';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-diagnostic',
    templateUrl: './diagnostic.component.html',
    styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent implements OnInit {
    formGroup !: FormGroup;
    consultation_id ?: number;
    action !: string;
    options !: { headers: { Authorization: string } };
    patients !: Patient[];
    diagnostic_id !: number;
    constructor(protected service: AbstractRestService<Diagnostic>, private activatedRoute: ActivatedRoute,
                private patientService: AbstractRestService<Patient>, private rendezVousService: AbstractRestService<RendezVous>,
                private secureStorage: SecureStorageService, private router: Router) {
    }

    ngOnInit(): void {
        const access = localStorage.getItem('access');
        const userId = Number(localStorage.getItem('userId'));
        if (access) {
            this.options = {headers: {Authorization: `Bearer ${this.secureStorage.getToken(access)}`}};
        }
        this.formGroup = new FormGroup({
            diagnostic: new FormControl('', [Validators.required]),
            patient_id: new FormControl('', [Validators.required])
        });
        this.activatedRoute.params.subscribe(params => {
            this.action = params.action;
            this.rendezVousService.get(`${environment.url}/api/patients/consultations`, Number(params.id), this.options)
                .then((response: RendezVous) => {
                    this.consultation_id = response.id;
                    this.patientService.list(`${environment.url}/api/patients/`, {
                        headers: this.options.headers,
                        params: {
                            supervise__accepted: true,
                            supervise__doctor_id: userId,
                            parent_id: response.parent_id,
                        }
                    }).then((res: Patient[]) => {
                        this.patients = res;
                        res.forEach((patient) => {console.log(patient.supervise?.accepted); });
                    });
                    if (response.diagnostic){
                        if (response.diagnostic.id != null) { this.diagnostic_id = response.diagnostic.id; }
                        this.formGroup.setValue({
                            patient_id: response.diagnostic.patient_id,
                            diagnostic: response.diagnostic.diagnostic
                        });
                    }
                });
        });
    }

    submit(event: Event): void{
        event.preventDefault();
        const path = `${environment.url}/api/patients/diagnostics`;
        console.log(this.formGroup.value);
        if (this.consultation_id !== undefined){
            const diagnostic: Diagnostic = {
                consultation_id: Number(this.consultation_id),
                diagnostic: this.formGroup.value.diagnostic,
                patient_id: Number(this.formGroup.value.patient_id)
            };

            if (this.diagnostic_id === null || this.diagnostic_id === undefined){
                this.service.create(path, diagnostic, this.options).then(async () => {
                    await this.router.navigate(['/dashboard/rendez-vous']);
                });
            }else{
                this.service.put(path, this.diagnostic_id, diagnostic, this.options).then( async () => {
                    await this.router.navigate(['/dashboard/rendez-vous']);
                });
            }
        }
    }
}
