
import { InputProps } from "@/types/components.types";
import { Input as AntdInput } from "antd";

const Input = ({ 
    placeholder = "Masukkan teks...", 
    icon, 
    name,
    className, 
    value, 
    size, 
    onChange, 
    type,
    ...rest 
}: InputProps) => {
    return (
        <AntdInput 
            name={name}
            size={size}
            placeholder={placeholder}
            prefix={icon}
            className={`${className}`}
            type={type}
            value={value}
            onChange={onChange}
            style={{  outlineColor: "#0B598D" }}
            {...rest}
        />
    );
};

export default Input;
