import HomeAuthenticated from '@/components/home/HomeAuthenticated'
import { useAppSelector } from '@/store/store'
import 'react-native-reanimated'

export default function HomeScreen() {
	const isAuthenticated = useAppSelector(
		state => state.authStatus.isAuthenticated
	)

	if (!isAuthenticated) {
		// return <HomeNotAuthenticated />
		return <HomeAuthenticated />
	}

	return <HomeAuthenticated />
}
