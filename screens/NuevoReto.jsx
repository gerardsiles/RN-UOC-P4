import {
	View,
	Text,
	ActivityIndicator,
	TouchableOpacity,
	TextInput,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn/dist';

import { useLayoutEffect, useState } from 'react';
import { Image } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { db } from '../db/firebaseConfig';
import { setDoc, addDoc, collection } from 'firebase/firestore';

const NuevoReto = () => {
	const tw = useTailwind();
	const navigation = useNavigation();

	const [name, setName] = useState('');
	const [detalle, setDetalle] = useState('');
	const [categoria, setCategoria] = useState('');
	const [tiempo, setTiempo] = useState('');
	const [prioridad, setPrioridad] = useState('');
	const [periodicidad, setPeriodicidad] = useState('');
	const [activo, setActivo] = useState(false);
	const [completado, setCompletado] = useState('');

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 12 }}
					onPress={() => navigation.navigate('Evolucion')}
				>
					<AntDesign name='home' size={24} color='white' />
				</TouchableOpacity>
			),
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginLeft: 12 }}
					onPress={() => navigation.goBack()}
				>
					<AntDesign name='left' size={24} color='white' />
				</TouchableOpacity>
			),
			title: 'Agregar Reto',
			headerTitleAlign: 'center',
			headerStyle: {
				backgroundColor: '#998830',
			},
			headerTitleStyle: {
				color: navigation.isFocused ? '#fff' : 'gray',
				fontWeight: 'bold',
			},
		});
	}, [navigation]);

	const handleSubmit = () => {
		if (
			name.length < 1 ||
			detalle.length < 1 ||
			categoria.length < 1 ||
			prioridad.length < 1
		) {
			return alert('No pueden haber campos vacios');
		} else {
			addDoc(collection(db, 'retos'), {
				activo: activo,
				categoria: categoria,
				completado: completado,
				detalle: detalle,
				nombre: name,
				periodicidad: periodicidad,
				prioridad: prioridad,
				tiempo: tiempo,
			});

			navigation.navigate('Evolucion');
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={tw('flex-1')}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View
					style={[tw('flex-1 justify-around'), { backgroundColor: '#998830' }]}
				>
					<View style={tw('items-center')}>
						<Text style={tw('font-bold text-white text-2xl mt-3 ')}>
							Nuevo Reto
						</Text>
					</View>
					<View style={tw('ml-3')}>
						<Text style={tw('text-white text-xl mt-2 ')}>Nombre</Text>
						<TextInput
							style={tw('underline decoration-slate-200 text-lg mb-1')}
							placeholder='nombre'
							onChangeText={setName}
						/>
						<Text style={tw('text-white text-xl mt-2 ')}>Detalle</Text>
						<TextInput
							style={tw('underline decoration-slate-200 text-lg mb-1')}
							placeholder='detalle'
							onChangeText={setDetalle}
						/>
						<Text style={tw('text-white text-xl mt-2 ')}>Categoria</Text>
						<TextInput
							style={tw('underline decoration-slate-200 text-lg mb-1')}
							placeholder='categoria'
							onChangeText={setCategoria}
						/>
						<Text style={tw('text-white text-xl mt-2 ')}>Tiempo</Text>
						<TextInput
							style={tw('underline decoration-slate-200 text-lg mb-1')}
							placeholder='tiempo'
							onChangeText={setTiempo}
							keyboardType='number-pad'
						/>
						<Text style={tw('text-white text-xl mt-2 ')}>Periodicidad</Text>
						<TextInput
							style={tw('underline decoration-slate-200 text-lg mb-1')}
							placeholder='periodicidad'
							onChangeText={setPeriodicidad}
							keyboardType='number-pad'
						/>
						<Text style={tw('text-white text-xl mt-2 ')}>Prioridad</Text>
						<TextInput
							style={tw('underline decoration-slate-200 text-lg mb-1')}
							placeholder='prioridad'
							onChangeText={setPrioridad}
						/>

						<Text style={tw('text-white text-xl mt-2 ')}>Completado</Text>
						<TextInput
							style={tw('underline decoration-slate-200 text-lg mb-1')}
							placeholder='completado'
							onChangeText={setCompletado}
							keyboardType='number-pad'
						/>
						<View style={tw('flex-row content-center')}>
							<BouncyCheckbox
								size={24}
								onPress={() => setActivo(!activo)}
								style={{ marginTop: 6 }}
							/>
							<Text style={tw('text-white text-xl mt-2 ')}>Activo</Text>
						</View>
					</View>
					<View style={tw('m-5')}>
						<Button title='Guardar' color={'#fff'} onPress={handleSubmit} />
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default NuevoReto;
