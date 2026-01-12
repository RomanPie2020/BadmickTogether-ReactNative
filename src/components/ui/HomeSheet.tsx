import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { forwardRef, useMemo } from 'react'
import { StyleSheet, Text } from 'react-native'

const HomeSheet = forwardRef<BottomSheetMethods>((_, ref) => {
	const snapPoints = useMemo(() => ['25%', '50%'], [])

	return (
		<BottomSheet
			ref={ref}
			index={-1}
			snapPoints={snapPoints}
			enablePanDownToClose
		>
			<BottomSheetView style={styles.sheetContent}>
				<Text style={styles.sheetTitle}>Hello </Text>
				<Text>This is Gorhom Bottom Sheet</Text>
			</BottomSheetView>
		</BottomSheet>
	)
})

HomeSheet.displayName = 'HomeSheet'
export default HomeSheet

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#2563eb',
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 8,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
	sheetContent: {
		flex: 1,
		padding: 24,
	},
	sheetTitle: {
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 8,
	},
})
