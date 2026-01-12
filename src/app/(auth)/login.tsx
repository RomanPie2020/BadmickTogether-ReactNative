import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LogInForm from '@/components/LogInForm'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { useActions } from '@/hooks/useActions'
import { useLoginUserMutation } from '@/services/AuthService'
import { ILogInData } from '@/types/models'
import { LinearGradient } from 'expo-linear-gradient'

export default function LoginScreen() {
	const { logIn, logOut } = useActions()
	const [logInUser, { isLoading }] = useLoginUserMutation()
	const [loginError, setLoginError] = useState<string | null>(null)

	const onSubmit = async (req: ILogInData) => {
		try {
			setLoginError(null)

			const data = await logInUser(req).unwrap()

			await SecureStore.setItemAsync('access_token', data.accessToken)
			await SecureStore.setItemAsync('refresh_token', data.refreshToken)

			if (data.user?.id) {
				await SecureStore.setItemAsync('user_id', String(data.user.id))
			}

			logIn()

			router.replace('/')
		} catch (error) {
			console.log('Login failed:', error)

			setLoginError('Incorrect email or password')
		}
	}

	return (
		<LinearGradient
			colors={['#bae6fd', '#c7d2fe']} // sky-200 → indigo-300
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={styles.container}
		>
			<View style={styles.formWrapper}>
				<Text style={styles.title}>Log In</Text>
				<LogInForm onSubmit={onSubmit} />

				<View style={styles.button}>
					<PrimaryButton
						title='Back to Home'
						variant='secondary'
						onPress={() => router.replace('/')}
					/>
				</View>
			</View>
		</LinearGradient>
	)
}

// const styles = StyleSheet.create({
// 	container: {
// 		marginTop: 112,
// 		marginBottom: 112,
// 		paddingVertical: 16,
// 		borderWidth: 2,
// 		borderRadius: 16,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		flex: 1,
// 		width: '80%',
// 		marginHorizontal: 'auto',
// 	},
// 	form: {
// 		maxWidth: '80%',
// 	},
// })

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	formWrapper: {
		width: '80%',
		height: '90%',
		maxWidth: 420,
		paddingVertical: 16,
		borderWidth: 2,
		borderRadius: 16,
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		textAlign: 'center',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})
