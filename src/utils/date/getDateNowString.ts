type getDateNowStringBias = {
	year?: number
	month?: number
	day?: number
}

export const getDateNowString = (bias?: getDateNowStringBias) => {
	const today = new Date()
	const day =
		String(today.getDate()).padStart(2, '0') + (bias?.day ? bias.day : '')
	const month =
		String(today.getMonth() + 1).padStart(2, '0') +
		(bias?.month ? bias.month : '')
	const year = bias?.year
		? today.getFullYear() + bias?.year
		: today.getFullYear()

	return year + '-' + month + '-' + day
}
