import { FC, PropsWithChildren, createContext, useState } from 'react'
import { Loading } from '../ui/Loading/Loading'
interface ILoading {
	globalLoading: boolean
	setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = createContext<ILoading>({} as ILoading)

export const LoadingProvider: FC<PropsWithChildren> = ({ children }) => {
	const [globalLoading, setGlobalLoading] = useState<boolean>(false)
	return (
		<>
			{globalLoading && <Loading />}
			<LoadingContext.Provider value={{ globalLoading, setGlobalLoading }}>
				{children}
			</LoadingContext.Provider>
		</>
	)
}
