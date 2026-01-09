import { IFormInput } from '@/types/models'
import {
	FieldError,
	FieldValues,
	Path,
	useForm,
	UseFormSetError,
} from 'react-hook-form'
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native'
import FormInput from './ui/FormInput'
import { PrimaryButton } from './ui/PrimaryButton'

interface IFormBuilderProps<T extends FieldValues> {
	inputs: IFormInput<T>[]
	submitButton: {
		title: string
	}
	extraButtons?: {
		title: string
		onPress: () => void
		variant?: 'primary' | 'secondary'
	}[]
	defaultValues: T
	errorMessage?: string | null
	onSubmit: (data: T, helpers?: { setError: UseFormSetError<T> }) => void
}

function FormBuilder<T extends FieldValues>({
	inputs,
	submitButton,
	extraButtons = [],
	defaultValues,
	errorMessage,
	onSubmit,
}: IFormBuilderProps<T>) {
	const {
		control,
		handleSubmit,
		getValues,
		setError,
		formState: { errors },
	} = useForm<T>({})

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={styles.flex}
		>
			<ScrollView
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps='handled'
			>
				{inputs.map(input => (
					<FormInput
						key={String(input.name)}
						input={input}
						control={control}
						rules={{
							...input.rules,
							validate: input.validateWith
								? value =>
										value === getValues(input.validateWith as Path<T>) ||
										'Values do not match'
								: input.rules?.validate,
						}}
						error={
							(errors[input.name] as FieldError | undefined) ||
							(errorMessage ? { message: errorMessage } : null)
						}
					/>
				))}

				<PrimaryButton
					title={submitButton.title}
					onPress={handleSubmit(data => onSubmit(data, { setError }))}
					style={styles.submit}
				/>

				{extraButtons.length > 0 && (
					<View style={styles.extraButtons}>
						{extraButtons.map((btn, idx) => (
							<PrimaryButton
								key={idx}
								title={btn.title}
								variant={btn.variant}
								onPress={btn.onPress}
							/>
						))}
					</View>
				)}
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default FormBuilder

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	container: {
		padding: 16,
	},
	submit: {
		marginTop: 16,
	},
	extraButtons: {
		marginTop: 24,
		gap: 12,
	},
})
