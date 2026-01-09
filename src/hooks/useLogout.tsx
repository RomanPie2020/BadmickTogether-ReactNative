import { authService, useLogOutMutation } from '@/services/AuthService'
import { useAppDispatch } from '@/store/store'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { useActions } from './useActions'

export function useLogout() {
	const dispatch = useAppDispatch()
	const { logOut } = useActions()
	const [logOutApi] = useLogOutMutation()

	const logOutHandler = async () => {
		try {
			const refreshToken = await SecureStore.getItemAsync('refresh_token')
			if (refreshToken) {
				await logOutApi({ refreshToken }).unwrap()
			}
		} catch {
			console.warn('Backend logout failed, continuing local logout')
		} finally {
			await SecureStore.deleteItemAsync('access_token')
			await SecureStore.deleteItemAsync('refresh_token')
			await SecureStore.deleteItemAsync('user_id')

			logOut()
			dispatch(authService.util.resetApiState())

			router.replace('/login')
		}
	}

	return { logOutHandler }
}
