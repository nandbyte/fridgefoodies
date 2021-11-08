import React, { useState } from "react";
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
    useToast,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { deleteRecipeById } from "../../api/recipe.api";

interface Props {
    image: string;
    title: string;
    id: number;
    triggerFunction?: React.Dispatch<React.SetStateAction<boolean>>;
    trigger?: boolean;
    variant: "edit" | "showcase" | "ingredient";
}

const RecipeCard: React.FC<Props> = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const toast = useToast();

    const [loading, setLoading] = useState(false);

    const editLink = `/edit-recipe/${props.id}`;
    const showLink: string = `/recipe/${props.id}`;

    const deleteRecipe = () => {
        setLoading(true);
        deleteRecipeById(props.id)
            .then((response) => {
                console.log(response);
                toast({
                    position: "top",
                    title: "Success",
                    description: "Deleted the recipe successfully.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                onClose();
                setLoading(false);
                if (props.triggerFunction !== undefined) {
                    props.triggerFunction(!props.trigger);
                }
            })
            .catch((error) => {
                toast({
                    position: "top",
                    title: "Error",
                    description: "Deletion failed.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
                console.log(error);
                setLoading(false);
            });
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
                            <Button
                                m={0}
                                w={32}
                                onClick={deleteRecipe}
                                isLoading={loading}
                            >
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
