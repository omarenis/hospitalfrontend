import {FormControl} from '@angular/forms';

export interface Question {
        label: string;
        formControlName: string;
        id: number;
        formControl ?: FormControl;
}
