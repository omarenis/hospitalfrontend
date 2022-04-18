import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {Person} from '../../../models/person';
import {RendezVous} from '../../../models/rendez-vous';
import {AbstractRestService} from '../../../services/genericservice';
import {SecureStorageService} from '../../../services/secure-storage.service';
import {DynamicTableCrud} from '../dynamic-table.crud';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent extends DynamicTableCrud<RendezVous> implements OnInit {

  typeUser!: string;
    parents: Person[] = [];
    headers !: string[];
    formGroup !: FormGroup;
    parentName = '';
    userId !: number;
    action !: string;
    id!: number | undefined;
    index!: number;

    constructor(protected service: AbstractRestService<RendezVous>, private parentService: AbstractRestService<Person>,
                protected secureStorageService: SecureStorageService) {
        super(service, `${environment.url}/api/patients/consultations`, secureStorageService);
    }
 async ngOnInit(): Promise<void> {
        this.formGroup = new FormGroup({
            parent_id: new FormControl('', [Validators.required]),
            date: new FormControl('', [Validators.required])
        });
        this.action = 'create';
        const userId = localStorage.getItem('userId');
        if (userId) {
            this.userId = Number(userId);
        }
        const access = localStorage.getItem('access');
        const typeUser = localStorage.getItem('typeUser');
        this.typeUser = typeUser === null ? '' : typeUser;
        this.headers = ['id', 'تاريخ اﻹجتماع'];
        if (this.typeUser === 'doctor' || this.typeUser === 'superuser') {
            this.headers = this.headers.concat(['اسم الولي', 'لقب الولي', 'رقم هاتف الولي', '']);
        } else if (typeUser === 'parent') {
            this.headers = this.headers.concat(['اسم الطبيب', 'لقب الطبيب', 'رقم هاتف الطبيب', '']);
        }
        if (access) {
            this.options = {
                headers: {
                    Authorization: `Bearer ${this.secureStorageService.getToken(access)}`
                },
                params: null
            };
        }
        if (userId) {
            if (this.typeUser === 'parent') {
                this.options.params = {parent_id: Number(userId)};
                await this.getData();
            }
            this.parentService.list(`${environment.url}/api/persons`, {
                params: {
                    typeUser: this.typeUser === 'parent' ? 'doctor' : 'parent',
                    patient__supervise__accepted: true,
                },
                headers: this.options.headers
            }).then((response: Person[]) => {
                response.forEach((person: Person) => {
                    this.parents.push(person);
                });
            });
        }
    }

    submit(event: any): void {
        event.preventDefault();
        const rendezVous: RendezVous = {
            doctor_id: this.userId,
            parent_id: this.formGroup.value.parent_id,
            accepted: false,
            date: new Date(this.formGroup.value.date).toISOString()
        };
        console.log(this.action);
        if (this.action === 'create'){
            this.service.create('http://reperagepedopsy.com/api/patients/consultations', rendezVous, {
                headers: this.options.headers
            }).then((response: RendezVous) => {
                this.data.push(response);
            });
        } else if (this.action === 'modify' && this.id !== undefined) {
            this.service.put(this.actionUrl, this.id, rendezVous, {
                headers: this.options.headers
            }).then((response) => {
                this.data[this.index] = response;
            });
        }
    }
    getConsultationById(id: number | undefined, index: number): void {
        const renderVous = this.data[index];
        console.log(renderVous);
        this.formGroup.setValue({
            parent_id: renderVous.parent?.id,
            date: renderVous.date
        });
        this.action = 'modify';
        this.id = renderVous.id;
        this.index = index;
    }

acceptConsultation(id: number | undefined, index: number): void {
        const renderVous = this.data[index];
        renderVous.accepted = true;
        if (id !== undefined) {
            this.service.put(this.actionUrl, id, {
                parent_id: renderVous.parent_id,
                doctor_id: renderVous.doctor_id,
                accepted: true,
                date: renderVous.date
            }, {
                headers: this.options.headers
            }).then((response: RendezVous) => {
                console.log(response);
                this.data[index] = response;
            });
        }
    }

    delete(id: number | undefined, index: number ): void {
        if (id !== undefined) {
            this.service.delete(this.actionUrl, id, {headers: this.options.headers}).then(() => {
                this.data.splice(index, 1);
            });
        }
    }

}
