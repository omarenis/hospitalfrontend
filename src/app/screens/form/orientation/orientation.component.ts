import {Component, OnInit} from '@angular/core';
import {AbstractRestService} from '../../../services/genericservice';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {Patient} from '../../../models/patient';
import {SecureStorageService} from '../../../services/secure-storage.service';

@Component({
    selector: 'app-orientation',
    templateUrl: './orientation.component.html',
    styleUrls: ['./orientation.component.css']
})
export class OrientationComponent implements OnInit {
    public isSick !: boolean | undefined;
    // doctors !: Person[];
    // patientId!: number;
        scoreParent !: number;
        scoreTeacher !: number;
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private patientService: AbstractRestService<Patient>,
                private secureStorageService: SecureStorageService) {
    }
    ngOnInit(): void {
        // let patient: number | null | string = localStorage.getItem('patient');
        // patient = patient !== null ? Number(patient) : null;
        // if (patient !== null){
        //     this.patientService.get(`${environment.url}/api/patients`, patient).then((patientData) => {
        //         this.isSick = patientData.sick;
        //     });
        // }
        const access = localStorage.getItem('access');
        if (access !== null){
            this.activatedRoute.params.subscribe((params) => {
            console.log(params);
            this.patientService.get(`${environment.url}/api/patients`, params.patientId,
                {headers: {Authorization: `Bearer ${this.secureStorageService.getToken(access)}`}}).then((patient: Patient) => {
                this.isSick = patient.sick;
                this.scoreParent = patient.scoreParent;
                this.scoreTeacher = patient.scoreTeacher;
                console.log(patient);
            }, (err) => {console.log(err); });
        });
        }
        // this.service.list(`${environment.url}/api/persons/doctors`)
        //     .then((response: Person[]) => {
        //     this.doctors = response;
        // });
    }

    // selectSupervisor(id: number | undefined): void{
    //     const access = localStorage.getItem('access');
    //     if (id !== undefined){
    //         this.superviseService.create(`${environment.url}/api/patients/supervises`, {
    //             patient_id: this.patientId,
    //             doctor_id: id,
    //             accepted: true,
    //         }).then(async () => {
    //             await this.router.navigate([access === null ? '/landing/home' : '/dashboard/patients']);
    //         })
    //             .catch((error) => {console.log(error); });
    //     }
    // }
}
