import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractRestService} from '../../../../services/genericservice';
import {Message} from '../../../../models/message';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
@Component({
    selector: 'app-message-replay',
    templateUrl: './message-replay.component.html',
    styleUrls: ['./message-replay.component.css']
})
export class MessageReplayComponent implements OnInit {
    formGroup !: FormGroup;
    id !: number;
    sender !: string;
    receiver !: string;
    subject !: string;
    content !: string;
    private path = `${environment.url}/api/messages`;
    date !: Date | string;
    email !: string;
    constructor(private activatedRoute: ActivatedRoute, private messageService: AbstractRestService<Message>, private router: Router) {
    }

    ngOnInit(): void {
        const sender = localStorage.getItem('email');
        if (sender !== null){ this.sender = sender; }
        this.activatedRoute.params.subscribe((params) => {
            const id = params.id;
            this.messageService.get(this.path, id).then((response: Message) => {
                this.receiver = response.sender;
                this.subject = response.subject;
                this.content = response.content;
                this.date = new Date(response.date);
            });
        });
        this.formGroup = new FormGroup({
            content: new FormControl('', [Validators.required])
        });
    }
    submit(event: Event): void{
        event.preventDefault();
        const content = this.formGroup.value.content;
        if (content !== undefined && content !== null && this.subject !== null){
            const message: Message = {
                sender: this.sender,
                receivers: this.receiver,
                subject: this.subject,
                content,
                date: new Date(),
                read: false
            };
            this.messageService.create(this.path, message).then(async () => {
                await this.router.navigate(['/dashboard/messages']);
            });
        }
    }
}
