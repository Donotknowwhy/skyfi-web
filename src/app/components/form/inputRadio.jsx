import { useController } from 'react-hook-form';

const InputRadio = ( { id, name, control, label, value ,checked } ) => {
	const filed = useController( { control, name } );

	return (
		<label htmlFor={id} className="flex flex-row items-center gap-[8px] cursor-pointer">
			<div className="relative w-[20px] h-[20px]">
				<input
					type="radio"
					id={ id }
					{ ...filed.field }
					value={ value }
					checked={ checked }
					className="absolute peer opacity-0 w-full h-full cursor-pointer"
				/>
				<div className="w-[20px] h-[20px] rounded-full border peer-checked:border-primary border-gray-500 bg-white flex items-center justify-center absolute top-0 left-0 pointer-events-none"/>

					<div className="w-[10px] h-[10px] absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2 rounded-full peer-checked:bg-primary bg-transparent"></div>
			</div>
			{ label ? <span className="font-inter font-medium text-[16px] leading-[1.5em] text-[#333]">{ label }</span> : null}
		</label>
	);
};

export default InputRadio;