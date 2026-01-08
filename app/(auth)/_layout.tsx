import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function AuthTabsLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name='login'
				options={{
					title: 'Login',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='home' size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name='signup'
				options={{
					title: 'Sign Up',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='compass' size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
