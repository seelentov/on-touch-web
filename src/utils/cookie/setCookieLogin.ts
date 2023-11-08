import Cookies from 'js-cookie'
import { UserCookie } from '../../model/User/UserCookie'

export const setCookieLogin = ({ id, token }: UserCookie): void => {
	if (id && token) {
		Cookies.set('id', id)
		Cookies.set('token', token)
	}
}
