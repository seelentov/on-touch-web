export class FormSignUp {
	public name: string | ''
	public password: string | ''
	public confirmPassword: string | ''
	public birth: string | ''
	public email: string | ''
	public nickname: string | ''
	public bio: string | ''

	constructor(dt?: FormSignUp) {
		this.name = dt?.name.trim() || ''
		this.password = dt?.password || ''
		this.confirmPassword = dt?.confirmPassword || ''
		this.birth = dt?.birth || ''
		this.email = dt?.email.trim() || ''
		this.nickname = dt?.nickname.trim() || ''
		this.bio = dt?.bio.trim() || ''
	}
}
