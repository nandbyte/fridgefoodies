import React from "react";
import { Box } from "@chakra-ui/layout";
import AnimationAppear from "../AnimationAppear";

interface Props {}

const SubsectionDivider = (props: Props) => {
    return (
        <AnimationAppear duration={1}>
            <Box mt={2} mb={4} w={{ base: "100%", lg: "50%" }}>
                <hr
                    style={{
                        border: 0,
                        height: "2px",
                        background: "#ed8936",
                    }}
                ></hr>
            </Box>{" "}
        </AnimationAppear>
    );
};

export default SubsectionDivider;
