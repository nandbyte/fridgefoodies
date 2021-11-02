import React from "react";
import { Box } from "@chakra-ui/layout";
import AnimationAppear from "../AnimationAppear";

interface Props {}

const SectionDivider = (props: Props) => {
    return (
        <AnimationAppear duration={1}>
            <Box mt={2} mb={2}>
                <hr
                    style={{
                        border: 0,
                        height: "2px",
                        background: "#C05621",
                    }}
                ></hr>
            </Box>
        </AnimationAppear>
    );
};

export default SectionDivider;
