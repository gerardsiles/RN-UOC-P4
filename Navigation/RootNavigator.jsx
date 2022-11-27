import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Contactar from '../screens/Contactar';
import Perfil from '../screens/Perfil';
import RetosCompletados from '../screens/RetosCompletados';
import Evolucion from '../screens/Evolucion';
import NuevoReto from '../screens/NuevoReto';
import Home from '../screens/Home';

import RetosActivos from '../screens/RetosActivos';
import DetalleReto from '../screens/DetalleReto';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
	return (
		<RootStack.Navigator>
			<RootStack.Screen name='Home' component={Home} />
			<RootStack.Screen name='Evolucion' component={Evolucion} />
			<RootStack.Screen name='Contactar' component={Contactar} />
			<RootStack.Screen name='Perfil' component={Perfil} />
			<RootStack.Screen name='NuevoReto' component={NuevoReto} />
			<RootStack.Screen name='DetalleReto' component={DetalleReto} />
			<RootStack.Screen name='Activos' component={RetosActivos} />
			<RootStack.Screen name='Completados' component={RetosCompletados} />
		</RootStack.Navigator>
	);
};
export default RootNavigator;
