import { FC, PropsWithChildren, useEffect } from 'react'
import { useActions } from '../../hooks/useActions'
import { useStoreBy } from '../../hooks/useStoreBy'
import { getCookieLogin } from '../../utils/cookie/getCookieLogin'
import { LoginPage } from '../screens/LoginPage/LoginPage'

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const user = useStoreBy('user')
	const { setUser } = useActions()

	useEffect(() => {
		if (getCookieLogin()) {
			setUser(getCookieLogin())
		}
	}, [user])

	return <>{user.id ? children : <LoginPage />}</>
}
