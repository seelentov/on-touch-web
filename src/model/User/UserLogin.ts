export class UserLogin {
  private login: string | ''
  private password: string | ''

  constructor(inputs?: UserLogin){
    this.login = inputs?.login || ''
    this.password = inputs?.password || ''
  }

  get(){
    return this
  }
}