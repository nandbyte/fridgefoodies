import { SelectProps } from "@chakra-ui/select";

const Select = {
    variants: {
        outline: (props: SelectProps) => ({
            fontWeight: "bold",
            size: "lg",
            colorScheme: "orange",
            borderColor: "orange.800",
            focusBorderColor: "orange.500",
        }),
    },
    defaultProps: {
        focusBorderColor: "orange.500",
        colorScheme: "orange",
        borderColor: "orange.800",
    },
};

export default Select;
