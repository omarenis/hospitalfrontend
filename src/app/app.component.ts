import {Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {LoginSignupService} from './services/login-signup.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {SecureStorageService} from './services/secure-storage.service';
import {Connection, ConnectionService} from './services/connection.service';
import {isPlatformBrowser} from '@angular/common';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    @ViewChild('signInModal') signInModal !: ElementRef;
    @ViewChild('form') formModal !: ElementRef;
    @ViewChild('offcanvasExample') canvasModal !: ElementRef;
    title = 'frontendnewversion';
    show = true;
    shown = true;
    validated!: boolean;
    error!: string;
    connected = false;
    name !: string | null;
    familyName !: string | null;
    typeUser !: string | null;
    public = false;
    constructor(private loginService: LoginSignupService, private router: Router, private domSanitizer: DomSanitizer,
                private secureStorageService: SecureStorageService, private connection: ConnectionService,
                @Inject(PLATFORM_ID) private platformId: any) {
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.typeUser = localStorage.getItem('typeUser');
            this.name = localStorage.getItem('name') !== null ? localStorage.getItem('name') : '';
            this.familyName = localStorage.getItem('familyName') !== null ? localStorage.getItem('name') : '';
            this.connected = localStorage.getItem('access') !== null;
            this.shown = localStorage.getItem('typeUser') !== 'parent' && localStorage.getItem('typeUser') !== 'teacher';
            this.public = this.typeUser === null || this.typeUser === 'parent' || this.typeUser === 'teacher';
        }
        this.show = !this.public;
        this.connection.connected$.subscribe((connection: Connection) => {
            this.connected = true;
            this.typeUser = connection.typeUser;
            this.shown = connection.typeUser !== 'parent' && connection.typeUser !== 'teacher';
            this.public  = connection.typeUser === null || connection.typeUser === 'parent' || connection.typeUser === 'teacher';
            this.show = !this.public;
        });
    }

    showHideSideBar($event: MouseEvent): void {
        $event.preventDefault();
        this.show = !this.show;
    }
    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        console.log(event.target.innerWidth);
        if (event.target.innerWidth < window.innerWidth / 2) {
            this.show = false;
        }
    }
    async logout(): Promise<void> {
        let refresh = localStorage.getItem('refresh');
        let access = localStorage.getItem('access');
        if (refresh && access) {
            refresh = this.secureStorageService.getToken(refresh);
            access = this.secureStorageService.getToken(access);
            await this.loginService.logout(refresh, access).then(() => {
                localStorage.clear();
                this.typeUser = null;
                this.connected = false;
                this.shown = false;
                this.public = true;
                this.router.navigate(['/']);
            }).catch((error) => console.log(error));
        }
    }
}
