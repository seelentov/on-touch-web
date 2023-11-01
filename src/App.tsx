import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './components/providers/AuthProvider'
import { Messages } from './components/screens/Messages/Messages'
import { Header } from './components/ui/Header/Header'
import { Wrapper } from './components/ui/Wrapper'
import { ROUTING } from './config/routing.config'
import { store } from './store/store'

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AuthProvider>
					<Header />
					<Wrapper>
						<Routes>
							<Route path={ROUTING.MESSAGES} element={<Messages />} />
						</Routes>
					</Wrapper>
				</AuthProvider>
			</BrowserRouter>
		</Provider>
	)
}

export default App
