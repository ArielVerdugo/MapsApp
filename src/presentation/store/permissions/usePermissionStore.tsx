import { create } from "zustand";
import { PermissionStatus } from "../../../infrastructure/interfaces/permissions";
import { checkLocationPermission, requestLocationPermission } from "../../../actions/permissions/location";


interface PermissionState {
    locationState: PermissionStatus;

    onRequestPermission: () => void;
    onCheckLocationPermission: () => void;
}

export const usePermissionStore = create<PermissionState>()( set => ({

    locationState: 'undetermined',

    onRequestPermission: async () => {
        const status = await requestLocationPermission();
        set({ locationState: status });
    },

    onCheckLocationPermission: async () => {
        const status = await checkLocationPermission();
        set({ locationState: status });
    },

}) )