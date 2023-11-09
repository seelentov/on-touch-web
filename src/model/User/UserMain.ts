export class UserMain {
	public id: string
	public name: string
	public img: string | '/users/no-img.png'
	public birth: string
	public email: string
	public nickname: string
	public bio: string | ''

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
      id: this.id,
			name: this.name,
			img: this.img,
			birth: this.birth,
			email: this.email,
			nickname: this.nickname,
			bio: this.bio,
		}
	}

	getNickname() {
		return this.nickname
	}

  getImage() {
		return this.img
	}

	getId() {
		return this.id
	}
}
