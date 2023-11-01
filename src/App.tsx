import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTING } from './config/routing.config'
import { AuthProvider } from './components/providers/AuthProvider'
import { Header } from './components/ui/Header/Header'

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Header />
				<Routes>
					<Route path={ROUTING.MESSAGES} element={<Messages />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
