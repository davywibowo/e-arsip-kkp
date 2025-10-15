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
  id: string;
  name: string;
  username: string;
  role: "USER" | "ADMIN";
}

export interface DataPegawai {
  id: string;
  namaPegawai: string;
  nipLama: string;
  nipBaru: string;
  noArsip: string;
}

