import { useResize } from '../../../hooks/useResize'
import { Messages } from '../../ui/Messages/Messages'

export const MessagesPage = () => {
	const isDesktop = useResize().isScreenLg

	return isDesktop ? <NoDialog /> : <Messages />
}

const NoDialog = () => (
	<div className='empty'>
		<p>Выберите диалог</p>
	</div>
)
