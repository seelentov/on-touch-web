import { FC, PropsWithChildren, useEffect } from 'react'
import { useActions } from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'
import { getCookieLogin } from '../../utils/cookie/getCookieLogin'
import { LoginPage } from '../screens/LoginPage/LoginPage'
//import { clearCookieLogin } from '../../utils/cookie/clearCookieLogin';   clearCookieLogin()

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const user = useAuth()
	const { setUser } = useActions()

	useEffect(() => {
		if (getCookieLogin()) {
			setUser(getCookieLogin())
		}
	}, [user])


	return <>{user ? children : <LoginPage />}</>
}
