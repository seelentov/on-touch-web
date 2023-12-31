import { TextareaHTMLAttributes } from 'react'
import { FormError } from '../../../consts/FORM_ERRORS'

export interface IFormTextAreaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	disable?: boolean
	errors?: FormError[]
	errorClassName?: string
  wrapperClassName?: string
}

export const FormTextArea: React.FC<IFormTextAreaProps> = ({
	disable,
	errors,
	onChange,
	errorClassName,
  wrapperClassName,
	...rest
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (disable || !onChange) return
		onChange(event)
	}

	return (
		<div className={wrapperClassName}>
			<textarea onChange={handleChange} {...rest} disabled={disable} />
			{errors?.map(
				(error: FormError, key: number) =>
					error.invalid && (
						<p key={key} className={errorClassName}>
							{error.text}
						</p>
					)
			)}
		</div>
	)
}
