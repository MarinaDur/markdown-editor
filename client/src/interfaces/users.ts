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

export interface Email {
  email: string | null;
}

export interface ResetToken {
  token: string | undefined;
  password: string | null;
  passwordConfirm: string | null;
}
