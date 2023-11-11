const MAIN = '/' as const

export const ROUTING = {
	MAIN: MAIN,
	MESSAGES: MAIN,
	DIALOG: MAIN + 'dialog/',
	SEARCH: MAIN + 'search/',
	PROFILE: MAIN + 'profile/',
	SETTINGS: MAIN + 'settings/',
} as const

export type ROUTING = (typeof ROUTING)[keyof typeof ROUTING]
