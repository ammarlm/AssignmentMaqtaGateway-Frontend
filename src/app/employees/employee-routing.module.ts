import {NgModule} from "@angular/core";
import {AuthComponent} from "../auth/auth.component";
import {CommonModule} from "@angular/common";
import {AuthRoutingModule} from "../auth/auth-routing.module";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {EmployeesComponent} from "./employees.component";
import {EditEmployeeComponent} from "./edit/edit-employee.component";
import {AuthGuard} from "../auth/auth.guard";
import {EmployeeListComponent} from "./employee-list/employee-list.component";


const routes: Routes = [
  {
    path: '', component: EmployeesComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: EmployeeListComponent },
    ]
  },
  {path: ':id/edit', component: EditEmployeeComponent },
  {path: 'create', component: EditEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}

