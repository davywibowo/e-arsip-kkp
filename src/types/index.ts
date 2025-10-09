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

export interface DataLogin {
  username: string;
  password: string;
}

export interface DataUser {
  name: string;
  username: string;
}
