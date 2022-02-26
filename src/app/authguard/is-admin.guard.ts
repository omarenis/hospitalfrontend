import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class IsadminGuard implements CanActivate {
    constructor(private router: Router) {
    }
    async canActivate(): Promise<boolean> {
        if (localStorage.getItem('typeUser') === 'admin'){
            return true;
        }
        await this.router.navigate(['/landing/home']);
        return false;
    }
}
