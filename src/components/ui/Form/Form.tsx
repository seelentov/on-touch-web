import cn from 'classnames'
import React, {
	CSSProperties,
	ChangeEvent,
	ReactElement,
	ReactNode,
	useCallback,
} from 'react'
import { stringKeys } from '../../../types/types'
import styles from './Form.module.scss'

export interface IFormProps<T> {
	className?: string
	style?: CSSProperties
	children: ReactNode
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	values: T & stringKeys
	setValues: React.Dispatch<React.SetStateAction<T>>
}

export const Form = function <T>({
	className,
	style,
	children,
	handleSubmit,
	values,
	setValues
}: IFormProps<T>) {
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setValues({ ...values, [e.target.name]: e.target.value })
		},
		[values, setValues]
	)

	return (
		<form
			className={cn(className, styles.form)}
			style={style}
			onSubmit={e => handleSubmit(e)}
		>
			{children && (
				<>
					{React.Children.map(
						children as ReactElement[],
						(child: ReactElement) =>
							React.cloneElement(child, {
								value: values[child.props.name],
								onChange: (
									e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
								) => handleChange(e),
							})
					)}
				</>
			)}
		</form>
	)
}
