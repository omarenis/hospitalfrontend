import {Component, OnInit} from '@angular/core';
import {AbstractRestService} from '../../../services/genericservice';
import {Person} from '../../../models/person';
import {Supervise} from '../../../models/supervise';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-orientation',
    templateUrl: './orientation.component.html',
    styleUrls: ['./orientation.component.css']
})
export class OrientationComponent implements OnInit {
    result!: string;
    doctors !: Person[];
    patientId!: number;
    constructor(private service: AbstractRestService<Person>, private superviseService: AbstractRestService<Supervise>,
                private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {this.patientId = params.patientId; });
        this.service.list(`${environment.url}/api/persons/doctors`)
            .then((response: Person[]) => {
            this.doctors = response;
        });
    }

    selectSupervisor(id: number | undefined): void{
        const access = localStorage.getItem('access');
        if (id !== undefined){
            this.superviseService.create(`${environment.url}/api/patients/supervises`, {
                patient_id: this.patientId,
                doctor_id: id,
                accepted: true,
            }).then(async () => {
                await this.router.navigate([access === null ? '/landing/home' : '/dashboard/patients']);
            })
                .catch((error) => {console.log(error); });
        }
    }
}
