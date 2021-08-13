import { Box } from "@chakra-ui/layout";
import React from "react";

const PageContainer = (props: any) => {
    return (
        <Box mx={{ base: 12, lg: 16, xl: 24 }} my={12}>
            {props.children}
        </Box>
    );
};

export default PageContainer;
