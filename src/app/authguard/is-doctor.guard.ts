import {Injectable} from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class IsdoctorGuard implements CanActivate {
    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    }

    canActivate(): boolean {
        if (localStorage.getItem('typeUser') === 'doctor' || localStorage.getItem('typeUser') === 'superdoctor'){
            return true;
        }
        this.router.navigate(['/home/landing']);
        return false;
    }
}
