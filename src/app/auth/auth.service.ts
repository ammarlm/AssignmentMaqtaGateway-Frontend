import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Subject, tap, throwError} from "rxjs";
import {UserMoldel} from "./user.moldel";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

export interface AuthResponseData {
  username: string;
  token: string;
  expiredInMinute: number;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  loginUser: BehaviorSubject<UserMoldel | null> = new BehaviorSubject<UserMoldel | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }


  login(username: string, password: string) {
    return this.http.post<AuthResponseData>(environment.baseUrl + 'api/users/login',
      {
        username: username,
        password: password
      }).pipe(tap(res => {
      this.handleAuth(res);
    }));
  }

  logout() {
    this.loginUser.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer)
      clearTimeout(this.tokenExpirationTimer);

    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    let userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    let userJson: {
      email: string,
      _token: string,
      _tokenExpiredDate: Date
    } = JSON.parse(userData);
    let user = new UserMoldel(userJson.email, userJson._token, userJson._tokenExpiredDate);
    if (user.token) {
      this.loginUser.next(user);
      this.autoLogout(new Date(userJson._tokenExpiredDate).getTime() - new Date().getTime());
    }
  }

  autoLogout(expirationDuration: number) {
    console.log('expirationDuration', expirationDuration)
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuth(res: AuthResponseData) {
    const expired = (res.expiredInMinute) * 60 * 1000;
    const expiredDate = new Date(new Date().getTime() + expired);
    const user = new UserMoldel(res.username, res.token, expiredDate);
    this.loginUser.next(user);
    this.autoLogout(expired);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
