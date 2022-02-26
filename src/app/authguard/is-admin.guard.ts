import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class IsadminGuard implements CanActivate {
    constructor(private router: Router) {
    }
    canActivate(): boolean {
        if (localStorage.getItem('typeUser') === 'admin'){
            return true;
        }
        this.router.navigate(['/landing/home']);
        return false;
    }
}
