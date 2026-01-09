import { hydrateAuthStatus } from '@/store/authStatus.slice'
import { store } from '@/store/store'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

export default function RootLayout() {
	useEffect(() => {
		store.dispatch(hydrateAuthStatus())
	}, [])

	return (
		<Provider store={store}>
			<Stack screenOptions={{ headerShown: false }} />
		</Provider>
	)
}
