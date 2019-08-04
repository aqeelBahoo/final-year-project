import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userData = new BehaviorSubject({});

  constructor() { }

  public setToken(token) {
    localStorage.setItem('token', token);
  }

  public clearToken() {
    localStorage.removeItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  private getLocalData() {
    return JSON.parse(localStorage.getItem('loads'));
  }

}
