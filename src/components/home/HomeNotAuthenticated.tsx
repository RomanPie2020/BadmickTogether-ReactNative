import { router } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { PrimaryButton } from '../ui/PrimaryButton'

export default function HomeNotAuthenticated({}) {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Вітаємо на BadmickTogether!</Text>

				<Text style={styles.description}>
					Цей сайт створений, щоб допомогти вам легко знаходити однодумців та
					організовувати захоплюючі ігри в бадмінтон. Незалежно від вашого рівня
					майстерності – від початківця до досвідченого гравця – тут ви знайдете
					ідеального партнера чи команду.
				</Text>

				<View style={styles.buttons}>
					<PrimaryButton
						title='Увійти'
						variant='secondary'
						onPress={() => router.push('/login')}
					/>

					<PrimaryButton
						title='Зареєструватися'
						onPress={() => router.push('/signup')}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#c7d2fe',
		paddingTop: 160,
		paddingHorizontal: 24,
	},
	content: {
		alignItems: 'center',
		marginTop: 40,
	},
	title: {
		fontSize: 36,
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: 16,
		paddingHorizontal: 16,
	},
	description: {
		fontSize: 18,
		textAlign: 'center',
		maxWidth: 600,
		marginVertical: 32,
		lineHeight: 26,
	},
	buttons: {
		flexDirection: 'row',
		gap: 16,
	},
})
