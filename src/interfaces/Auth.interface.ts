export interface IAuth {
  status: boolean;
  userName: string;
  userEmail: string;
  password: string;
}

export interface IAuthBody extends IAuth {
  passConfirm: string;
}
