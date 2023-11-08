import { createSlice } from '@reduxjs/toolkit'
import { clearCookieLogin } from '../../utils/cookie/clearCookieLogin'
import { setCookieLogin } from '../../utils/cookie/setCookieLogin'

const initialState = {
	token: '',
	id: '',
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, { payload: inputs }) => {
			state.token = inputs.token
			state.id = inputs.id
      setCookieLogin(inputs)
		},
		logout: state => {
			state.token = ''
			state.id = ''
			clearCookieLogin()
		},
	},
})
