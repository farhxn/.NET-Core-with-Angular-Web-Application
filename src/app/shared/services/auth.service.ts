import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.development';
import { TOKEN_KEY } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  createUser(formData: any) {
    formData.role = "Student"
    formData.gender = "Male"
    formData.age = 35
    return this.http.post(this.url + '/signup', formData);
  }


  signin(formData: any) {
    return this.http.post(this.url + '/signin', formData);
  }

  isLoggedIn(){
    return localStorage.getItem(TOKEN_KEY) != null ? true :false
  }

  getToken(){
    return localStorage.getItem(TOKEN_KEY)
  }

  deleteToken(){
    localStorage.removeItem(TOKEN_KEY)
  }

  saveToken(token:string){
    localStorage.setItem(TOKEN_KEY,token)
  }

  getClaims(){
    return JSON.parse(window.atob(this.getToken()!.split('.')[1]))
  } 
}
