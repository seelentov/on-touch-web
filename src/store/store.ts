/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { userSlice } from './user/user.slice'
import { settingsSlice } from './settings/settings.slice';

createLogger({
	collapsed: true,
})

export const actions = {
	...userSlice.actions,
  ...settingsSlice.actions
}

const reducers = combineReducers({
	user: userSlice.reducer,
  settings: settingsSlice.reducer
})

export const store = configureStore({
	reducer: reducers
})
