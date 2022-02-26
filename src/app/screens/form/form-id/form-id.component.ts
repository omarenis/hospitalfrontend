import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Question} from '../../../models/question';
import {QuestionService} from '../../../services/question.service';
import {ActivatedRoute, Router} from '@angular/router';
import {saveDataToLocalhost} from '../../../services/genericservice';

@Component({
    selector: 'app-form-id',
    templateUrl: './form-id.component.html',
    styleUrls: ['./form-id.component.css']
})
export class FormIdComponent implements OnInit {
    formGroup !: FormGroup;
    questions !: Question[];
    typeUser !: string;
    step !: number;

    constructor(private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(() => {
            this.step = Number(this.activatedRoute.snapshot.params.id);
            this.typeUser = this.activatedRoute.snapshot.params.typeUser;
            const index = this.typeUser === 'parent' ? 16 : 14;
            const templateForm = this.questionService.generateFormGroup(this.typeUser, (this.step - 1) * index, this.step * index);
            this.questions = templateForm.questions;
            this.formGroup = templateForm.formGroup;
        });
    }
    async submit(event: Event): Promise<void>{
        event.preventDefault();
        saveDataToLocalhost(this.formGroup.value);
        let navigateTo: string;
        if (this.typeUser === 'teacher' && this.step === 2 || this.typeUser === 'parent' && this.step === 3) {
            navigateTo = `/form/${this.typeUser}/patient`;
        } else {
            navigateTo = `/form/${this.typeUser}/${this.step + 1}`;
        }
        await this.router.navigate([navigateTo]);
    }
}
