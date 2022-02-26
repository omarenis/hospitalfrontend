import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from '../models/person';
import {environment} from '../../environments/environment';
export interface Token{
    access: string;
    refresh: string;
    userId: number;
    typeUser: string;
    name: string;
    familyName: string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  path = `${environment.url}/api/persons`;

    constructor(private httpClient: HttpClient) {}

    public login(loginNumber: string, password: string): Promise<Token> {
        return this.httpClient.post<Token>(`${this.path}/login`, {loginNumber, password}).toPromise();
    }

    public signup(person: Person): Promise<void> {
        return this.httpClient.post<void>(`${this.path}/signup`, person).toPromise();
    }

    public logout(refresh: string, access: string): Promise<void> {
        return this.httpClient.post<void>(`${this.path}/logout`, {refresh}, {
            headers: {
                Authorization: `Bearer ${access}`
            }
        }).toPromise();
    }
}
