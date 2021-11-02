import { TextProps } from "@chakra-ui/layout";

const Heading = {
    variants: {
        page: (props: TextProps) => ({
            fontSize: "6xl",
            textAlign: { base: "center", lg: "left" },
            fontWeight: "black",
        }),
        section: (props: TextProps) => ({
            textAlign: { base: "center", lg: "left" },
            fontWeight: "black",
        }),
        subsection: (props: TextProps) => ({
            fontSize: "2xl",
            textAlign: "left",
            fontWeight: "black",
            py: 4,
        }),
    },
};

export default Heading;
