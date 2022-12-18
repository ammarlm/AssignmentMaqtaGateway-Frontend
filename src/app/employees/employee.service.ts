import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {EmployeeModel} from "./employee.model";
import {PaginationModel} from "../shared/pagination.model";

@Injectable({providedIn: 'root'})
export class EmployeeService {
  constructor(private http: HttpClient) {
  }

  getAllEmployee(page: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('pageSize', pageSize);
    return this.http.get<PaginationModel<EmployeeModel>>(environment.baseUrl + 'api/Employees', {
      params: params
    })
  }

  deleteEmployee(id: number) {
    return this.http.delete(environment.baseUrl + 'api/Employees/' + id)
  }
  getEmployee(id:number){
    return this.http.get<EmployeeModel>(environment.baseUrl + 'api/Employees/' + id)
  }
  addEmployee(employee:EmployeeModel){
    console.log('add',employee)
    return this.http.post(environment.baseUrl + 'api/Employees',employee)
  }
  updateEmployee(id:number,employee:EmployeeModel){
    return this.http.put(environment.baseUrl + 'api/Employees/' + id,employee)
  }
}
