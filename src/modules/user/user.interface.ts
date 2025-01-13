export interface IUser {
  fullName?: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  status: 'active' | 'blocked';
}

export interface ILogin {
  email: string;
  password: string;
}
