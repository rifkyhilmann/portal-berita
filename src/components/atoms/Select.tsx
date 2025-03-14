
import React from "react";
import { Select as AntdSelect } from "antd";
import { SelectProps } from "@/types/components.types";


const Select = ({ 
    options, 
    placeholder, 
    onChange, 
    onSearch 
} : SelectProps) => {
    return (
        <AntdSelect
            showSearch
            placeholder={placeholder}
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={options}
        />
    );
};

export default Select;
