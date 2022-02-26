import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
    constructor(private router: Router) {
    }
    canActivate(): boolean{
        console.log(localStorage.getItem('access') === null);
        return localStorage.getItem('access') !== null;
    }
}
