import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { AuthProvider } from './components/providers/AuthProvider'
import { MenuContextProvider } from './components/providers/MenuContextProvider'
import { Dialog } from './components/screens/Messages/Dialog'
import { Header } from './components/ui/Header/Header'
import { Logo } from './components/ui/Logo/Logo'
import { Wrapper } from './components/ui/Wrapper'
import { HEADER_MENU } from './config/menu.config'
import { ROUTING } from './config/routing.config'
import { store } from './store/store'

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AuthProvider>
					<MenuContextProvider>
						<Header menu={HEADER_MENU} logo={<Logo />} />
						<Wrapper>
							<Routes>
								<Route path={ROUTING.MESSAGES} element={<Dialog />} />
							</Routes>
						</Wrapper>
					</MenuContextProvider>
				</AuthProvider>
			</BrowserRouter>
		</Provider>
	)
}

export default App

/**
 *
 */
