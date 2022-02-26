import {Question} from './question';
import {FormGroup} from '@angular/forms';

export interface TemplateForm {
    questions: Question[];
    formGroup: FormGroup;
}
