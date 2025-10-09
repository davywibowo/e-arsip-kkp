export interface ResponsePayload<T = unknown> {
  status: "success" | "failed";
  message: string;
  statusCode: number;
  data?: T;
}

export interface DataSignup {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}
