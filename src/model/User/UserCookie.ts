export class UserCookie{
  constructor(private id?: string, private token?: string){
    this.id = id || ''
    this.token = token || ''
  }

  get(){
    return this
  }
}