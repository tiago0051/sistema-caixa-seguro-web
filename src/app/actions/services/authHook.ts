"use server";
import { fetchApi } from "@/app/actions/fetch/fetch";
import {
  IAuthenticateData,
  IAuthenticateReturn,
} from "../interfaces/authHook.interface";
import { IEmployee } from "@/types/employee/employee";

export async function authenticateAction(
  prevState: IEmployee | null,
  data: IAuthenticateData
) {
  const authenticateResponse = await fetchApi.execute<IAuthenticateReturn>(
    "/auth/login",
    "POST",
    data
  );

  fetchApi.setAuthToken(authenticateResponse.token);

  return authenticateResponse.employee;
}
