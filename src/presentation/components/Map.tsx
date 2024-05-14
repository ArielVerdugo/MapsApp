import { Platform } from "react-native"
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps"
import { Location } from '../../infrastructure/interfaces/Location';
import { Fab } from "./ui/Fab";
import { useEffect, useRef, useState } from "react";
import { useLocationStore } from "../store/location/useLocationStore";


interface Props {
    showUserLocation?: boolean;
    initialLocation: Location;
}


export const Map = ({ showUserLocation = true, initialLocation }: Props) => {

    const mapRef = useRef<MapView>();

    const locationRef = useRef<Location>(initialLocation);

    const { lastLocationKnown, userLocationsHistory ,getLocation, watchLocation, clearWatchLocation } = useLocationStore();
    const [ isFollowing, setIsFollowing ] = useState(true);
    const [ isShowingPolliline, setIsShowingPolliline ] = useState(true);


    const moveCameraToLocation = (location: Location) => {
        if (!mapRef.current) return;

        mapRef.current.animateCamera({ center: location });
    }

    const goToLocation = async () => {
        const location = await getLocation();
        if (!location) return;
        moveCameraToLocation(location);
    }


    useEffect(() => {
        watchLocation();

        return () => {
            clearWatchLocation();
        }
    }, [])

    useEffect( () => {
        if (lastLocationKnown && isFollowing) {
            moveCameraToLocation(lastLocationKnown)
        }
    }, [lastLocationKnown, isFollowing])


    return (
        <>
            <MapView
                ref={(map) => mapRef.current = map!}
                showsUserLocation={showUserLocation}
                onTouchStart={ () => setIsFollowing( false ) }
                provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ flex: 1 }}
                region={{
                    // uso location ref ya que si uso inital location, cuando llamo al get location cambia el estado y se le pasa un valor nuevo por parámetro. Eso hace que se renderice el componente y no se vea ninguna animacion.
                    latitude: locationRef.current.latitude,
                    longitude: locationRef.current.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}>
                    {
                        isShowingPolliline && (
                            <Polyline
                            coordinates={ userLocationsHistory }
                            strokeColor="black"
                            strokeWidth={5}
                            />
                        )
                    }
                    
            </MapView>
            <Fab
                iconName={isShowingPolliline ? 'eye-outline' : 'eye-off-outline'}
                onPress={() => setIsShowingPolliline(!isShowingPolliline)}
                style={{
                    bottom: 140,
                    right: 20,
                }}
            />
            <Fab
                iconName="compass-outline"
                onPress={() => goToLocation()}
                style={{
                    bottom: 20,
                    right: 20,
                }}
            />
            <Fab
                iconName={isFollowing ? 'walk-outline' : 'accessibility-outline'}
                onPress={() => setIsFollowing(!isFollowing)}
                style={{
                    bottom: 80,
                    right: 20,
                }}
            />
        </>
    )
}
