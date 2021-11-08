import React from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import {
    Button,
    Center,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalFooter,
    useDisclosure,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";

interface Props {
    image: string;
    title: string;
    id: number;
    variant: "edit" | "showcase" | "ingredient";
}

const RecipeCard: React.FC<Props> = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();

    const editLink = `/edit-recipe/${props.id}`;
    const showLink: string = `/recipe/${props.id}`;

    const deleteRecipe = () => {
        onClose();
    };

    const DeleteModal = () => {
        return (
            <Modal
                blockScrollOnMount={true}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Recipe : {props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight="bold">
                            Are you sure you want to delete this recipe?
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Stack direction="row" spacing={4}>
                            <Button m={0} w={32} onClick={deleteRecipe}>
                                Delete
                            </Button>
                            <Button onClick={onClose} m={0} w={32}>
                                Cancel
                            </Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };

    const EditRecipeCard = () => {
        return (
            <Box
                p={2}
                borderRadius="md"
                border="2px solid"
                borderColor={"orange.700"}
                h={"375px"}
            >
                <Center>
                    <Image w="100%" src={props.image} />
                </Center>
                <DeleteModal />
                <Stack>
                    <Center>
                        <Heading>{props.title}</Heading>
                    </Center>
                    <Center>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-around"}
                        >
                            <Button
                                m={0}
                                onClick={() => {
                                    history.push(showLink);
                                }}
                            >
                                Show
                            </Button>
                            <Button
                                m={0}
                                onClick={() => {
                                    history.push(editLink);
                                }}
                            >
                                Edit
                            </Button>
                            <Button m={0} onClick={onOpen}>
                                Delete
                            </Button>
                        </Stack>
                    </Center>
                </Stack>
            </Box>
        );
    };

    const ShowRecipeCard = () => {
        return (
            <Link to={showLink}>
                <Box
                    p={2}
                    borderRadius="md"
                    border="2px solid"
                    borderColor={"orange.700"}
                    h={"340px"}
                    _hover={{
                        shadow: "md",
                    }}
                >
                    <Center>
                        <Image w="100%" src={props.image} />
                    </Center>
                    <Center>
                        <Heading>{props.title}</Heading>
                    </Center>
                </Box>
            </Link>
        );
    };

    if (props.variant === "edit") {
        return <EditRecipeCard />;
    } else {
        return <ShowRecipeCard />;
    }
};

export default RecipeCard;
