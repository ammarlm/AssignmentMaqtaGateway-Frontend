import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.loginUser.pipe(take(1), exhaustMap(user => {
      console.log(user);
      if (!user)
        return next.handle(req);

      const token = user != null ? user.token ? user.token : '' : '';
      const newReq = req.clone({headers: new HttpHeaders().set('Authorization', 'Bearer ' +token)});
      return next.handle(newReq);
    }))
  }

}
