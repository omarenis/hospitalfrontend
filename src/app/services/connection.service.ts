import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
export interface Connection {
    typeUser: string;
    name: string;
}
@Injectable({
    providedIn: 'root'
})
export class ConnectionService {
    private connection = new Subject<Connection>();
    connected$ = this.connection.asObservable();
    constructor() {
    }
    setConnection(connection: Connection): void{
        this.connection.next(connection);
    }
}
