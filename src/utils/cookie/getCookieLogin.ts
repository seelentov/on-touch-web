import Cookies from 'js-cookie'
import { UserCookie } from '../../model/User/UserCookie'

export const getCookieLogin = (): UserCookie => {
	return {
		id: Cookies.get('id'),
		token: Cookies.get('token'),
	}
}
