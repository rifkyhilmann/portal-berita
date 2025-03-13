import { ReactNode } from "react";
import { IconType } from "react-icons";

export interface LayoutAdminProps {
    children : React.ReactNode;
}

export interface InputProps {
    name? : string;
    placeholder?: string;
    size?: 'large' | 'middle' | 'small';
    type? : string;
    icon?: React.ReactNode;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputFieldProps extends InputProps {
    label: string
}

export interface SidebarMenuProps {
    title? : string;
    url? : string;
    Icon? : IconType;
    type? : string;
    submenu? : { title : string; url: string; Icon: IconType; }[] | undefined;
}

export interface SidebarProps  {
    isOpen? : boolean;
}

export interface EachUtilsProps<T> {
    of: T[];
    render: (item: T, index: number) => ReactNode;
}