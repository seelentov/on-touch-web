export class UserSignUp{
  private name: string | ''
  private password: string | ''
  private confirmPassword: string | ''
  private birth: string | ''
  private email: string | ''
  private nickname: string | ''
  private bio: string | ''

  constructor(dt?: UserSignUp){
    this.name = dt?.name || ''
    this.password = dt?.password || ''
    this.confirmPassword = dt?.confirmPassword || ''
    this.birth = dt?.birth || ''
    this.email = dt?.email || ''
    this.nickname = dt?.nickname || ''
    this.bio = dt?.bio || ''
  }

  get(){
    return this
  }
}