enum MaritalStatusEnum {
  Single = 0,
  Married = 1,
  Divorced = 2,
}

enum GenderEnum {
  Male = 0,
  Female = 1,
}

export class EmployeeModel {
  constructor(public id: number,
              public fullName: string,
              public address: string,
              public phoneNumber: string,
              public email: string,
              // public identificationNumber: string,
              // public salary: number,
              // public maritalStatus: MaritalStatusEnum,
              // public gender: GenderEnum,
              ) {
  }
}
