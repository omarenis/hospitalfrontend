import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    animations: [
        trigger('readMore', [
            state('displayed', style({height: 'auto'})),
            state('notDisplayed', style({height: '6em', overflow: 'hidden'})),
            transition('displayed=>notDisplayed', animate('1500ms ease-in-out')),
            transition('notDisplayed=>displayed', animate('1500ms ease-in-out'))
        ])
    ]
})
export class CardComponent implements OnInit {

    @Input() title ?: string;
    // @ts-ignore
    @Input() description: string | '';
    @Input() image ?: string;
    @Input() id!: number;
    state = 'notDisplayed';

    constructor() {
    }

    ngOnInit(): void {
    }

    showOrHide(): void {
        this.state = this.state === 'notDisplayed' ? 'displayed' : 'notDisplayed';
    }

}
