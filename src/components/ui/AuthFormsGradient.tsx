import { LinearGradient } from 'expo-linear-gradient'
import { Text } from 'react-native'

export default function AuthFormsGradient() {
	return (
		<LinearGradient colors={['#bae6fd', '#c7d2fe']} style={{ flex: 1 }}>
			<Text>Hello</Text>
		</LinearGradient>
	)
}
