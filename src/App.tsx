import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { AuthProvider } from './components/providers/AuthProvider'
import { LoadingProvider } from './components/providers/LoadingProvider'
import { MenuProvider } from './components/providers/MenuProvider'
import { Search } from './components/screens/Search/Search'
import { Header } from './components/ui/Header/Header'
import { Logo } from './components/ui/Logo/Logo'
import { Messages } from './components/ui/Messages/Messages'
import { Wrapper } from './components/ui/Wrapper'
import { HEADER_MENU } from './config/menu.config'
import { ROUTING } from './config/routing.config'
import { store } from './store/store'

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<LoadingProvider>
					<AuthProvider>
						<MenuProvider>
							<Header menu={HEADER_MENU} logo={<Logo />} />
							<Wrapper>
								<Routes>
									<Route path={ROUTING.MESSAGES} element={<Messages />} />
									<Route path={ROUTING.SEARCH} element={<Search />} />
								</Routes>
							</Wrapper>
						</MenuProvider>
					</AuthProvider>
				</LoadingProvider>
			</BrowserRouter>
		</Provider>
	)
}

export default App

/**
 *
 */
