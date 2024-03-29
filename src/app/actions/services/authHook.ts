"use server";
import { fetchApi } from "@/app/actions/fetch/fetch";
import {
  IAuthenticateData,
  IAuthenticateReturn,
} from "../interfaces/authHook.interface";
import { IEmployee } from "@/types/employee/employee";
import { FetchException } from "../fetch/fetchException";
import { ActionResponse } from "../interfaces/action.interface";

export async function authenticateAction(
  prevState: ActionResponse<IEmployee>,
  data: FormData
): Promise<ActionResponse<IEmployee>> {
  const taxId = data.get("taxId");
  const password = data.get("password");

  const body = {
    taxId: taxId?.toString().replace(/[^0-9]/g, ""),
    password,
  };

  try {
    const authenticateResponse = await fetchApi.execute<IAuthenticateReturn>(
      "/auth/login",
      "POST",
      body
    );

    fetchApi.setAuthToken(authenticateResponse.token);

    return {
      response: authenticateResponse.employee,
    };
  } catch (error) {
    if (error instanceof FetchException) {
      return {
        error: {
          status: error.status,
          message: error.response.message,
        },
      };
    }

    throw error;
  }
}
