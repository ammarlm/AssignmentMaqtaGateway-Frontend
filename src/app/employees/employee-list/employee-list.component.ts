import {Component, OnInit} from '@angular/core';
import {EmployeeModel} from "../employee.model";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationModel} from "../../shared/pagination.model";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeModel[] = [];
  page: number = 1;
  pageSize: number = 3;
  total!: number;
  pagination!: PaginationModel<EmployeeModel>;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  onCreate() {
    this.router.navigate(['create'], {relativeTo: this.route})
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(emp => {
      this.getAllEmployee();
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getAllEmployee();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllEmployee();
  }

  private getAllEmployee() {
    this.employeeService.getAllEmployee(this.page, this.pageSize).subscribe(response => {
      this.pagination = response;
    })
  }

}
