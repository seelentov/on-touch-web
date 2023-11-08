export class UserMain {
	private id: string
	private name: string
	private img: string | '/users/no-img.png'
	private birth: string
	private email: string
	private nickname: string
	private bio: string | ''

	constructor(dt: UserMain) {
		this.id = dt.id.trim()
		this.name = dt.name.trim()
		this.img = dt.img?.trim() || '/users/no-img.png'
		this.birth = dt.birth.trim()
		this.email = dt.email.trim()
		this.nickname = dt.nickname.trim()
		this.bio = dt.bio?.trim() || ''
	}

	getAccountInfo() {
		return {
			name: this.name,
			img: this.img,
			birth: this.birth,
			email: this.email,
			nickname: this.nickname,
			bio: this.bio,
		}
	}

	getDialogInfo() {
		return {
			img: this.img,
			nickname: this.nickname,
		}
	}

	getId() {
		return this.id
	}
}
