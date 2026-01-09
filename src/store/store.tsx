import { authService } from '@/services/AuthService'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from 'react-redux'
import { authStatusSliceReducer } from './authStatus.slice'
const rootReducer = combineReducers({
	authStatus: authStatusSliceReducer,
	[authService.reducerPath]: authService.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(authService.middleware),
	devTools: __DEV__,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore = () => useStore<RootState>()
