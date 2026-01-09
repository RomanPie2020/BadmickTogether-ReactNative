import {
	IRequestLogIn,
	IRequestLogOut,
	IRequestRefreshToken,
	IRequestSignUp,
	IResponseLogIn,
	IResponseLogOut,
	IResponseRefreshToken,
	IResponseSignUp,
	TResponseConfirmRegistration,
} from '@/types/models'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'

export const authService = createApi({
	reducerPath: 'auth',
	baseQuery: baseQueryWithReauth,
	endpoints: build => ({
		register: build.mutation<IResponseSignUp, IRequestSignUp>({
			query: body => ({
				url: '/api/auth/register',
				method: 'POST',
				body,
			}),
		}),
		confirmRegistration: build.query<TResponseConfirmRegistration, string>({
			query: (token: string) => ({
				url: `/api/auth/confirm?token=${token}`,
				method: 'GET',
			}),
		}),
		loginUser: build.mutation<IResponseLogIn, IRequestLogIn>({
			query: body => ({
				url: '/api/auth/login',
				method: 'POST',
				body,
			}),
		}),
		refresh: build.mutation<IResponseRefreshToken, IRequestRefreshToken>({
			query: body => ({
				url: '/api/auth/refresh',
				method: 'POST',
				body,
			}),
		}),
		logOut: build.mutation<IResponseLogOut, IRequestLogOut>({
			query: body => ({
				url: '/api/auth/logout',
				method: 'DELETE',
				body,
			}),
		}),
	}),
})

export const {
	useRegisterMutation,
	useConfirmRegistrationQuery,
	useLoginUserMutation,
	useRefreshMutation,
	useLogOutMutation,
} = authService
