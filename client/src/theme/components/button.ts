import { ButtonProps } from "@chakra-ui/button";

const Button = {
    baseStyle: (props: ButtonProps) => ({
        w: { base: "50%", lg: "25%" },
        fontWeight: "normal",
    }),
    variants: {
        solid: (props: ButtonProps) => ({
            my: 4,
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "white",
            bgColor: "orange.500",
            _hover: {
                bg: "orange.400",
                _disabled: {
                    bg: "black",
                },
            },
            _disabled: {
                bg: "orange.800",
            },
        }),
    },
};

export default Button;
