import { createSlice } from '@reduxjs/toolkit'

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
		},
		logout: state => {
			state.token = ''
			state.id = ''
		},
	},
})
