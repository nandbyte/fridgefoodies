import React from "react";
import { Box } from "@chakra-ui/layout";

interface Props {
    children?: any;
}

const PageSection: React.FC<Props> = (props: Props) => {
    return (
        <Box
            p={4}
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
