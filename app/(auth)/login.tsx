import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export default function LoginScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Pressable onPress={() => router.push('/signup')}>
				<Text style={{ fontSize: 18 }}>Sign up</Text>
			</Pressable>
			<Pressable onPress={() => router.replace('/')}>
				<Text style={{ fontSize: 18 }}>Back Home</Text>
			</Pressable>
		</View>
	)
}
