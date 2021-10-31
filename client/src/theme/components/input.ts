import { InputProps } from "@chakra-ui/input";

const Input = {
    variants: {
        outline: (props: InputProps) => ({
            fontWeight: "bold",
            colorScheme: "orange",
            borderColor: "orange.800",
            focusBorderColor: "orange.500",
        }),
    },
    defaultProps: {
        focusBorderColor: "red.50",
    },
};

export default Input;
