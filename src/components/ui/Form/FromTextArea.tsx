import cn from 'classnames'
import { TextareaHTMLAttributes } from 'react'
import { FormError } from '../../../types/form'
import styles from './Form.module.scss'

export interface IFormTextAreaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	disable?: boolean
	error?: FormError
	errorClassName?: string
}

export const FormTextArea: React.FC<IFormTextAreaProps> = ({
	disable,
	error,
	onChange,
	errorClassName,
	...rest
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (disable || !onChange) return
		onChange(event)
	}

	return (
		<div className={styles.textarea}>
			<textarea onChange={handleChange} {...rest} disabled={disable} />
			{error?.invalid && (
				<p className={cn(errorClassName, styles.err)}>{error.text}</p>
			)}
		</div>
	)
}
