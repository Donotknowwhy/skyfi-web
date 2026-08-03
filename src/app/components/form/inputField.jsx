import { useController } from 'react-hook-form';

const InputField = ({ 
    label, 
    inputLabel,
    type = 'text', 
    name, 
    placeholder, 
    required, 
    control,
    disabled = false,
    maxLength,
    classInput = '',
    error: externalError,
    className, 
    classNameLabel,
    // Props for register pattern
    id,
    value,
    onChange,
    onBlur,
    ...rest 
}) => {
    // Nếu có control và name, sử dụng useController
    if (control && name) {
        const { 
            field: { onChange: controlOnChange, value: controlValue, onBlur: controlOnBlur },
            fieldState: { error }
        } = useController({ control, name });
        
        return (
            <div className={`flex flex-col gap-[4px] ${className}`}>
                <label className={`flex font-inter text-[12px] text-[#333] ${classNameLabel}`}>
                    {inputLabel || label} {required && <span className="text-[#E60A32] font-bold">*</span>}
                </label>
                <input
                    type={type}
                    id={id || name}
                    name={name}
                    placeholder={placeholder}
                    value={controlValue || ''}
                    onChange={controlOnChange}
                    onBlur={controlOnBlur}
                    disabled={disabled}
                    maxLength={maxLength}
                    className={`font-inter text-[16px] text-[#333] p-[10px_16px] border border-[#DDDDDD] rounded-[12px] focus:outline-none focus:border-primary ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${classInput}`}
                    required={required}
                    {...rest}
                />
                {error && <span className="text-[#E60A32] text-[12px]">{error.message}</span>}
            </div>
        );
    }
    
    // Pattern cho register
    return (
        <div className={`flex flex-col gap-[4px] ${className}`}>
            <label className={`flex font-inter text-[12px] text-[#333]   ${classNameLabel}`}>
                {inputLabel || label} {required && <span className="text-[#E60A32] font-bold">*</span>}
            </label>
            <input
                type={type}
                id={id || name}
                name={name}
                placeholder={placeholder}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                maxLength={maxLength}
                className={`font-inter text-[16px] text-[#333] p-[10px_16px] border border-[#DDDDDD] rounded-[12px] focus:outline-none focus:border-primary ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${classInput}`}
                required={required}
                {...rest}
            />
            {externalError && <span className="text-[#E60A32] text-[12px]">{externalError}</span>}
        </div>
    );
};

export default InputField;
