
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../http-interceptors/token.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
