import { hydrateAuthStatus } from '@/store/authStatus.slice'
import { useAppDispatch } from '@/store/store'
import { useEffect } from 'react'

export function AppBootstrap() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(hydrateAuthStatus())
	}, [dispatch])

	return null
}
