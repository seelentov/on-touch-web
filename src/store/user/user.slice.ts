import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: null,
	id: null,
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
			state.token = null
			state.id = null
		},
	},
})
