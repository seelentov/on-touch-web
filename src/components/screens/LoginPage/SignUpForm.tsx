import { useState } from 'react'
import { Form } from '../../ui/Form/Form'
import { FormInput } from '../../ui/Form/FormInput'

import { FormSignUp } from '../../../model/Forms/FormSignUp'
import { FormButton } from '../../ui/Form/FormButton'
import { FormTextArea } from '../../ui/Form/FromTextArea'
import { Loading } from '../../ui/Loading/Loading'

export const SignUpForm = () => {
	const [form, setForm] = useState<FormSignUp>(new FormSignUp())
	const [errors, setErrors] = useState<string[] | []>([])
	const [loading, setLoading] = useState<boolean>(false)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (loading) return

		console.log('123')
	}

	return (
		<>
			{loading && <Loading />}
			<Form
				handleSubmit={handleSubmit}
				className='form-column'
				values={form}
				setValues={setForm}
			>
				<FormInput
					name='name'
					placeholder='Ваше имя'
					type='text'
					className='input-black'
					errorClassName='text-err'
					error={{ invalid: false, text: 'Неверный логин или пароль' }}
				/>
				<FormInput
					name='nickname'
					placeholder='Отображаемый логин'
					type='text'
					className='input-black'
					errorClassName='text-err'
					error={{ invalid: false, text: 'Неверный логин или пароль' }}
				/>
				<FormInput
					name='email'
					placeholder='Ваш e-mail'
					type='email'
					className='input-black'
					errorClassName='text-err'
					error={{ invalid: false, text: 'Неверный логин или пароль' }}
				/>
				<FormInput
					name='Придумайте надежный пароль'
					placeholder='Email'
					type='password'
					className='input-black'
					errorClassName='text-err'
					error={{ invalid: false, text: 'Неверный логин или пароль' }}
				/>
				<FormInput
					name='confirmPassword'
					placeholder='Подтвердите пароль'
					type='password'
					className='input-black'
					errorClassName='text-err'
					error={{ invalid: false, text: 'Неверный логин или пароль' }}
				/>
				<FormTextArea
					name='bio'
					placeholder='Напишите кратко о себе или оставьте поле пустым'
					className='textarea-black'
					errorClassName='text-err'
					error={{ invalid: false, text: 'Неверный логин или пароль' }}
				/>
				<FormButton className='input-black'>Войти</FormButton>
			</Form>
		</>
	)
}
