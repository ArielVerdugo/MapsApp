import { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";
import { usePermissionStore } from '../store/permissions/usePermissionStore';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../navigation/StackNavigator";


export const PermissionsChecker = ({ children }: PropsWithChildren) => {

    const { onCheckLocationPermission, locationState } = usePermissionStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useEffect( () => {
        if (locationState === 'granted'){
            navigation.reset({
                routes: [{ name: 'Map' }]
            });

        } else if( locationState !== 'undetermined' ){
            setTimeout(()=> {
                navigation.reset({
                    routes: [{ name: 'Permissions' }]
                });
            }, 1000);
            
        }
    }, [ locationState ] );


    // esto es para ios, como no hay ningun cambio de estado primero verifica el estado
    useEffect( () => {
        onCheckLocationPermission();
    }, [] );

    // esto se lanza unicamente cuando se cambia el estado
    useEffect(() => {
        const suscription = AppState.addEventListener('change', (nextAppState) => {
            if( nextAppState === 'active' ) {
                onCheckLocationPermission();
            }
        });

        return () => {
            suscription.remove();
        }
    }, [])

    return children;
}