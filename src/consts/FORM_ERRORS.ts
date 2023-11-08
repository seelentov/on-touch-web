export type FormError = { text: string; invalid: boolean }

export const FORM_ERRORS = {
	name: 'name',
	password: 'password',
	birth: 'birth',
	confirmPassword: 'confirmPassword',
	email: 'email',
	bio: 'bio',
	nickname: 'nickname',
	dublicateEmail: 'dublicateEmail',
	wrongLogin: 'wrongLogin',
	dublicateNickName: 'dublicateNickName',
} as const

export type FORM_ERRORS = (typeof FORM_ERRORS)[keyof typeof FORM_ERRORS]
