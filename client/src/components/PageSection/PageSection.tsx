import React from "react";
import { Box } from "@chakra-ui/layout";

interface Props {
    children?: any;
}

const PageSection: React.FC<Props> = (props: Props) => {
    return (
        <Box
            my={8}
            p={8}
            borderWidth={2}
            borderStyle={"dashed"}
            borderColor={"orange.600"}
            borderRadius={8}
        >
            {props.children}
        </Box>
    );
};

export default PageSection;
