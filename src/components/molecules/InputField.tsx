
import { InputFieldProps } from "@/types/components.types"
import Input from "../atoms/Input"


const InputField = ({
    label,
    placeholder = "Masukkan teks...", 
    icon, 
    name,
    size,
    className, 
    value, 
    type, 
    onChange, 
    ...rest 
} : InputFieldProps) => {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs ">{label}</span>
            <Input
                name={name} 
                placeholder={placeholder}
                icon={icon}
                size={size}
                type={type}
                className={className}
                value={value}
                onChange={onChange}
                {...rest}
            />
        </div>
    )
}

export default InputField