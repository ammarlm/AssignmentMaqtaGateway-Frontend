import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from "./auth.component";
import {AuthService} from "./auth.service";
import {AuthRoutingModule} from "./auth-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
  ],
  providers: []
})
export class AuthModule {
}
