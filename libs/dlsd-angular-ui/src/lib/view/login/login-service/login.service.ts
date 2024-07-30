import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Account,
  AccountId,
  AccountLoginFormData,
  AccountRegisterFormData,
} from '../interfaces';

export const LOGIN_API_URL_TOKEN = new InjectionToken<string>(
  'Login Api Url Token'
);

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private account: AccountId | null = null;

  constructor(
    @Inject(LOGIN_API_URL_TOKEN) private apiUrl: string,
    private httpClient: HttpClient
  ) {}

  public login$(form: AccountLoginFormData): Observable<Account> {
    return this.httpClient
      .post<Account>(`${this.apiUrl}/login`, form)
      .pipe(map((response) => (this.account = { id: response.id })));
  }

  public register$(form: AccountRegisterFormData): Observable<Account> {
    return this.httpClient.post<Account>(`${this.apiUrl}/register`, form);
  }

  public logout(): void {
    this.account = null;
  }
}
