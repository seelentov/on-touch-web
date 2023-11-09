
export class Message {
	public id: string
	public user: string
	public createAt: number
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