import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: null,
	id: null,
}

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSettings: (state, { payload: inputs }) => {
			state.token = inputs.token
			state.id = inputs.id
		},
	},
})
