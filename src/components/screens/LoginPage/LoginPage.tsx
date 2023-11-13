import cn from 'classnames'
import { CSSProperties, FC, useState } from 'react'
import { Logo } from '../../ui/Logo/Logo'
import { LoginForm } from './LoginForm'
import styles from './LoginPage.module.scss'
import { SignUpForm } from './SignUpForm'

export interface ILoginPageProps {
	className?: string
	style?: CSSProperties
}

type Pages = 'login' | 'register'

export const LoginPage: FC<ILoginPageProps> = ({ className, style }) => {
	const [page, setPage] = useState<Pages>('register')

	return (
		<div className={cn(className, styles.page, 'login-page')} style={style}>
			<Logo />

			{page === 'login' ? <LoginForm /> : <SignUpForm />}

			<p onClick={() => setPage(page === 'login' ? 'register' : 'login')}>
				{page === 'login'
					? 'Еще нет аккаунта? Зарегистрируйтесь'
					: 'Уже есть аккаунт?'}
			</p>
		</div>
	)
}
