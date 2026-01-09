import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { router } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

interface IErrorPageProps {
	error: Error
	retry: () => void
}

export default function ErrorPage({ error, retry }: IErrorPageProps) {
	console.log(error)

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Oops!</Text>

			<Text style={styles.message}>
				{error.message || 'Something went wrong'}
			</Text>

			<PrimaryButton
				title='Home'
				onPress={() => router.replace('/')}
				style={styles.button}
			/>

			<PrimaryButton title='Retry' variant='secondary' onPress={retry} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		gap: 24,
	},
	title: {
		fontSize: 48,
		fontWeight: '700',
		marginBottom: 16,
	},
	message: {
		fontSize: 18,
		textAlign: 'center',
		color: '#374151',
	},
	button: {
		marginTop: 16,
	},
})
