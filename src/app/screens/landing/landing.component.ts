import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css'],
    animations: [
        trigger('routerAnimation', [
            transition('* => *', [
                style
                (
                    {
                    opacity: 0,
                    }
                ),
                animate(1000)])
        ])
    ]
})
export class LandingComponent implements OnInit {
    user: string | null;
    sticky =  false;
    messageForm = new FormGroup({
        sender: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        object: new FormControl('', [Validators.required]),
        content: new FormControl('', [Validators.required])
    });
    constructor() {
        this.user = localStorage.getItem('user');
    }

    ngOnInit(): void {
    }

    getDepth(myOutlet: RouterOutlet): RouterOutlet {
        return myOutlet.activatedRouteData.depth;
    }
}
