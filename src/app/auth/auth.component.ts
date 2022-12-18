import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLogging = true;
  isLoading = false;
  error: string = "";

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.isLogging = !this.isLogging;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid)
      return;
    this.isLoading = true;
    let userData = {
      username: authForm.value['username'],
      password: authForm.value['password'],
    }
    console.log(userData)
    this.authService.login(userData.username, userData.password).subscribe(response => {
      console.log(response)
      this.isLoading = false;
      this.router.navigate(['/']);
    }, error => {
      this.error = error;
      this.isLoading = false;
    })
    authForm.reset();
  }
}
