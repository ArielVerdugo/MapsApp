import { create } from "zustand";
import { Location } from "../../../infrastructure/interfaces/Location";
import { getCurrentLocation, clearWatchLocation, watchCurrentLocation } from '../../../actions/location/geoLocation';


interface LocationState {

    lastLocationKnown: Location | null;
    userLocationsHistory: Location[];
    watchId: number | null;

    getLocation: () => Promise<Location | null>;
    watchLocation: () => void;
    clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({

    lastLocationKnown: null,
    userLocationsHistory: [],
    watchId: null,

    getLocation: async () => {

        const location = await getCurrentLocation();
        set({ lastLocationKnown: location });
        return location;
    },

    watchLocation: () => {
        const watchId = get().watchId;
        if (watchId !== null) {
            get().clearWatchLocation();
        }

        // le paso por parametro la funcion que pide el callback!
        const id = watchCurrentLocation((location) => {

            set({
                lastLocationKnown: location,
                userLocationsHistory: [...get().userLocationsHistory, location]
            })
        });

        set({ watchId: id })
    },

    clearWatchLocation: () => {
        const watchId = get().watchId;
        if (watchId !== null) {
            clearWatchLocation(watchId);
        }
    }
}))