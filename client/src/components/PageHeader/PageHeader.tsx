import React from "react";
import { Heading } from "@chakra-ui/layout";

const PageHeader = (props: any) => {
    return (
        <Heading fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="bold" mb={8}>
            {props.children}
        </Heading>
    );
};

export default PageHeader;
