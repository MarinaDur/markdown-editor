export interface UserLogin {
  email: string | null;
  password: string | null;
}

export interface UserSignUp {
  userName: string | null;
  email: string | null;
  password: string | null;
  passwordConfirm: string | null;
}
