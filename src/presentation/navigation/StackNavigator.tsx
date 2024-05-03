import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { MapScreen } from '../screens/maps/MapScreen';
import { PermissionsScreen } from '../screens/permissions/PermissionsScreen';

export type RootStackParams = {
  Loading: undefined;
  Map: undefined;
  Permissions: undefined;
}


const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator 
    initialRouteName='Loading'
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white',
      }
    }}>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />
    </Stack.Navigator>
  );
}