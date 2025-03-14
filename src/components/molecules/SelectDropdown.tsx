import { SelectDropdownProps } from "@/types/components.types"
import Select from "../atoms/Select"


const SelectDropdown = ({
    options,
    onSelectChange,
    label,
    placeholder
} : SelectDropdownProps) => {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs ">{label}</span>
            <Select
                options={options}
                onChange={onSelectChange}
                placeholder={placeholder || "Select"}
            />
        </div>
    )
}

export default SelectDropdown