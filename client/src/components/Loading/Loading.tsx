import React from "react";
import { Center, CircularProgress } from "@chakra-ui/react";

interface Props {}

const Loading: React.FC<Props> = (props: Props) => {
    return (
        <Center py={8}>
            <CircularProgress isIndeterminate color="orange.600" />
        </Center>
    );
};

export default Loading;
