import cn from 'classnames'
import { CSSProperties, FC, useState } from 'react'
import styles from './LoginPage.module.scss'

export interface ILoginPageProps {
	className?: string
	style?: CSSProperties
}

type Pages = 'login' | 'register' | 'confirm'

export const LoginPage: FC<ILoginPageProps> = ({ className, style }) => {
	const [page, setPage] = useState<Pages>('login')

	return <div className={cn(className, styles.block)} style={style}>
  </div>
}
