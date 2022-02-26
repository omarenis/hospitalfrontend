import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationInterceptor} from './authentication.interceptor';

export const httpInterceptorsProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
];
