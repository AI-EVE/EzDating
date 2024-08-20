import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from './_models/user';
import { map } from 'rxjs';
import { RegisterUser } from './_models/registerUser';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http: HttpClient = inject(HttpClient);
  currentUser = signal<User | null>(null);
  baseUrl: string = 'https://localhost:5001/api/';

  login(model: User) {
    return this.http.post<User>(`${this.baseUrl}account/login`, model).pipe(
      map((response) => {
        this.setCurrentUser(response);
        return response;
      })
    );
  }

  register(registerInfo: RegisterUser) {
    return this.http
      .post<User>(`${this.baseUrl}account/register`, registerInfo)
      .pipe(
        map((response) => {
          this.setCurrentUser(response);
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
  }

  setCurrentUser(response: User) {
    localStorage.setItem('currentUser', JSON.stringify(response));
    this.currentUser.set(response);
  }
}
