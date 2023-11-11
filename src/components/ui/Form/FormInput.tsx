import { InputHTMLAttributes } from 'react'
import { FormError } from '../../../consts/FORM_ERRORS'

export interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	disable?: boolean
	errors?: FormError[]
	errorClassName?: string
  wrapperClassName?: string
}

export const FormInput: React.FC<IFormInputProps> = ({
	disable,
	errors,
	onChange,
	errorClassName,
  wrapperClassName,
	...rest
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (disable || !onChange) return
		onChange(event)
	}

	return (
		<div className={wrapperClassName}>
			<input onChange={handleChange} {...rest} disabled={disable} />
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
