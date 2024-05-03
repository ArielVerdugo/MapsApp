import { Pressable, Text, View } from "react-native"
import { globalStyles } from "../../../config/theme/styles"
import { usePermissionStore } from "../../store/permissions/usePermissionStore"


export const PermissionsScreen = () => {

    const { locationState, onRequestPermission } = usePermissionStore();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Habilitar ubicación</Text>

            <Pressable
                style={globalStyles.btnPrimary}
                onPress={ onRequestPermission }
            >
                <Text style={{ color: 'white' }}>Habilitar Localización</Text>
            </Pressable>


            <Text>Estado actual: {locationState}</Text>

        </View>
    )
}