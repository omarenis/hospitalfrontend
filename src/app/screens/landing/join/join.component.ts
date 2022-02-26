import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
    @ViewChild('form') formModal !: ElementRef;

    constructor(private router: Router) {
    }

    ngOnInit(): void {}

    async goToForm(event: any, value: string): Promise<void> {
        event.preventDefault();
        if (value === 'teacher') {
            localStorage.setItem('typeUser', 'teacher');
            await this.router.navigate(['/form/teacher/1']);
        } else {
            localStorage.setItem('typeUser', 'parent');
            await this.router.navigate(['/form/parent/1']);
        }
        this.formModal.nativeElement.click();
    }
}
