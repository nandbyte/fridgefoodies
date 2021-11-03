import React from "react";
import { Box } from "@chakra-ui/layout";
import { Center, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
    image: string;
    title: string;
    id: string;
}

const RecipeCard: React.FC<Props> = (props: Props) => {
    return (
        <Link to={`/recipe/${props.id}`}>
            <Box p={2} borderRadius="md" border="2px solid orange">
                <Center>
                    <Image w="100%" src={props.image} />
                </Center>
                <Center>
                    <Heading>{props.title}</Heading>{" "}
                </Center>
            </Box>
        </Link>
    );
};

export default RecipeCard;
