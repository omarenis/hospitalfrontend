import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Response} from '../../models/response';


class Action{
    constructor(
        public event: string,
        public idQuestion: number,
        public value: string
    ) {}
}
@Component({
    selector: 'app-responses',
    templateUrl: './responses.component.html',
    styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {
    @Input() responses !: Response[];
    @Input() canUpdate !: boolean;
    @Output() event = new EventEmitter<Action>();
    private value !: string;
    constructor() {}

    ngOnInit(): void {
    }

    changeValue(event: Event, value: string): void {
        this.value = value;
    }

    sendEvent(id: number): void {
        this.event.emit({
            idQuestion: id,
            event: 'update',
            value: this.value
        });
    }
}
