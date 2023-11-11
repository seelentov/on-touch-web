import { useContext, useState } from 'react'
import { Form, FormValues } from '../../ui/Form/Form'
import { FormInput } from '../../ui/Form/FormInput'

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { FORM_ERRORS } from '../../../consts/FORM_ERRORS'
import { useActions } from '../../../hooks/useActions'
import { FormSignUp } from '../../../model/Forms/FormSignUp'
import { UserCookie } from '../../../model/User/UserCookie'
import { addToData } from '../../../store/api/firebase/firebase.endpoints'
import { signUpValidate } from '../../../utils/form/signUpValidate'
import { LoadingContext } from '../../providers/LoadingProvider'
import { FormButton } from '../../ui/Form/FormButton'
import { FormDate } from '../../ui/Form/FromDate'
import { FormTextArea } from '../../ui/Form/FromTextArea'

export const SignUpForm = () => {
	const [form, setForm] = useState<FormSignUp>(new FormSignUp())
	const [errors, setErrors] = useState<FORM_ERRORS[] | []>([])
	const { globalLoading, setGlobalLoading } = useContext(LoadingContext)

	const { setUser } = useActions()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (globalLoading) return

		setGlobalLoading(true)
		const errorsCheck = signUpValidate(form)
		setErrors(errorsCheck)
		if (errorsCheck.length !== 0) return setGlobalLoading(false)

		const auth = getAuth()
		createUserWithEmailAndPassword(auth, form.email, form.password)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((userCredential: any) => {
				const user = {
					id: userCredential.user.uid,
					img: '/users/no-img.png',
					...form,
				}

				addToData('users', userCredential.user.uid, user)
					.then(() => {
						const cookie: UserCookie = {
							id: userCredential.user.uid,
							token: userCredential.user.accessToken,
						}
						setUser(cookie)
						setGlobalLoading(false)
					})
					.catch(error => {
						console.log(error)
						setGlobalLoading(false)
					})
			})
			.catch(error => {
				const stringError: string = error.toString()
				if (stringError.includes('email-already-in-use')) {
					setErrors([...errors, FORM_ERRORS.dublicateEmail])
				}
				setGlobalLoading(false)
			})
	}

	return (
		<>
			<Form
				handleSubmit={handleSubmit}
				className='form-column'
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				values={form as any}
				setValues={setForm as React.Dispatch<React.SetStateAction<FormValues>>}
			>
				<FormInput
					name='name'
					placeholder='Ваше имя'
					type='text'
					className='input-black'
					errorClassName='text-err'
					errors={[
						{
							invalid: errors.includes(FORM_ERRORS.name as never),
							text: 'Имя - обязательное поле',
						},
					]}
				/>
				<FormInput
					name='nickname'
					placeholder='Отображаемый логин'
					type='text'
					className='input-black'
					errorClassName='text-err'
					errors={[
						{
							invalid: errors.includes(FORM_ERRORS.nickname as never),
							text: 'Логин - обязательное поле',
						},
						{
							invalid: errors.includes(FORM_ERRORS.dublicateNickName as never),
							text: 'Логин занят другим пользователем',
						},
					]}
				/>
				<FormInput
					name='email'
					placeholder='Ваш e-mail'
					type='email'
					className='input-black'
					errorClassName='text-err'
					errors={[
						{
							invalid: errors.includes(FORM_ERRORS.email as never),
							text: 'Email - обязательное поле',
						},
						{
							invalid: errors.includes(FORM_ERRORS.dublicateEmail as never),
							text: 'Email занят другим пользователем',
						},
					]}
				/>
				<FormDate
					name='birth'
					placeholder='Введите дату своего рождения'
					className='input-black'
					errorClassName='text-err'
					errors={[
						{
							invalid: errors.includes(FORM_ERRORS.birth as never),
							text: 'Введите верную дату рождения',
						},
					]}
				/>
				<FormInput
					name='password'
					placeholder='Придумайте надежный пароль'
					type='password'
					className='input-black'
					errorClassName='text-err'
					errors={[
						{
							invalid: errors.includes(FORM_ERRORS.password as never),
							text: 'Пароль должен быть более 6-ти символов',
						},
					]}
				/>
				<FormInput
					name='confirmPassword'
					placeholder='Подтвердите пароль'
					type='password'
					className='input-black'
					errorClassName='text-err'
					errors={[
						{
							invalid: errors.includes(FORM_ERRORS.confirmPassword as never),
							text: 'Подтверждение пароля отличается',
						},
					]}
				/>

				<FormTextArea
					name='bio'
					placeholder='Напишите кратко о себе или оставьте поле пустым'
					className='textarea-black'
					errorClassName='text-err'
				/>

				<FormButton className='input-black'>Войти</FormButton>
			</Form>
		</>
	)
}
