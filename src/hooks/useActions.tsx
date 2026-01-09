import { authStatusSliceActions } from '@/store/authStatus.slice'
import { useAppDispatch } from '@/store/store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'

const rootActions = {
	...authStatusSliceActions,
}

export const useActions = () => {
	const dispatch = useAppDispatch()

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
