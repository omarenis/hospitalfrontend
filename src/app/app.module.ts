import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {CardComponent} from './components/card/card.component';
import {CustomCardComponent} from './components/custom-card/custom-card.component';
import {ResponsesComponent} from './components/responses/responses.component';
import {ConsultationsComponent} from './screens/dashboard/consultations/consultations.component';
import {MessagesComponent} from './screens/dashboard/messages/messages.component';
import {PatientsComponent} from './screens/dashboard/patients/patients.component';
import {PatientsIdComponent} from './screens/dashboard/patients-id/patients-id.component';
import {ProfileComponent} from './screens/dashboard/profile/profile.component';
import {UsersComponent} from './screens/dashboard/users/users.component';
import {FormIdComponent} from './screens/form/form-id/form-id.component';
import {OrientationComponent} from './screens/form/orientation/orientation.component';
import {PatientComponent} from './screens/form/patient/patient.component';
import {LandingComponent} from './screens/landing/landing.component';
import {AboutComponent} from './screens/landing/about/about.component';
import {HomeComponent} from './screens/landing/home/home.component';
import {HowtoComponent} from './screens/landing/howto/howto.component';
import {JoinComponent} from './screens/landing/join/join.component';
import {YouKnowComponent} from './screens/landing/you-know/you-know.component';
import {NotFoundComponent} from './screens/not-found/not-found.component';
import {SignupComponent} from './screens/signup/signup.component';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AuthenticatedGuard} from './authguard/authenticated.guard';
import {IsadminGuard} from './authguard/is-admin.guard';
import {MessageReplayComponent} from './screens/dashboard/messages/message-replay/message-replay.component';
import {IsdoctorGuard} from './authguard/is-doctor.guard';
import {NotfoundComponent} from './screens/notfound/notfound.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationInterceptor} from './interceptors/authentication.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './screens/login/login.component';
import {DashboardComponent} from './screens/dashboard/dashboard.component';
import {DiagnosticComponent} from './screens/dashboard/consultations/diagnostic/diagnostic.component';

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
};
const routes: Routes = [
    {
        path: '', redirectTo: '/landing/home', pathMatch: 'full'
    },
    {
        path: 'orientation', component: OrientationComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'form',
        children: [
            {
                path: ':typeUser', redirectTo: '/form/:typeUser/patient', pathMatch: 'full'
            },
            {
                path: ':typeUser/patient', component: PatientComponent
            },
            {
                path: ':typeUser/:id', component: FormIdComponent,
            },
        ],
    },
    {
        path: 'landing', component: LandingComponent,
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home', component: HomeComponent
            },
            {
                path: 'howto', component: HowtoComponent
            },
            {
                path: 'about', component: AboutComponent
            },
            {
                path: 'join', component: JoinComponent
            },
            {
                path: 'orientation/:patientId', component: OrientationComponent
            }
        ],
    },
    {
        path: 'profile', component: ProfileComponent, canActivate: [AuthenticatedGuard]
    },
    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            {
                path: '', redirectTo: 'users', pathMatch: 'full'
            },
            {
                path: 'users', component: UsersComponent, canActivate: [AuthenticatedGuard]
            },
            {
                path: 'messages', canActivate: [AuthenticatedGuard],
                children: [
                    {path: '', component: MessagesComponent},
                    {path: ':id', component: MessageReplayComponent}
                ]
            },
            {
                path: 'patients', canActivate: [AuthenticatedGuard],
                children: [
                    {
                        path: '', component: PatientsComponent
                    },
                    {
                        path: ':id', component: PatientsIdComponent
                    }
                ]
            },
            {
                path: 'rendez-vous', canActivate: [AuthenticatedGuard],
                children: [
                    {
                        path: '', component: ConsultationsComponent
                    },
                    {
                        path: ':id/:action', component: DiagnosticComponent, canActivate: [IsdoctorGuard]
                    }
                ]
            }
        ],
    },
    {
        path: '**', component: NotfoundComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        MessageReplayComponent,
        CardComponent,
        CustomCardComponent,
        ResponsesComponent,
        ConsultationsComponent,
        MessagesComponent,
        PatientsComponent,
        PatientsIdComponent,
        ProfileComponent,
        UsersComponent,
        FormIdComponent,
        OrientationComponent,
        LandingComponent,
        AboutComponent,
        HomeComponent,
        HowtoComponent,
        JoinComponent,
        YouKnowComponent,
        NotFoundComponent,
        SignupComponent,
        DiagnosticComponent,
        LoginComponent,
        DashboardComponent,
        PatientComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        ReactiveFormsModule,
        RouterModule.forRoot(routes, routerOptions),
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [
        AuthenticatedGuard, IsdoctorGuard, IsadminGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        },
        FormsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
