export const SCREEN = {
	SM: 576,
	MD: 768,
	LG: 992,
	XL: 1200,
	XXL: 1400,
} as const

export type SCREEN = (typeof SCREEN)[keyof typeof SCREEN]
