import {Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {LoginSignupService, Token} from './services/login-signup.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {saveDataToLocalhost} from './services/genericservice';
import {SecureStorageService} from './services/secure-storage.service';
import {isPlatformBrowser} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
    @ViewChild('signInModal') signInModal !: ElementRef;
    @ViewChild('form') formModal !: ElementRef;
    @ViewChild('offcanvasExample') canvasModal !: ElementRef;
    title = 'frontendnewversion';
    show = true;
    shown = true;
    validated!: boolean;
    error!: string;
    notify = false;
    connected = false;
    signInGroup!: FormGroup;
    name !: string;
    familyName !: string;
    typeUser !: string | null;
    isDoctor  !: boolean;
    isAdmin !: boolean;

    constructor(private loginService: LoginSignupService, private router: Router, private domSanitizer: DomSanitizer,
                private secureStorageService: SecureStorageService,
                @Inject(PLATFORM_ID) private platformId: any) {
    }

    ngOnInit(): void {
        this.signInGroup = new FormGroup({
            loginNumber: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8)])
        });
        if (isPlatformBrowser(this.platformId)) {
            this.typeUser = localStorage.getItem('typeUser');
            if (localStorage.getItem('name') !== null) {
                this.name = localStorage.getItem('name') || '';
            }
            if (localStorage.getItem('familyName')) {
                this.familyName = localStorage.getItem('familyName') || '';
            }
            this.connected = localStorage.getItem('access') !== null;
            this.isDoctor = localStorage.getItem('typeUser') === 'dcotor';
            this.isAdmin = localStorage.getItem('typeUser') === 'admin';
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        console.log(event.target.innerWidth);
        if (event.target.innerWidth < window.innerWidth / 2) {
            this.show = false;
        }
    }
    showOrHidePassword(event: Event): void {
        event.preventDefault();
        this.shown = !this.shown;
    }
    login(event: any): void {
        event.preventDefault();
        this.loginService.login(this.signInGroup.value.cin, this.signInGroup.value.password).then(async (response: Token) => {
            this.signInModal.nativeElement.click();
            response.access = this.secureStorageService.setToken(response.access);
            response.refresh = this.secureStorageService.setToken(response.refresh);
            saveDataToLocalhost(response);
            this.typeUser = response.typeUser;
            this.name = response.name;
            this.familyName = response.familyName === undefined || response.familyName === null ? '' : response.familyName;
            this.signInModal.nativeElement.click();
            this.validated = true;
            this.notify = true;
            let url: string;
            if (this.typeUser === 'doctor' || this.typeUser === 'superdoctor') {
                url = '/dashboard/patients';
            } else if (this.typeUser === 'admin') {
                url = '/dashboard/users';
            } else {
                url = '/landing/home';
            }
            this.name = response.name;
            this.signInModal.nativeElement.click();
            this.validated = true;
            this.notify = true;
            this.connected = true;
            await this.router.navigate([url]);
        }).catch((err) => {
            this.error = err.error.error;
            this.validated = false;
        });
    }
    logout(): void {
        let refresh = localStorage.getItem('refresh');
        let access = localStorage.getItem('access');
        if (refresh && access) {
            refresh = this.secureStorageService.getToken(refresh);
            access = this.secureStorageService.getToken(access);
            this.loginService.logout(refresh, access).then(async () => {
                localStorage.clear();
                this.typeUser = null;
                this.connected = false;
                await this.router.navigate(['/landing/home']);
            }).catch((error) => console.log(error));
        }
    }
    showHideSideBar(event: Event): void {
        event.preventDefault();
        this.show = !this.show;
    }
}
