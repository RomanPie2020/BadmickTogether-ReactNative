import { useLogout } from '@/hooks/useLogout'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { router } from 'expo-router'
import { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import 'react-native-reanimated'
import HomeSheet from '../ui/HomeSheet'
import { PrimaryButton } from '../ui/PrimaryButton'

export default function HomeAuthenticated({}) {
	const { logOutHandler } = useLogout()
	const bottomSheetRef = useRef<BottomSheetMethods>(null)

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Вітаємо на BadmickTogether!</Text>
				<PrimaryButton
					title='Open Bottom Sheet'
					onPress={() => {
						// console.log('open')
						// router.replace('/test-sheet')

						bottomSheetRef.current?.expand()
					}}
				/>
				<PrimaryButton title='Вийти' onPress={logOutHandler} />

				<PrimaryButton title='Map' onPress={() => router.replace('/map')} />
			</View>

			<HomeSheet ref={bottomSheetRef} />
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
})
