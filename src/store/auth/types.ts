export interface IUser {
  email: string
  password: string
  role: string
}
export interface IUserState {
  authUser?: IUser | undefined
}
