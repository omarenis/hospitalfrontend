import {Component, OnInit} from '@angular/core';
import {Patient} from '../../../models/patient';
import {AbstractRestService} from '../../../services/genericservice';
import {DynamicTableCrud} from '../dynamic-table.crud';
import {SecureStorageService} from '../../../services/secure-storage.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.css']
})
export class PatientsComponent extends DynamicTableCrud<Patient> implements OnInit {
    headers = ['', 'الاسم', 'اللقب', 'تاريخ الميلاد', 'المدرسة'];
    access !: string | null;
    userId !: number;
    numberPatients !: number;
    typeUser !: string | null;

    constructor(protected service: AbstractRestService<Patient>, protected secureStorageService: SecureStorageService) {
        super(service, `${environment.url}/api/patients`, secureStorageService);
    }

    async ngOnInit(): Promise<void> {
        this.access = localStorage.getItem('access');
        if (this.access) {
            this.options = {
                params: null,
                headers: {Authorization: `Bearer ${this.secureStorageService.getToken(this.access)}`}
            };
            await this.getData();
        }
    }

    async getData(): Promise<void> {
        this.data = await this.service.list(this.actionUrl, this.options);
        this.numberPatients = this.data.length;
    }
}
