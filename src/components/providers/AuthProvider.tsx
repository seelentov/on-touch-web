import { FC, PropsWithChildren, useMemo } from 'react'
import { useStoreBy } from '../../hooks/useStoreBy'
import { LoginPage } from '../screens/LoginPage/LoginPage'

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const user = useStoreBy('user')

  const renderedContent = useMemo(() => {
    return user.id ? children : <LoginPage />
  }, [user.id, children])

  return <>{renderedContent}</>
}