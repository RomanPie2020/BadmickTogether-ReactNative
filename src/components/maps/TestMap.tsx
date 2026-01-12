import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { PrimaryButton } from '../ui/PrimaryButton'

import * as Location from 'expo-location'
import { router } from 'expo-router'

type TLocationState = {
	latitude: number
	longitude: number
}

export default function TestMap() {
	const mapRef = useRef<MapView | null>(null)

	const [userGeo, setUserGeo] = useState<TLocationState>({
		latitude: 0,
		longitude: 0,
	})
	const [followUser, setFollowUser] = useState(true)

	useEffect(() => {
		let subscription: Location.LocationSubscription | null = null

		const initLocation = async () => {
			const { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') return

			const location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High,
			})

			setUserGeo({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			})

			subscription = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.Balanced,
					distanceInterval: 5,
				},
				loc => {
					const { latitude, longitude } = loc.coords
					setUserGeo({ latitude, longitude })

					if (followUser) {
						mapRef.current?.animateToRegion(
							{
								latitude,
								longitude,
								latitudeDelta: 0.01,
								longitudeDelta: 0.01,
							},
							500
						)
					}
				}
			)
		}

		initLocation()

		return () => {
			subscription?.remove()
		}
	}, [followUser])

	const goToParkLocation = async () => {
		await setFollowUser(false)
		mapRef.current?.animateToRegion(
			{
				latitude: 37.78825,
				longitude: -122.4324,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			},
			1000
		)
	}

	const onUserLocationChange = e => {
		const { latitude, longitude } = e.nativeEvent.coordinate

		if (!followUser) return
		mapRef.current?.animateToRegion(
			{
				latitude,
				longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			},
			500
		)
	}

	const goToUserLocation = () => {
		setFollowUser(true)
		mapRef.current?.animateToRegion(
			{
				...userGeo,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			},
			500
		)
	}

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				initialRegion={{
					latitude: userGeo?.latitude ?? 37.78825,
					longitude: userGeo?.longitude ?? -122.4324,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				onUserLocationChange={onUserLocationChange}
				onPanDrag={() => setFollowUser(false)}
			>
				{userGeo && (
					<Marker coordinate={userGeo} anchor={{ x: 0.5, y: 0.5 }}>
						<Image
							source={require('../../../assets/images/user-location.png')}
							style={{ width: 32, height: 32 }}
							resizeMode='contain'
						/>
					</Marker>
				)}

				<Marker
					coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
					title='Park'
					description='This is a marker'
				/>
			</MapView>
			<PrimaryButton title='Go to park' onPress={goToParkLocation} />
			<PrimaryButton title='Go to location' onPress={goToUserLocation} />
			<PrimaryButton title='Вийти' onPress={() => router.replace('/')} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	map: { flex: 1 },
	userDot: {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: '#ff0000',
		borderWidth: 3,
		borderColor: '#fff',
	},
})
