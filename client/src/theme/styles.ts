import { mode } from "@chakra-ui/theme-tools";

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode("orange.50", "orange.50")(props),
        },

        "html, body": {
            "&::-webkit-scrollbar": {
                width: "12px",
            },
            "&::-webkit-scrollbar-track": {
                width: "12px",
                backgroundColor: "orange.100",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "orange.700",
                borderRadius: "12px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "orange.600",
            },
        },
    }),
};

export default styles;
