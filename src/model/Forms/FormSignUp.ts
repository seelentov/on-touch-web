import { stringKeys } from "../../types/types"

export class FormSignUp implements stringKeys{
  public name: string | ''
  public password: string | ''
  public confirmPassword: string | ''
  public birth: Date
  public email: string | ''
  public nickname: string | ''
  public bio: string | ''

  constructor(dt?: FormSignUp){
    this.name = dt?.name.trim() || ''
    this.password = dt?.password || ''
    this.confirmPassword = dt?.confirmPassword || ''
    this.birth = dt?.birth || new Date
    this.email = dt?.email.trim() || ''
    this.nickname = dt?.nickname.trim() || ''
    this.bio = dt?.bio.trim() || ''
  }
}