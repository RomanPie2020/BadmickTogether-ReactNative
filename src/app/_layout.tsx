import 'react-native-reanimated'

import { AppBootstrap } from '@/components/AppBootstrap'
import { store } from '@/store/store'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={store}>
				<AppBootstrap />
				<Stack screenOptions={{ headerShown: false }} />
			</Provider>
		</GestureHandlerRootView>
	)
}
