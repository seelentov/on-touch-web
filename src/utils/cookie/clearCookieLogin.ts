import Cookies from 'js-cookie'

export const clearCookieLogin = () => {
	Cookies.remove('id')
	Cookies.remove('token')
}
