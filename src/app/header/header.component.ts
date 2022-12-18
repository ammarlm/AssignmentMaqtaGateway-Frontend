import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {UserMoldel} from "../auth/user.moldel";


@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();

  collapsed = true;
  private userSub!: Subscription;
  user?: UserMoldel;
  isAuth: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.loginUser.subscribe(userData => {
      this.user = userData ? userData : undefined;
      this.isAuth = !!userData;
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onLogout() {
    this.authService.logout();
  }
}
