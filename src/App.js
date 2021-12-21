import './App.css';
import FormGroup from './components/formGroup/FormGroup';
import Input from './components/input/Input.js';
import Label from './components/label/Label';
import { useState, useEffect } from 'react';


function App() {
	const [data, setdata] = useState({
		name: '',
		surname: '',
		type: '',
		NI: '',
		image: '',
	});
	const [errors, seterrors] = useState({
		name: false,
		surname: false,
		type: false,
		NI: false,
		image: false,
	});
	const [validationDone, setvalidationDone] = useState(false)
	const [showError, setshowError] = useState(false);
	const [showLoading, setshowLoading] = useState(false);

	useEffect(() => {
		if (Object.values(errors).every((item) => item === false) && validationDone) {
			setshowLoading(true)
			handleSubmit()
		}
	}, [errors])


	function handleChangeName(val) {
		val.length == 0 ? seterrors({ ...errors, name: true }) : seterrors({ ...errors, name: false });

		setdata({
			...data,
			['name']: val,
		});
	}
	function handleChangeSurname(val) {
		val.length == 0 ? seterrors({ ...errors, surname: true }) : seterrors({ ...errors, surname: false });
		setdata({
			...data,
			['surname']: val,
		});
	}
	function handleChangeType(val) {
		seterrors({ ...errors, type: false });
		setdata({
			...data,
			['type']: val,
		});
	}
	function handleChangeNI(val) {
		val.length == 0 ? seterrors({ ...errors, NI: true }) : seterrors({ ...errors, NI: false });
		setdata({
			...data,
			['NI']: val,
		});
	}
	function handleChangeImage(event) {
		if (event.target.files && event.target.files[0]) {
			if (event.target.files[0].name.match(/.(jpg|jpeg)$/i) === null) {
				seterrors({ ...errors, image: true });
				return;
			}
			setdata({
				...data,
				['image']: URL.createObjectURL(event.target.files[0]),
			});
			seterrors({ ...errors, image: false });
		} else {
			seterrors({ ...errors, image: true });
		}
	}
	async function handleSubmit() {
		try {
			const res = await fetch('https://localhost:60001/Contractor/Save', { method: 'POST' });
			setshowLoading(false);
			setshowError(false);
		} catch (error) {
			setshowLoading(false);
			setshowError(true);
		}
	}
	async function validateData(e) {
		e.preventDefault();

		if (data.name === '') seterrors({ ...errors, name: true });
		if (data.surname === '') seterrors((prevState) => ({ ...prevState, surname: true }));
		if (data.type === '') seterrors((prevState) => ({ ...prevState, type: true }));
		if (data.NI === '') seterrors((prevState) => ({ ...prevState, NI: true }));
		if (data.image === '') seterrors((prevState) => ({ ...prevState, image: true }));

		if (data.type == 'Osoba') {
			if (data.NI.length !== 11) {
				seterrors((prevState) => ({ ...prevState, NI: true }));
			} else {
				const numbers = [...data.NI];
				let sum = 0;
				numbers.forEach((value, index) => {
					value = parseInt(value);
					if ([1, 5, 9].includes(index + 1)) {
						sum += 1 * value;
					} else if ([2, 6, 10].includes(index + 1)) {
						sum += 3 * value;
					} else if ([3, 7].includes(index + 1)) {
						sum += 7 * value;
					} else if ([4, 8].includes(index + 1)) {
						sum += 9 * value;
					}
				});
				let lastNumber = [...toString(sum)][toString(sum).length - 1];
				parseInt(lastNumber) - 10 != numbers[numbers.length] ? seterrors((prevState) => ({ ...prevState, NI: false })) : seterrors((prevState) => ({ ...prevState, NI: true }));
			}
		} else if (data.type == 'Firma') {
			if (data.NI.length !== 10) {
				seterrors((prevState) => ({ ...prevState, NI: true }));
			} else {
				const numbers = [...data.NI];
				let sum = 0;
				numbers.forEach((value, index) => {
					value = parseInt(value);
					if ([1, 8].includes(index + 1)) {
						sum += 6 * value;
					} else if ([2, 7].includes(index + 1)) {
						sum += 5 * value;
					} else if ([3, 9].includes(index + 1)) {
						sum += 7 * value;
					} else if ([4].includes(index + 1)) {
						sum += 2 * value;
					} else if ([5].includes(index + 1)) {
						sum += 3 * value;
					} else if ([6].includes(index + 1)) {
						sum += 4 * value;
					}
				});
				let lastNumber = numbers[numbers.length - 1];
				parseInt(lastNumber) != sum % 11 ? seterrors((prevState) => ({ ...prevState, NI: true })) : seterrors((prevState) => ({ ...prevState, NI: false }));
			}
		}
		setvalidationDone(true);
		return;
	}
	console.log(errors);

	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center'>
			<h1 className='text-lg mb-5 text-violet-600'>Dodawanie Kontrahenta</h1>
			<form
				onSubmit={(e) => {
					validateData(e);
				}}
				/*action='http://localhost:60001/Contactor/Save' method='POST'*/ className='w-full h-auto max-w-sm border-solid border-gray-300/20 border-2 rounded-md shadow-md accent-violet-600'>
				<FormGroup>
					{/* Name input */}
					<Label props={{ text: 'Imię:', flex: 'flex-col', required: true }}>
						<Input props={{ placeholder: 'Jan', type: 'text', value: data.name, setter: handleChangeName }} error={errors.name} />
						{errors.name && <span className='text-sm font-medium my-2 text-red-500'>Pole nie może być puste</span>}
					</Label>
					{/* surname input */}
					<Label props={{ text: 'Nazwisko:', flex: 'flex-col', required: true }}>
						<Input props={{ placeholder: 'Kowalski', type: 'text', value: data.surname, setter: handleChangeSurname }} error={errors.surname} />

						{errors.surname && <span className='text-sm font-medium my-2 text-red-500'>Pole nie może być puste</span>}
					</Label>
					{/* radio inputs */}
					<Label props={{ text: `Typ:`, flex: 'flex-row space-x-4', required: true }}>
						<Label props={{ text: 'Osoba', flex: 'flex-row-reverse self-start items-center' }}>
							<Input props={{ type: 'radio', name: 'typ', value: 'Osoba', setter: handleChangeType }} error={errors.type} />
						</Label>
						<Label props={{ text: 'Firma', flex: 'flex-row-reverse self-start items-center' }}>
							<Input props={{ type: 'radio', name: 'typ', value: 'Firma', setter: handleChangeType }} error={errors.type} />
						</Label>
					</Label>

					{errors.type && <span className='text-sm font-medium my-2 text-red-500'>Typ musi zostać wybrany</span>}

					{/* NI input */}
					<Label props={{ text: `Numer identyfikacyjny ${data.type === 'Osoba' || data.type == '' ? '(PESEL):' : '(NIP):'}`, flex: 'flex-col', required: true }}>
						<Input
							props={{
								placeholder: `Numer ${data.type === 'Osoba' || data.type == '' ? '(PESEL)' : '(NIP)'}`,
								type: 'text',
								value: data.NI,
								setter: handleChangeNI,
							}}
							error={errors.NI}
						/>

						{errors.NI && (
							<span className='text-sm font-medium my-2 text-red-500'>Proszę wprowadzić prawidłowy {data.type === 'Osoba' || data.type == '' ? '(PESEL)' : '(NIP)'} </span>
						)}
					</Label>

					{/* if corrected images choosen, then show preview in 1:1 aspect ratio */}
					{data.image != '' ? <img src={data.image} className='aspect-[1/1]' /> : ''}

					{/* file input */}
					<Label props={{ text: 'Zdjęcie:', flex: 'flex-col', required: true }}>
						<Input props={{ placeholder: 'Jan', type: 'file', value: data.image, setter: handleChangeImage }} error={errors.name} />

						{errors.image && <span className='text-sm font-medium my-2 text-red-500'>Proszę wybrać prawidłowe zdjęcie jpg/jpeg </span>}
					</Label>

					{showLoading && (
						<div className='flex flex-row justify-center items-center space-x-4'>
							<div className='border-t-transparent w-8 h-8 border-4 border-violet-500 border-double rounded-full animate-spin'></div>
							<span className='text-md text-violet-500'>Przetwarzanie...</span>
						</div>
					)}
					{showError && (
						<div className='px-4 py-3 leading-normal text-red-100 bg-red-700 rounded-lg' role='alert'>
							<p>Nie znaleziono metody zapisu!</p>
						</div>
					)}

					<Input props={{ value: 'Dodaj', type: 'submit' }} />
				</FormGroup>
			</form>
		</div>
	);
}

export default App;
