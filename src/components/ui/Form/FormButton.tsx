import { ButtonHTMLAttributes, ReactNode } from 'react'
import { FormError } from '../../../types/form'
import styles from './Form.module.scss'
export interface IFormButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	error?: FormError
	errorClassName?: string
}

export const FormButton: React.FC<IFormButtonProps> = ({
	error,
	errorClassName,
	children,
	...rest
}) => {
	return (
		<div className={styles.button}>
			<button {...rest}>{children}</button>
			{error?.invalid && <p className={errorClassName}>{error.text}</p>}
		</div>
	)
}
