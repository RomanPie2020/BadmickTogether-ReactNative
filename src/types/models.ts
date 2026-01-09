import { FieldValues, Path, RegisterOptions } from 'react-hook-form'

export interface IFormInput<T extends FieldValues> {
	name: Path<T>
	label?: string
	placeholder?: string
	rules?: RegisterOptions<T, Path<T>>
	secureTextEntry?: boolean
	validateWith?: Path<T>
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined
	textContentType?: string
	autoComplete?: string
	keyboardType?: string
}

export interface ILogInData {
	email: string
	password: string
}

// ---- AuthService ----
export interface IResponseSignUp {
	id: number
	email: string
	username: string
	first_name: string
	last_name: string
	password: string
}

export interface IRequestSignUp {
	email: string
	username: string
	password: string
}

export interface IApiResponse {
	success: boolean
	message: string
}

export type TResponseConfirmRegistration = IApiResponse

export interface IResponseLogIn {
	accessToken: string
	refreshToken: string
	success: boolean
	user: {
		email: string
		id: number
		username: string
	}
}

export interface IRequestLogIn {
	email: string
	password: string
}

// Refresh Token
export interface IResponseRefreshToken {
	accessToken: string
}

export interface IRequestRefreshToken {
	refreshToken: string
}

// LogOut
export type IResponseLogOut = IApiResponse

export interface IRequestLogOut {
	refreshToken: string
}
