import { useState } from 'react'
import { Form } from '../../ui/Form/Form'
import { FormInput } from '../../ui/Form/FormInput'

import { FormLogin } from '../../../model/Forms/FormLogin'
import { FormButton } from '../../ui/Form/FormButton'

export const LoginForm = () => {
	const [form, setForm] = useState<FormLogin>(new FormLogin())
	const [error, setError] = useState<boolean>(false)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<Form
			handleSubmit={handleSubmit}
			className='form-column'
			values={form}
			setValues={setForm}
		>
			<FormInput
				name='login'
				placeholder='Логин'
				type='text'
				className='input-black'
			/>
			<FormInput
				name='password'
				type='password'
				placeholder='Пароль'
				className='input-black'
				errorClassName='text-err'
			/>
			<FormButton
				errorClassName='text-err'
				error={{ invalid: error, text: 'Неверный логин или пароль' }}
				className='input-black'
			>
				Войти
			</FormButton>
		</Form>
	)
}
