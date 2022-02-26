import {Component, OnInit} from '@angular/core';
import {Question} from '../../../models/question';
import {QuestionService} from '../../../services/question.service';
import {AbstractRestService} from '../../../services/genericservice';
import {Patient} from '../../../models/patient';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../../../models/response';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-patients-id',
    templateUrl: './patients-id.component.html',
    styleUrls: ['./patients-id.component.css']
})
export class PatientsIdComponent implements OnInit {
    questions !: Array<Question>;
    responses: Response[] = [];
    formGroup !: FormGroup;
    canEdit !: boolean;
    sick !: boolean;
    typeUser !: string | null;

    constructor(private questionService: QuestionService, private patientService: AbstractRestService<Patient>,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        const userId = localStorage.getItem('userId');
        this.typeUser = localStorage.getItem('typeUser');
        this.canEdit = localStorage.getItem('typeUser') === 'parent';
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.required]),
            familyName: new FormControl('', [Validators.required]),
            birthdate: new FormControl('', [Validators.required]),
            school: new FormControl('', [Validators.required]),
            parentName: new FormControl(''),
            parentFamilyName: new FormControl(''),
            parentTelephone: new FormControl(''),
            parentEmail: new FormControl('')
        });
        this.questions = this.questionService.getParentQuestions();
        const data: any = {};
        this.activatedRoute.params.subscribe(params => {
            this.patientService.get(`${environment.url}/api/patients`, params.id).then((response: any) => {
                this.sick = response.sick;
                if (userId !== null && this.typeUser === 'doctor') {
                    if (response.supervise !== null && response.supervise !== undefined &&
                        response?.supervise.doctor === Number(userId) && response.supervise.accepted) {
                        this.formGroup.setValue({
                            name: response.name,
                            familyName: response.familyName,
                            birthdate: response.birthdate,
                            school: response.school,
                            parentName: this.canEdit ? '' : response?.parent?.name,
                            parentFamilyName: this.canEdit ? '' : response?.parent?.familyName,
                            parentTelephone: this.canEdit ? '' : response?.parent?.telephone,
                            parentEmail: this.canEdit ? '' : response?.parent?.email
                        });
                    } else {
                        this.formGroup.setValue({
                            name: 'XXXXXXXX',
                            familyName: 'XXXXXXXX',
                            birthdate: 'XXXXXXXX',
                            school: 'XXXXXXXX',
                            parentName: 'XXXXXXXX',
                            parentFamilyName: 'XXXXXXXX',
                            parentTelephone: 'XXXXXXXX',
                            parentEmail: 'XXXXXXXX'
                        });
                    }
                } else {
                    this.formGroup.setValue({
                        name: response.name,
                        familyName: response.familyName,
                        birthdate: response.birthdate,
                        school: response.school,
                        parentName: this.canEdit ? '' : response.parent.name,
                        parentFamilyName: this.canEdit ? '' : response.parent.familyName,
                        parentTelephone: this.canEdit ? '' : response.parent.telephone,
                        parentEmail: this.canEdit ? '' : response.parent.email
                    });
                }
                Object.keys(response).forEach((key: string) => {
                    const value = response[key];
                    if (value !== undefined && value !== null && typeof value === 'object') {
                        for (const question of this.questions) {
                            if (value[question.formControlName] !== undefined) {
                                data[question.id] = {
                                    id: question.id,
                                    label: question.label,
                                    value: value[question.formControlName],
                                    questionFormControlName: question.formControlName
                                };
                            }
                        }
                    }
                });
                Object.keys(data).forEach((key: string) => {
                    this.responses.push(data[key]);
                });
            });
        });
    }
}
