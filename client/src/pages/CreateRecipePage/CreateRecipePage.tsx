import React, { useState } from "react";

import { Heading, Stack } from "@chakra-ui/layout";
import {
    Input,
    FormLabel,
    FormControl,
    Textarea,
    Text,
    useToast,
} from "@chakra-ui/react";

import SectionDivider from "../../components/SectionDivider";
import PageContainer from "../../components/PageContainer";
import PageSection from "../../components/PageSection";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { Image } from "cloudinary-react";
import Loading from "../../components/Loading";

const CreateRecipePage = (props: any) => {
    const toast = useToast();

    const [recipeTitle, setRecipeTitle] = useState<string>("");
    const [ingredient, setIngredient] = useState<string>("");
    const [instruction, setInstruction] = useState<string>("");
    const [imageSelected, setImageSelected] = useState("");
    const [cloudinaryLink, setCloudinaryLink] = useState<string>("");
    const [imageLoading, setImageLoading] = useState<boolean>(false);

    //const [images,setImages] = useState([]);

    const uploadImage = () => {
        //console.log(files[0]);
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "g9faugip");
        setImageLoading(true);
        axios
            .post(
                "https://api.cloudinary.com/v1_1/charlatane2499/image/upload",
                formData
            )
            .then((response) => {
                console.log(response.data);
                setCloudinaryLink(response.data.secure_url);
                toast({
                    position: "top",
                    title: "Success",
                    description: "Image uploaded successfully.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                console.log(error);
                toast({
                    position: "top",
                    title: "Error",
                    description:
                        "Something unexpected occurred. Please reupload",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            });
        setImageLoading(false);

        /*fetch("https://api.cloudinary.com/v1_1/dvn255pxj/image/upload", {
           method:'POST',
           body:formData,
       })
         .then((req)=>req.json())
         .then((req) => {
            setImages(images => [...images,res.secure_url]);
         })
            .catch((error) => console.log(console.error));*/
    };

    return (
        <PageContainer variant="navbar">
            <Heading variant="page">Create a New Recipe</Heading>
            <SectionDivider />

            <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
                <PageSection>
                    {/* Recipe title will already be set */}

                    <Heading variant="section">Recipe Title</Heading>
                    <SectionDivider />

                    <FormControl id="recipe-title">
                        <FormLabel></FormLabel>
                        <Input
                            variant="flushed"
                            p={2}
                            placeholder="Chicken Fry"
                            size="lg"
                            value={recipeTitle}
                            onChange={(event) => {
                                setRecipeTitle(event.target.value);
                            }}
                            _hover={{
                                borderColor: "orange.300",
                            }}
                            borderColor="orange.600"
                            focusBorderColor="orange.400"
                        />
                    </FormControl>
                </PageSection>

                <PageSection>
                    <Heading variant="section">Image</Heading>
                    <SectionDivider />
                    <FormLabel
                        for="image-upload"
                        my={4}
                        py={2}
                        textAlign="center"
                        textTransform="uppercase"
                        fontWeight="bold"
                        color="white"
                        bgColor="orange.500"
                        borderRadius="md"
                        _hover={{
                            backgroundColor: "orange.400",
                            _disabled: {
                                backgroundColor: "black",
                            },
                        }}
                        _disabled={{
                            backgroundColor: "orange.800",
                        }}
                        width="268px"
                        height="10"
                        cursor={"pointer"}
                    >
                        Choose File
                    </FormLabel>
                    <Input
                        id="image-upload"
                        display="none"
                        variant="unstyled"
                        type="file"
                        onChange={(event) => {
                            setImageSelected(event.target.files[0]);
                            toast({
                                position: "top",
                                title: "Success",
                                description:
                                    "Image has been selected. Please upload it.",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                            });
                        }}
                    />
                    {cloudinaryLink !== "" ? (
                        <Image
                            w={{ base: "100%", lg: "50%" }}
                            src={cloudinaryLink}
                        />
                    ) : (
                        <Text>Choose an image and upload it.</Text>
                    )}
                    {imageLoading === true ? <Loading /> : <></>}
                    <Button
                        disabled={imageSelected === ""}
                        onClick={uploadImage}
                    >
                        Upload Image
                    </Button>
                </PageSection>

                <PageSection>
                    <Heading variant="section">Ingredients</Heading>
                    <SectionDivider />
                    <FormControl id="ingredient">
                        <Input
                            variant="flushed"
                            p={2}
                            placeholder="eg.potato,rice,egg.."
                            size="lg"
                            value={ingredient}
                            type="text"
                            onChange={(event) => {
                                setIngredient(event.target.value);
                            }}
                            _hover={{
                                borderColor: "orange.300",
                            }}
                            borderColor="orange.600"
                            focusBorderColor="orange.400"
                        />
                    </FormControl>
                </PageSection>

                <PageSection>
                    <Heading variant="section">Instructions</Heading>
                    <SectionDivider />

                    <FormControl id="instruction">
                        <FormLabel></FormLabel>
                        <Textarea
                            variant="outline"
                            placeholder="eg. One cup of milk with half spoon sugar ..."
                            size="xl"
                            p={2}
                            value={instruction}
                            onChange={(event) => {
                                setInstruction(event.target.value);
                            }}
                            _hover={{
                                borderColor: "orange.300",
                            }}
                            borderColor="orange.600"
                            focusBorderColor="orange.400"
                        />
                    </FormControl>
                </PageSection>
                <Button
                    boxShadow="sm"
                    _hover={{ boxShadow: "md" }}
                    _active={{ boxShadow: "lg" }}
                >
                    Submit Recipe
                </Button>
            </Stack>
        </PageContainer>
    );
};

export default CreateRecipePage;
