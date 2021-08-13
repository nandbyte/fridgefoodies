import { mode } from "@chakra-ui/theme-tools";

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode("orange.100", "orange.100")(props),
        },
    }),
};

export default styles;
