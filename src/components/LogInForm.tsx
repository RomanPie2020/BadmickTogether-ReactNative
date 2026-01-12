import { ILogInData } from '@/types/models'
import FormBuilder from './FormBuilder'

export interface ILogInFormProps {
	onSubmit: (userData: ILogInData) => void
}
const LogInForm = ({ onSubmit }: ILogInFormProps) => {
	return (
		<FormBuilder<ILogInData>
			inputs={[
				{
					name: 'email',
					label: 'Email',
					placeholder: 'you@example.com',
					autoCapitalize: 'none',
					keyboardType: 'email-address',
					textContentType: 'emailAddress',
					autoComplete: 'email',
					rules: { required: 'Email is required' },
				},
				{
					name: 'password',
					label: 'Пароль',
					placeholder: '******',
					secureTextEntry: true,
					autoCapitalize: 'none',
					textContentType: 'password',
					autoComplete: 'password',
					rules: { minLength: { value: 6, message: 'Min 6 characters' } },
				},
			]}
			submitButton={{ title: 'Log In' }}
			defaultValues={{ email: '', password: '' }}
			onSubmit={onSubmit}
		/>
	)
}

export default LogInForm
