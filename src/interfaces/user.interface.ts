export interface IUser {
  userName: string;
  userEmail: string;
  password: string;
}

export interface IUserJoi extends IUser {
  passConfirm: string;
}
