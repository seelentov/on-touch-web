export class UserMain {
  private id: string
  private name: string
  private img: string
  private birth: number
  private email: string
  private nickname: string
  private bio: string

  constructor(dt: UserMain){
  this.id = dt.id
  this.name = dt.name
  this.img = dt.img
  this.birth = dt.birth
  this.email = dt.email
  this.nickname = dt.nickname
  this.bio = dt.bio
  }

  getAccountInfo(){
    return {
      name: this.name,
      img: this.img,
      birth: this.birth,
      email: this.email,
      nickname: this.nickname,
      bio: this.bio
    }
  }

  getDialogInfo(){
    return {
      img: this.img,
      nickname: this.nickname,
    }
  }

  getId(){
    return this.id
  }
}