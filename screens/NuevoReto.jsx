import {
	View,
	Text,
	ActivityIndicator,
	TouchableOpacity,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTailwind } from 'tailwind-rn/dist';
import { useLayoutEffect, useState } from 'react';
import { Input, Button } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { db } from '../db/firebaseConfig';
import { setDoc, addDoc, collection } from 'firebase/firestore';

const NuevoReto = () => {
	const tw = useTailwind();
	const navigation = useNavigation();

	// State
	const [name, setName] = useState('');
	const [detalle, setDetalle] = useState('');
	const [categoria, setCategoria] = useState('');
	const [tiempo, setTiempo] = useState(0);
	const [prioridad, setPrioridad] = useState('');
	const [periodicidad, setPeriodicidad] = useState(0);
	const [activo, setActivo] = useState(false);
	const [completado, setCompletado] = useState(0);

	// Input refs
	const nameRef = React.createRef();
	const detalleRef = React.createRef();
	const categoriaRef = React.createRef();
	const tiempoRef = React.createRef();
	const periodicidadRef = React.createRef();
	const prioridadRef = React.createRef();
	const completadoRef = React.createRef();

	// Error Messages
	const nameError = name ? '' : 'Nombre no puede estar vacio';
	const detalleError = detalle ? '' : 'Detalle no puede estar vacio';
	const categoriaError = categoria ? '' : 'Categoria no puede estar vacio';
	const tiempoError = tiempo ? '' : 'Tiempo no puede estar vacio';
	const periodicidadError = periodicidad
		? ''
		: 'Periodicidad no puede estar vacio';
	const prioridadError = prioridad ? '' : 'Prioridad no puede estar vacio';
	const completadoError = completado ? '' : 'Completado no puede estar vacio';

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
		if (name.length < 1) {
			nameRef.current.shake();
			nameRef.current.setNativeProps({
				errorMessage: nameError,
				errorStyle: {
					color: '#db6a5e',
					fontWeight: 'bold',
				},
			});
		}
		if (detalle.length < 1) {
			detalleRef.current.shake();
			detalleRef.current.setNativeProps({
				errorMessage: nameError,
				errorStyle: {
					color: '#db6a5e',
					fontWeight: 'bold',
				},
			});
		}
		if (categoria.length < 1) {
			categoriaRef.current.shake();
			categoriaRef.current.setNativeProps({
				errorMessage: nameError,
				errorStyle: {
					color: '#db6a5e',
					fontWeight: 'bold',
				},
			});
		}
		if (tiempo.length < 1 || typeof (tiempo !== 'number')) {
			tiempoRef.current.shake();
			tiempoRef.current.setNativeProps({
				errorMessage: nameError,
				errorStyle: {
					color: '#db6a5e',
					fontWeight: 'bold',
				},
			});
		}
		if (periodicidad.length < 1 || typeof (periodicidad !== 'number')) {
			periodicidadRef.current.shake();
			periodicidadRef.current.setNativeProps({
				errorMessage: nameError,
				errorStyle: {
					color: '#db6a5e',
					fontWeight: 'bold',
				},
			});
		}
		if (prioridad.length < 1) {
			prioridadRef.current.shake();
			prioridadRef.current.setNativeProps({
				errorMessage: nameError,
				errorStyle: {
					color: '#db6a5e',
					fontWeight: 'bold',
				},
			});
		}
		if (completado.length < 1 || typeof (prioridad !== 'number')) {
			completadoRef.current.shake();
			completadoRef.current.setNativeProps({
				errorMessage: nameError,
				errorStyle: {
					color: '#db6a5e',
					fontWeight: 'bold',
				},
			});
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
			})
				.then(docRef => {
					alert('Reto creado, con el id de: ' + JSON.stringify(docRef.id));
				})
				.catch(error => {
					alert(error);
				});
			// Redireccionar
			navigation.navigate('Evolucion');
		}
	};

	return (
		<KeyboardAwareScrollView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={tw('flex-1')}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View
					style={[tw('flex-1 justify-around'), { backgroundColor: '#ffffff' }]}
				>
					<View style={tw('items-center')}>
						<Text style={tw('font-bold text-2xl mt-3 ')}>Nuevo Reto</Text>
					</View>
					<View style={tw('ml-3 mr-3')}>
						<Text style={tw('text-xl mt-2')}>Nombre</Text>
						<Input
							returnKeyType='next'
							placeholder='titulo de tu nuevo reto'
							onChangeText={setName}
							onSubmitEditing={() => {
								detalleRef.current.focus();
							}}
							ref={nameRef}
							errorMessage={nameError}
							errorStyle={{
								color: '#db6a5e',
								fontWeight: 'bold',
							}}
						/>
						<Text style={tw('text-xl  mt-2')}>Detalle</Text>
						<Input
							returnKeyType='next'
							ref={detalleRef}
							placeholder='detalle'
							onChangeText={setDetalle}
							onSubmitEditing={() => {
								categoriaRef.current.focus();
							}}
							errorMessage={detalleError}
							errorStyle={{
								color: '#db6a5e',
								fontWeight: 'bold',
							}}
						/>
						<Text style={tw('text-xl mt-2')}>Categoria</Text>
						<Input
							returnKeyType='next'
							ref={categoriaRef}
							placeholder='categoria'
							onChangeText={setCategoria}
							onSubmitEdtiting={() => {
								tiempoRef.current.focus();
							}}
							errorMessage={categoriaError}
							errorStyle={{
								color: '#db6a5e',
								fontWeight: 'bold',
							}}
						/>
						<Text style={tw('text-xl mt-2')}>Tiempo</Text>
						<Input
							returnKeyType='next'
							ref={tiempoRef}
							placeholder='tiempo'
							onChangeText={setTiempo}
							keyboardType='number-pad'
							onSubmitEditing={() => {
								periodicidadRef.current.focus();
							}}
							errorMessage={tiempoError}
							errorStyle={{
								color: '#db6a5e',
								fontWeight: 'bold',
							}}
						/>
						<Text style={tw('text-xl mt-2 ')}>Periodicidad</Text>
						<Input
							returnKeyType='next'
							ref={periodicidadRef}
							placeholder='periodicidad'
							onChangeText={setPeriodicidad}
							keyboardType='number-pad'
							onSubmitEditing={() => {
								prioridadRef.current.focus();
							}}
							errorMessage={periodicidadError}
							errorStyle={{
								color: '#db6a5e',
								fontWeight: 'bold',
							}}
						/>
						<Text style={tw('text-xl mt-2 ')}>Prioridad</Text>
						<Input
							returnKeyType='next'
							ref={prioridadRef}
							style={tw('underline decoration-slate-200 text-lg mb-1')}
							placeholder='prioridad'
							onChangeText={setPrioridad}
							onSubmitEditing={() => {
								completadoRef.current.focus();
							}}
							errorMessage={prioridadError}
							errorStyle={{
								color: '#db6a5e',
								fontWeight: 'bold',
							}}
						/>

						<Text style={tw('text-xl mt-2 ')}>Completado</Text>
						<Input
							ref={completadoRef}
							placeholder='completado'
							onChangeText={setCompletado}
							keyboardType='number-pad'
							errorMessage={completadoError}
							errorStyle={{
								color: '#db6a5e',
								fontWeight: 'bold',
							}}
						/>
						<View style={tw('flex-row content-center')}>
							<BouncyCheckbox
								size={24}
								onPress={() => setActivo(!activo)}
								style={{ marginTop: 6 }}
							/>
							<Text style={tw('text-xl mt-2 ')}>Activo</Text>
						</View>
					</View>
					<View style={tw('m-5 rounded-lg items-center mb-5')}>
						<Icon.Button name='save' onPress={handleSubmit}>
							Guardar
						</Icon.Button>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAwareScrollView>
	);
};

export default NuevoReto;
