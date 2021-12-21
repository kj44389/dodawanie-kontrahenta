import React from 'react';

function Input({ props, error }) {
	function inputSwitch(type) {
		switch (props.type) {
			default:
				return (
					<input
						type={props.type}
						placeholder={props.placeholder}
						defaultValue={props.value}
						name={props.name}
						onBlur={(e) => props.setter(e.target.value)}
						className={`input p-2 border-solid border-gray-200 border-2 rounded-lg border-violet-400
						 		focus:outline-violet-600 focus:outline-2 transition-colors 
								 ${error && 'outline-red-500 border-red-500 accent-red-500'}`}
					/>
				);
			case 'radio':
				return (
					<input
						type={props.type}
						placeholder={props.placeholder}
						value={props.value}
						name={props.name}
						onChange={(e) => props.setter(e.target.value)}
						className={`input p-2 border-solid border-gray-200 border-2 rounded-lg border-violet-400
								focus:outline-violet-600 focus:outline-2 transition-colors
								${error && 'outline-red-500 border-red-500 accent-red-500'}`}
					/>
				);
			case 'submit':
				return (
					<input
						type={props.type}
						placeholder={props.placeholder}
						defaultValue={props.value}
						name={props.name}
						className='input w-full p-2 border-solid border-violet-600 text-gray-800 border-2 rounded-lg transition-colors
						 		hover:bg-violet-600 hover:text-gray-100'
					/>
				);
			case 'file':
				return (
					<input
						type={props.type}
						placeholder={props.placeholder}
						defaultValue={props.value}
						name={props.name}
						onChange={(e) => props.setter(e)}
						className={`input w-full rounded-lg file:transition-colors
						  		  file:rounded-xl file:border-2 file:border-violet-400 file:border-solid file:bg-transparent file:text-violet-400 
								hover:file:invalid:border-violet-600  hover:file:bg-violet-600 hover:file:border-violet-600
						 		hover:file:text-gray-200 file:py-2 file:px-4 file:mr-4 file:text-sm file:font-semibold
								 ${error && 'file:border-red-500 file:text-red-500 outline-red-500 border-red-500'}`}
					/>
				);
		}
	}

	return inputSwitch(props.type);
}

export default Input;
