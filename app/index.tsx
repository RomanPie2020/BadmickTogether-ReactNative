import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export default function HomeScreen() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				gap: 16,
			}}
		>
			<Text style={{ fontSize: 28 }}>Home</Text>

			<Pressable onPress={() => router.push('/login')}>
				<Text style={{ fontSize: 18 }}>Go to Login</Text>
			</Pressable>

			<Pressable onPress={() => router.push('/signup')}>
				<Text style={{ fontSize: 18 }}>Go to Signup</Text>
			</Pressable>
		</View>
	)
}
