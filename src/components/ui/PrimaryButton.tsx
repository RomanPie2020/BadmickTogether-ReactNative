import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native'

interface IPrimaryButtonProps {
	title: string
	onPress: () => void
	variant?: 'primary' | 'secondary'
	style?: ViewStyle
}

export function PrimaryButton({
	title,
	onPress,
	variant = 'primary',
	style,
}: IPrimaryButtonProps) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.base,
				styles[variant],
				pressed && styles.pressed,
				style,
			]}
		>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	base: {
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
		minWidth: 160,
	},
	primary: {
		backgroundColor: '#2563eb', // blue-600
	},
	secondary: {
		backgroundColor: '#4b5563', // gray-600
	},
	pressed: {
		opacity: 0.7,
	},
	text: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '500',
	},
})
