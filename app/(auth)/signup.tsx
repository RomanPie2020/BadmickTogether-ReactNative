import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export default function SignupScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Pressable onPress={() => router.push('/login')}>
				<Text style={{ fontSize: 18 }}>Go to Login</Text>
			</Pressable>
			<Pressable onPress={() => router.replace('/')}>
				<Text style={{ fontSize: 18 }}>Back Home</Text>
			</Pressable>
		</View>
	)
}
