export const STORAGE_PATH = {
	USERS: 'users/',
	MESSAGES: 'messages/',
} as const

export type STORAGE_PATH = (typeof STORAGE_PATH)[keyof typeof STORAGE_PATH]
