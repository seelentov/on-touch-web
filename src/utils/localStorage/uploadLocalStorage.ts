export const uploadLocalStorage = (item: string, value: object) => {
	localStorage.setItem(item, JSON.stringify(value))
}
