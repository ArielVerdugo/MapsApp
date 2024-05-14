import { StyleSheet, View } from "react-native"
import { Map } from "../../components/Map";
import { useLocationStore } from "../../store/location/useLocationStore";
import { useEffect } from "react";
import { LoadingScreen } from "../loading/LoadingScreen";


export const MapScreen = () => {

    const { lastLocationKnown, getLocation } = useLocationStore();


    useEffect( ()=> {
        if(lastLocationKnown === null){
            getLocation()
        }
    } )

    if(lastLocationKnown === null){
        return(<LoadingScreen />)
    }


    return (
        <View style={styles.container}>
            <Map initialLocation={lastLocationKnown} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});