import { InputHTMLAttributes, useState } from 'react'
import { FormError } from '../../../consts/FORM_ERRORS'
import { getDateNowString } from '../../../utils/date/getDateNowString'

export interface IFormDateProps extends InputHTMLAttributes<HTMLInputElement> {
	disable?: boolean
	errors?: FormError[]
	errorClassName?: string
}

export const FormDate: React.FC<IFormDateProps> = ({
	disable,
	errors,
	onChange,
	errorClassName,
	...rest
}) => {
	const [active, setActive] = useState<boolean>(false)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (disable || !onChange) return
		setActive(true)
		onChange(event)
	}

	return (
		<div>
			<input
				onChange={handleChange}
				{...rest}
				disabled={disable}
				max={getDateNowString({
					year: -10,
				})}
				min={getDateNowString({
					year: -100,
				})}
				type={active ? 'date' : 'text'}
				onClick={() => setActive(true)}
			/>
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
