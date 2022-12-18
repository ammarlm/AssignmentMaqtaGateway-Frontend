import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.loginUser.pipe(
      take(1),
      map(user => {
        const isAuth = user?.token ? true : false;
        if (isAuth)
          return true;

        return this.router.createUrlTree(['auth']);
      }));
    // return this.authService.loginUser.pipe(map(user => {
    //   return user?.token ? true : false;
    // }), tap(isAuth => {
    //   if (!isAuth) {
    //     this.router.navigate(['auth'])
    //   }
    // }));
  }

}
