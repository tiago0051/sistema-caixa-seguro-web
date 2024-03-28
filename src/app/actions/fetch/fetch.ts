import { cookies } from "next/headers";
import { FETCH_METHOD } from "./fetch.interface";
import { FetchException } from "./fetchException";

class FetchAPI {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  constructor() {}

  async execute<T = any>(
    endpoint: string,
    method: FETCH_METHOD,
    body?: any
  ): Promise<T> {
    try {
      const authToken = (await cookies().get("Authorization")?.value) || "";

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      });

      const json = await response.json();

      if (response.status.toString()[0] !== "2")
        throw new FetchException(response.status, json);

      return json;
    } catch (error) {
      throw error;
    }
  }

  setAuthToken = (authToken: string) => {
    cookies().set("auth-scs", authToken);
  };
}

export const fetchApi = new FetchAPI();
