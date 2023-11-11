import React, {
	ChangeEvent,
	FormHTMLAttributes,
	ReactElement,
	ReactNode,
	useCallback,
} from 'react'

export type FormValues = object & {[key: string]: string}
export interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
	children: ReactNode
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	values: FormValues
	setValues: React.Dispatch<React.SetStateAction<FormValues>>
}

export const Form = function ({
	children,
	handleSubmit,
	values,
	setValues,
	...rest
}: IFormProps) {
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setValues({ ...values, [e.target.name]: e.target.value })
		},
		[values, setValues]
	)

	return (
		<form onSubmit={e => handleSubmit(e)} {...rest}>
			{children && (
				<>
					{React.Children.map(
						children as ReactElement[],
						(child: ReactElement) => {
							return React.cloneElement(child, {
								value: values[child.props.name],
								selected:
									child.props.name === 'birth' ? values[child.props.name] : '',
								onChange: (
									e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
								) => handleChange(e),
							})
						}
					)}
				</>
			)}
		</form>
	)
}
