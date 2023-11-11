import { Route, Routes } from 'react-router-dom'
import { ROUTING } from '../config/routing.config'
import { Account } from './screens/Account/Account'
import { DialogPage } from './screens/Dialog/Dialog'
import { MessagesPage } from './screens/MessagesPage/MessagesPage'
import { ProfilePage } from './screens/Profile/ProfilePage'
import { Search } from './screens/Search/Search'

export const Router = () => (
	<Routes>
		<Route path={ROUTING.MESSAGES} element={<MessagesPage />} />
		<Route path='*' element={<MessagesPage />} />
		<Route path={ROUTING.SEARCH} element={<Search />} />
		<Route path={ROUTING.PROFILE + ':id'} element={<ProfilePage />} />
		<Route path={ROUTING.DIALOG + ':id'} element={<DialogPage />} />
		<Route path={ROUTING.PROFILE} element={<Account />} />
	</Routes>
)
