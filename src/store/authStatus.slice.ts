import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'

interface AuthStatusState {
	isAuthenticated: boolean
	isLoading: boolean
}

const initialState: AuthStatusState = {
	isAuthenticated: false,
	isLoading: true,
}

export const hydrateAuthStatus = createAsyncThunk(
	'authStatus/hydrate',
	async () => {
		const token = await SecureStore.getItemAsync('access_token')
		return Boolean(token)
	}
)

const authStatusSlice = createSlice({
	name: 'authStatus',
	initialState,
	reducers: {
		logIn(state) {
			state.isAuthenticated = true
		},
		logOut(state) {
			state.isAuthenticated = false
		},
	},
	extraReducers: builder => {
		builder
			.addCase(hydrateAuthStatus.pending, state => {
				state.isLoading = true
			})
			.addCase(
				hydrateAuthStatus.fulfilled,
				(state, action: PayloadAction<boolean>) => {
					state.isAuthenticated = action.payload
					state.isLoading = false
				}
			)
			.addCase(hydrateAuthStatus.rejected, state => {
				state.isAuthenticated = false
				state.isLoading = false
			})
	},
})

export const authStatusSliceActions = authStatusSlice.actions
export const authStatusSliceReducer = authStatusSlice.reducer
