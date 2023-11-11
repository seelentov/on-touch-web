import { serverTimestamp } from 'firebase/firestore'

type newDialog = {
	id: string
	users: string[]
}

export class Dialog {
	public id: string
	public users: string[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public lastUpd: any
	public lastSenler: string
	public lastMessage: string
	public new?: number

	constructor(dt: newDialog) {
		this.id = dt.id
		this.users = dt.users
		this.lastUpd = serverTimestamp()
		this.lastSenler = ''
		this.lastMessage = ''
		this.new = 0
	}
}
