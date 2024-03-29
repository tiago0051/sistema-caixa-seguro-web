export interface ActionResponse<T = any> {
  error?: {
    status: number;
    message: string;
  };
  response?: T;
}
