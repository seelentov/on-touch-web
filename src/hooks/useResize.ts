import { useEffect, useState } from 'react'
import { SCREEN } from '../consts/SCREEN'

export const useResize = () => {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const handleResize = (event: any) => {
			setWidth(event.target.innerWidth)
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return {
		width,
		isScreenSm: width >= SCREEN.SM,
		isScreenMd: width >= SCREEN.MD,
		isScreenLg: width >= SCREEN.LG,
		isScreenXl: width >= SCREEN.XL,
		isScreenXxl: width >= SCREEN.XXL,
	}
}
