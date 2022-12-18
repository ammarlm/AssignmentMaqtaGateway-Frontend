import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {EmployeeModel} from "../employee.model";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-edit',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  editMode: boolean = false;
  editForm!: FormGroup;
  id!: number;
  employee?: EmployeeModel;
  ob?: Observable<any>;
  error?: string;

  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode)
      if (this.editMode)
        this.getEmployee(this.id);

      this.initForm();
    });
  }

  onSave() {
    console.log(this.editForm.value);
    if (!this.editForm.valid)
      return;
    let emp = {...this.editForm.value, 'phoneNumber': this.editForm.value['phoneNumber'].toString()}
    if (this.editMode) {
      this.ob = this.employeeService.updateEmployee(this.id, emp);
    } else {
      this.ob = this.employeeService.addEmployee(emp);
    }

    this.ob.subscribe(response => {
      this.router.navigate(['../']);
    }, error => {
      this.error = error.message;
    })
  }

  onGoBack() {
    this.router.navigate(['../'])
  }

  private initForm() {
    console.log('form', this.employee)
    this.editForm = new FormGroup({
      fullName: new FormControl(this.employee?.fullName, Validators.required),
      address: new FormControl(this.employee?.address, Validators.required),
      email: new FormControl(this.employee?.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.employee?.phoneNumber,
        [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    });
  }

  private getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(emp => {
      this.employee = emp;
      this.initForm();
    })
  }
}
