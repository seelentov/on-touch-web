export class Message {
	public id: string
	public user: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public createAt: any
	public dialogId: string
	public text: string
	public type: MessageType

	constructor(dt: NewMessage) {
		this.id = dt.id
		this.dialogId = dt.dialogId
		this.user = dt.user
		this.createAt = dt.createAt
		this.text = dt.text
		this.type = dt.type || 'text'
	}
}

type NewMessage = {
	id: string
	user: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	createAt: any
	dialogId: string
	text: string
	type?: MessageType
}

type MessageType = 'text' | 'img'
