import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { TOKEN_KEY } from '../constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = environment.apiBaseUrl;

  getUserProfile() {

    return this.http.get(this.url + '/userprofile');
  }
}
