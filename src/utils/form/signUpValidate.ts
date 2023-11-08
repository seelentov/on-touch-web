import { FORM_ERRORS } from '../../consts/FORM_ERRORS'
import { FormSignUp } from '../../model/Forms/FormSignUp'
import { isEmail } from './isEmail'
import { isRequired } from './isRequired'
import { isSame } from './isSame'
import { isWeakPass } from './isWeakPass'

export const signUpValidate = (form: FormSignUp): FORM_ERRORS[] => {
	const result: FORM_ERRORS[] = []

	if (!isRequired(form.name)) result.push(FORM_ERRORS.name)
	if (!isRequired(form.nickname)) result.push(FORM_ERRORS.nickname)
	if (!isRequired(form.birth)) result.push(FORM_ERRORS.birth)
	if (!isRequired(form.password) || !isWeakPass(form.password))
		result.push(FORM_ERRORS.password)

	if (!isEmail(form.email)) result.push(FORM_ERRORS.email)

	if (!isSame(form.password, form.confirmPassword))
		result.push(FORM_ERRORS.confirmPassword)

	return result
}
