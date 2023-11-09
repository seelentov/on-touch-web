type newDialog = {
	id: string
	users: string[]
}

export class Dialog {
	public id: string
	public users: string[]
	public lastUpd: number
	public lastSenler: string
	public lastMessage: string
	public new?: number

	constructor(dt: newDialog) {
		this.id = dt.id
		this.users = dt.users
		this.lastUpd = 0
		this.lastSenler = ''
		this.lastMessage = ''
		this.new = 0
	}
}
