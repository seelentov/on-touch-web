export class Message {
	public id: string
	public user: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public createAt: any
	public dialogId: string
	public text: string

	constructor(dt: Message) {
		this.id = dt.id
		this.dialogId = dt.dialogId
		this.user = dt.user
		this.createAt = dt.createAt
		this.text = dt.text
	}
}
