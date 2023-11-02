import { FormSignUp } from "../model/Forms/FormSignUp"
import { stringKeys } from './types';

export type FormError = {text: string, invalid: boolean}

export type FormTypes = stringKeys & FormSignUp