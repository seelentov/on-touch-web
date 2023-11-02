export class FormLogin {
  public login: string | ''
  public password: string | ''

  constructor(inputs?: FormLogin){
    this.login = inputs?.login.trim() || ''
    this.password = inputs?.password.trim() || ''
  }
}