export class UserCookie{
  constructor(public id?: string, public token?: string){
    this.id = id || ''
    this.token = token || ''
  }

}