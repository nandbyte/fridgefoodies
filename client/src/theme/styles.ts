import { mode } from "@chakra-ui/theme-tools";

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode("orange.50", "orange.50")(props),
        },
    }),
};

export default styles;
