import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import { Router } from './components/Router'
import { AuthProvider } from './components/providers/AuthProvider'
import { LoadingProvider } from './components/providers/LoadingProvider'
import { MenuProvider } from './components/providers/MenuProvider'
import { NotificationProvider } from './components/providers/NotificationProvider'
import { Header } from './components/ui/Header/Header'
import { Logo } from './components/ui/Logo/Logo'
import { Wrapper } from './components/ui/Wrapper'
import { HEADER_MENU } from './config/menu.config'
import { store } from './store/store'

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<LoadingProvider>
					<AuthProvider>
						<NotificationProvider>
							<MenuProvider>
								<Header menu={HEADER_MENU} logo={<Logo />} />
								<Wrapper>
									<Router />
								</Wrapper>
							</MenuProvider>
						</NotificationProvider>
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
