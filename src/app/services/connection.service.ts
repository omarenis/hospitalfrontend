import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConnectionService {
    private connection = new Subject<boolean>();
    connected$ = this.connection.asObservable();
    constructor() {
    }
    setConnection(connection: boolean): void{
        this.connection.next(connection);
    }
}
