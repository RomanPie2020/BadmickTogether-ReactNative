import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'
import * as SecureStore from 'expo-secure-store'

import { apiUrl } from '@/configs/url.config'
import { authStatusSliceActions } from '@/store/authStatus.slice'

interface IResponseRefreshToken {
	accessToken: string
	refreshToken?: string
}

// const [logIn, logOut] = useActions()

const tokenStorage = {
	getAccessToken: () => SecureStore.getItemAsync('access_token'),
	getRefreshToken: () => SecureStore.getItemAsync('refresh_token'),
	setAccessToken: (token: string) =>
		SecureStore.setItemAsync('access_token', token),
	setRefreshToken: (token: string) =>
		SecureStore.setItemAsync('refresh_token', token),
	clear: async () => {
		await SecureStore.deleteItemAsync('access_token')
		await SecureStore.deleteItemAsync('refresh_token')
	},
}

/* ---------- Base query ---------- */

const rawBaseQuery = fetchBaseQuery({
	baseUrl: apiUrl,
	prepareHeaders: async headers => {
		const token = await tokenStorage.getAccessToken()
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	},
})

/* ---------- Reauth wrapper ---------- */

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	{},
	FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
	let result = await rawBaseQuery(args, api, extraOptions)

	if (result.error?.status === 401) {
		const refreshToken = await tokenStorage.getRefreshToken()

		if (!refreshToken) {
			await tokenStorage.clear()
			api.dispatch(authStatusSliceActions.logOut())
			return result
		}

		// 🔁 try refresh
		const refreshResult = await rawBaseQuery(
			{
				url: '/api/auth/refresh',
				method: 'POST',
				body: { refreshToken },
			},
			api,
			extraOptions
		)

		if (refreshResult.data) {
			const { accessToken, refreshToken: newRefreshToken } =
				refreshResult.data as IResponseRefreshToken

			await tokenStorage.setAccessToken(accessToken)

			if (newRefreshToken) {
				await tokenStorage.setRefreshToken(newRefreshToken)
			}

			api.dispatch(authStatusSliceActions.logIn())

			// 🔁 retry original request
			result = await rawBaseQuery(args, api, extraOptions)
		} else {
			await tokenStorage.clear()
			api.dispatch(authStatusSliceActions.logOut())
		}
	}

	return result
}
