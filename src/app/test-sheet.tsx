import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import { useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'

export default function TestSheet() {
	const snapPoints = useMemo(() => ['50%'], [])

	return (
		<View style={{ flex: 1, backgroundColor: 'red' }}>
			<Pressable onPress={() => router.replace('/')}>
				<Text style={{ paddingTop: 112, fontSize: 18 }}>Back Home</Text>
			</Pressable>
			<BottomSheet
				index={0}
				snapPoints={['50%']}
				backgroundStyle={{ backgroundColor: '#e5e7eb' }}
			>
				<BottomSheetView style={{ padding: 24 }}>
					<Text style={{ fontSize: 20 }}>IT WORKS</Text>
				</BottomSheetView>
			</BottomSheet>
		</View>
	)
}
