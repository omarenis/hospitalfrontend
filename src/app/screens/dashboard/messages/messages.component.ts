import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicTableCrud} from '../dynamic-table.crud';
import {Message} from '../../../models/message';
import {AbstractRestService} from '../../../services/genericservice';
import {SecureStorageService} from '../../../services/secure-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent extends DynamicTableCrud<Message> implements OnInit {
    formGroup !: FormGroup;
    @ViewChild('messages') messages !: ElementRef;
    constructor(protected service: AbstractRestService<Message>, private secureStorage: SecureStorageService) {
        super(service, `${environment.url}/api/messages`);
    }
    async ngOnInit(): Promise<void> {
        this.formGroup = new FormGroup({
            sender: new FormControl(localStorage.getItem('email'), [Validators.required]),
            receivers: new FormControl('', [Validators.required]),
            subject: new FormControl('', [Validators.required]),
            content: new FormControl('', [Validators.required])
        });
        const access = localStorage.getItem('access');
        if (access !== null){
            this.options = {
                headers: { Authorization: `Bearer ${this.secureStorage.getToken(access)}` },
                params: {
                    email: localStorage.getItem('email')
                }
            };
            await this.getData();
        }
    }

    submit(event: Event): void{
        event.preventDefault();
        this.service.create(this.actionUrl, {...this.formGroup.value}).then((response: Message) => {
            this.data.push(response);
            this.messages.nativeElement.click();
        });
    }
}
