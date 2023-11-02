import cn from 'classnames'
import { InputHTMLAttributes } from 'react'
import { FormError } from '../../../types/form'
import styles from './Form.module.scss'

export interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	disable?: boolean
	error?: FormError
	errorClassName?: string
}

export const FormInput: React.FC<IFormInputProps> = ({
	disable,
	error,
	onChange,
	errorClassName,
	...rest
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (disable || !onChange) return
		onChange(event)
	}

	return (
		<div className={styles.input}>
			<input onChange={handleChange} {...rest} disabled={disable} />
			{error?.invalid && (
				<p className={cn(errorClassName, styles.err)}>{error.text}</p>
			)}
		</div>
	)
}
