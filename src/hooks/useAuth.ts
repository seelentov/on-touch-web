import { useStoreBy } from './useStoreBy'

export const useAuth = () => {
	const { id } = useStoreBy('user')

	return !!id
}
