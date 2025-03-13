import { EachUtilsProps } from "@/types/components.types";
import { Children } from "react";

const Each = <T,>({ 
    of, 
    render 
} : EachUtilsProps<T>) => {
    return Children.toArray(of.map((item, index) => render(item, index)));
};

export default Each;