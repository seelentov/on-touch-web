import { ButtonHTMLAttributes, ReactNode } from 'react'
import { FormError } from '../../../consts/FORM_ERRORS'
export interface IFormButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	errors?: FormError[]
	errorClassName?: string
  disable?: boolean
  wrapperClassName?: string
}

export const FormButton: React.FC<IFormButtonProps> = ({
	errors,
	errorClassName,
	children,
  disable,
  wrapperClassName,
	...rest
}) => {
	return (
		<div className={wrapperClassName}>
			<button {...rest} disabled={disable}>{children}</button>
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
