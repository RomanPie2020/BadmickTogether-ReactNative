import { IFormInput } from '@/types/models'
import {
	Control,
	Controller,
	FieldError,
	FieldValues,
	Path,
	RegisterOptions,
} from 'react-hook-form'
import { TextInput as RNTextInput, StyleSheet, Text, View } from 'react-native'

interface IFormInputProps<T extends FieldValues> {
	input: IFormInput<T>
	control: Control<T>
	rules: RegisterOptions<T, Path<T>>
	error?: FieldError | { message: string } | null
	disabled?: boolean
}

const FormInput = <T extends FieldValues>({
	input,
	control,
	rules,
	error,
	disabled = false,
}: IFormInputProps<T>) => {
	return (
		<View style={styles.wrapper}>
			{input.label && <Text style={styles.label}>{input.label}</Text>}

			<Controller
				control={control}
				name={input.name}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<RNTextInput
						value={value as string}
						onChangeText={onChange}
						onBlur={onBlur}
						placeholder={input.placeholder}
						editable={!disabled}
						secureTextEntry={input.secureTextEntry}
						autoCapitalize={input.autoCapitalize}
						textContentType={input.textContentType}
						autoComplete={input.autoComplete}
						keyboardType={input.keyboardType}
						style={[
							styles.input,
							error && styles.inputError,
							disabled && styles.disabled,
						]}
					/>
				)}
			/>

			{error && <Text style={styles.error}>{error.message}</Text>}
		</View>
	)
}

export default FormInput

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		marginBottom: 12,
	},
	label: {
		marginBottom: 6,
		fontSize: 16,
		fontWeight: '500',
	},
	input: {
		borderWidth: 1,
		borderColor: '#d1d5db', // gray-300
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 16,
	},
	inputError: {
		borderColor: '#ef4444', // red-500
	},
	disabled: {
		backgroundColor: '#f3f4f6',
	},
	error: {
		marginTop: 4,
		fontSize: 14,
		color: '#ef4444',
	},
})
