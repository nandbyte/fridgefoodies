import React from "react";
import { Box } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import AnimationZoom from "../AnimationZoom";

interface Props {}

const Credit = (props: Props) => {
    const fontSize = { base: 12, lg: 16 };
    return (
        <AnimationZoom>
            <Box py={{ base: 4 }} id="credit">
                <Heading
                    textAlign={{ base: "center" }}
                    fontSize={fontSize}
                    color="orange.500"
                >
                    Developed by Nandbyte
                </Heading>
            </Box>
        </AnimationZoom>
    );
};

export default Credit;
