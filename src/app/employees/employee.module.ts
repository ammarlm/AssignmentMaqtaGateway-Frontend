import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeRoutingModule} from "./employee-routing.module";
import {EmployeesComponent} from "./employees.component";
import {EditEmployeeComponent} from "./edit/edit-employee.component";
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {EmployeeListComponent} from "./employee-list/employee-list.component";


@NgModule({
  declarations: [
    EmployeesComponent,
    EditEmployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule {
}
