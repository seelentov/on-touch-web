const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isEmail = (field: string | '') => emailRegex.test(field)
