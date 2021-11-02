import { Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import React from "react";

const LogoContainer = () => {
    const image: string = "/images/fridgefoodies-logo.png";

    return (
        <Box m={2} p={2}>
            <Image objectFit="cover" src={image} alt="Logo" w={36} />
        </Box>
    );
};

export default LogoContainer;

// Alternate Form:
// const image: string = useColorModeValue(
//     "/images/logo-light.png",
//     "/images/logo-dark.png"
// );

// return (
//     <Box m={2} p={2}>
//         <Image objectFit="cover" src={image} alt="Logo" w={48} />
//     </Box>
// );
