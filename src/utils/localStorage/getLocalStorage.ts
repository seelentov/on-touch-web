export const getLocalStorage = (item: string) => {
	if (localStorage.getItem(item)) {
		return JSON.parse(localStorage.getItem(item) || '')
	}
	return false
}
