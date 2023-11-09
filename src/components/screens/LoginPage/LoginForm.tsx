import { useContext, useState } from 'react'
import { Form } from '../../ui/Form/Form'
import { FormInput } from '../../ui/Form/FormInput'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { FORM_ERRORS } from '../../../consts/FORM_ERRORS'
import { useActions } from '../../../hooks/useActions'
import { FormLogin } from '../../../model/Forms/FormLogin'
import { UserCookie } from '../../../model/User/UserCookie'
import { LoadingContext } from '../../providers/LoadingProvider'
import { FormButton } from '../../ui/Form/FormButton'

export const LoginForm = () => {
	const [form, setForm] = useState<FormLogin>(new FormLogin())
	const [errors, setErrors] = useState<FORM_ERRORS[] | []>([])
	const { setGlobalLoading } = useContext(LoadingContext)
	const { setUser } = useActions()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setGlobalLoading(true)
		setErrors([])
		const auth = getAuth()
		signInWithEmailAndPassword(auth, form.login, form.password)
			.then(userCredential => {
				const user: UserCookie = {
					id: userCredential.user.uid,
					token: userCredential.user.accessToken,
				}

				setUser(user)
				setGlobalLoading(false)
			})
			.catch(error => {
				setErrors([...errors, FORM_ERRORS.wrongLogin])
				setGlobalLoading(false)
			})
	}

	return (
		<>
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
					errors={[
						{
							invalid: errors.includes(FORM_ERRORS.wrongLogin),
							text: 'Неверный логин или пароль',
						},
					]}
					className='input-black'
				>
					Войти
				</FormButton>
			</Form>
		</>
	)
}
