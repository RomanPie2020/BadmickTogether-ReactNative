import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { router } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function NotFoundScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>404</Text>
			<Text style={styles.message}>Page not found</Text>

			<PrimaryButton title='Go Home' onPress={() => router.replace('/')} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
	},
	title: {
		fontSize: 64,
		fontWeight: '700',
	},
	message: {
		fontSize: 18,
		marginBottom: 24,
	},
})
