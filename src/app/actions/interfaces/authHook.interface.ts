import { IEmployee } from "@/types/employee/employee";

export interface IAuthenticateData {
  taxId: string;
  password: string;
}

export interface IAuthenticateReturn {
  token: string;
  employee: IEmployee;
}
