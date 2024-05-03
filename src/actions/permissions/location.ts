import { PERMISSIONS, PermissionStatus as RNPermissionStatus, check, openSettings, request } from "react-native-permissions"
import { PermissionStatus } from "../../infrastructure/interfaces/permissions"
import { Platform } from "react-native";


export const requestLocationPermission = async(): Promise<PermissionStatus> => {

    let status: RNPermissionStatus = 'unavailable';

    // obtener status inicial
    if (Platform.OS === 'ios') {
        status = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
    } else if (Platform.OS === 'android') {
        status = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
    } else {
        throw new Error ('Unsuported platform');
    }

    // si esta bloqueado invito a desbloquearlo
    if(status === 'blocked') {
        await openSettings();
        return await checkLocationPermission();
    }

    // mapeo para indistintamente de como se manejen los permisos en el paquete que instale, manejarlos como yo diga
    const permissionMapper: Record<RNPermissionStatus,PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        unavailable: 'unavailable',
        limited: 'limited',
    };

    return permissionMapper[status] ?? 'unavailable';
}


export const checkLocationPermission = async(): Promise<PermissionStatus> => {

    let status: RNPermissionStatus = 'unavailable';

    // obtener status inicial
    if (Platform.OS === 'ios') {
        status = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
    } else if (Platform.OS === 'android') {
        status = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
    } else {
        throw new Error ('Unsuported platform');
    }

    // mapeo para indistintamente de como se manejen los permisos en el paquete que instale, manejarlos como yo diga
    const permissionMapper: Record<RNPermissionStatus,PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        unavailable: 'unavailable',
        limited: 'limited',
    };

    return permissionMapper[status] ?? 'unavailable';
}

