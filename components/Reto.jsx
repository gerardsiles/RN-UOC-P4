import { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Image } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Reto({
	nombre,
	detalle,
	completado,
	categoria,
	tiempo,
	activo,
	prioridad,
}) {
	const tw = useTailwind();
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={tw('mx-4 my-2')}
			activeOpacity={0.9}
			onPress={() =>
				navigation.navigate('DetalleReto', {
					nombre: nombre,
					detalle: detalle,
					completado: completado,
					categoria: categoria,
					tiempo: tiempo,
					activo: activo,
					prioridad: prioridad,
				})
			}
		>
			<Text style={tw('uppercase text-xl font-bold w-3/4')}>{nombre}</Text>

			<View style={tw('flex-row')}>
				<Text style={tw('w-3/4')}>{detalle}</Text>

				<View
					style={tw(
						'absolute content-center items-center bottom-0 right-8 bg-red-500 rounded-xl p-1'
					)}
				>
					<Text style={tw('text-white')}>{completado}%</Text>
				</View>
				<AntDesign
					name='right'
					size={18}
					color='white'
					style={tw('absolute right-2 bottom-2/4')}
				/>
			</View>
		</TouchableOpacity>
	);
}
export default Reto;
