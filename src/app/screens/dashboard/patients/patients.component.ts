import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Patient} from '../../../models/patient';
import {AbstractRestService} from '../../../services/genericservice';
import {DynamicTableCrud} from '../dynamic-table.crud';
import {SecureStorageService} from '../../../services/secure-storage.service';
import {environment} from '../../../../environments/environment';
import {Supervise} from '../../../models/supervise';
import {Person} from '../../../models/person';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.css']
})
export class PatientsComponent extends DynamicTableCrud<Patient> implements OnInit {
    constructor(protected service: AbstractRestService<Patient>, protected secureStorageService: SecureStorageService,
                private superviseService: AbstractRestService<Supervise>, private doctorService: AbstractRestService<Person>) {
        super(service, `${environment.url}/api/patients`, secureStorageService);
    }
    headers = ['', 'الاسم', 'اللقب', 'تاريخ الميلاد'];
    access !: string | null;
    patient !: Patient;
    userId !: number;
    numberPatients !: number;
    typeUser !: string | null;
    doctors !: Person[];
    @ViewChild('superviseModel') superviseModel !: ElementRef;
    async ngOnInit(): Promise<void> {
        this.access = localStorage.getItem('access');
        const typeUser = localStorage.getItem('typeUser');
        if (typeUser !== null){
            this.typeUser = typeUser;
        }
        if (this.access) {
            this.options = {
                params: null,
                headers: {Authorization: `Bearer ${this.secureStorageService.getToken(this.access)}`}
            };
            await this.getData();
            console.log(this.data);
        }
    }
    async getData(): Promise<void> {
        this.data = await this.service.list(this.actionUrl, this.options);
        this.numberPatients = this.data.length;
    }
    async selectPatient(i: number): Promise<void>{
        const patient = this.data[i];
        if (patient !== undefined){
            this.patient = patient;
        }
        this.doctors = await this.doctorService.list(`${environment.url}/api/persons`, this.options);
    }
    addSupervise(doctorId: number | undefined, $event: Event): void {
        $event.preventDefault();
        const patientId = this.patient.id;
        if (patientId !== null && patientId !== undefined && doctorId !== null && doctorId !== undefined)
        {
            this.superviseService.create(`${this.actionUrl}/supervises`,
                {patient_id: patientId, doctor_id: doctorId, accepted: true}, this.options).then(() => {
                    this.superviseModel.nativeElement.click();
            });
        }
    }
}
