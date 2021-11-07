import React, { useEffect, useState } from "react";

import { Heading, Stack } from "@chakra-ui/layout";
import {
    Input,
    FormLabel,
    FormControl,
    Textarea,
    Text,
    useToast,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    FormHelperText,
} from "@chakra-ui/react";

import SectionDivider from "../../components/SectionDivider";
import PageContainer from "../../components/PageContainer";
import PageSection from "../../components/PageSection";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { Image } from "cloudinary-react";
import Loading from "../../components/Loading";
import { useHistory, useParams } from "react-router-dom";
import { foodieState } from "../../state/foodie/foodie.state";
import { useRecoilState } from "recoil";
import { getRecipeById, putRecipe } from "../../api/recipe.api";
import {
    deleteRecipeIngredient,
    getRecipeIngredients,
    postRecipeIngredient,
} from "../../api/recipe-ingredient.api";
import { Ingredient } from "../../state/types/ingredient.type";
import { ingredientState } from "../../state/ingredient/ingredient.state";
import { getIngredients } from "../../api/ingredient.api";
import RecipeIngredientTable from "../../components/RecipeIngredientTable";
import { RecipeIngredient } from "../../state/types/recipe-ingredient.type";

const EditRecipePage = (props: any) => {
    const toast = useToast();
    const history = useHistory();
    const { id }: any = useParams();

    const [recipeTitle, setRecipeTitle] = useState<string>("");
    const [instruction, setInstruction] = useState<string>("");
    const [imageSelected, setImageSelected] = useState("");
    const [cloudinaryLink, setCloudinaryLink] = useState<string>("");
    const [imageLoading, setImageLoading] = useState<boolean>(false);

    const [ingredientList, setIngredientList] = useRecoilState(ingredientState);
    const [foodie] = useRecoilState(foodieState);

    //const [images,setImages] = useState([]);

    const [recipeIngredients, setRecipeIngredients] = useState<
        RecipeIngredient[]
    >([]);
    const [ingredient, setIngredient] = useState<Ingredient>();
    const [ingredientVariant, setIngredientVariant] = useState<string>("");
    const [ingredientQuantity, setIngredientQuantity] = useState<string>("");
    const [ingredientGuide, setIngredientGuide] = useState<string>("");

    const EditRecipeIngredient = () => {
        return (
            <Box>
                <Table variant="simple" colorScheme={"black"}>
                    <Thead>
                        <Tr>
                            <Th fontSize="xl">Ingredient</Th>
                            <Th fontSize="xl">Variant</Th>
                            <Th fontSize="xl">Guide</Th>
                            <Th fontSize="xl">Quantity</Th>
                            <Th fontSize="xl">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recipeIngredients.map((recipeIngredient) => {
                            return (
                                <Tr>
                                    <Td>{recipeIngredient.ingredientName}</Td>
                                    <Td>
                                        {recipeIngredient.ingredientVariant}
                                    </Td>
                                    <Td>{recipeIngredient.ingredientGuide}</Td>
                                    <Td>
                                        {recipeIngredient.ingredientQuantity}
                                    </Td>
                                    <Td>
                                        <Button
                                            px={12}
                                            onClick={() => {
                                                deleteRecipeIngredient(
                                                    recipeIngredient.recipeIngredientId
                                                )
                                                    .then((response) => {
                                                        setRecipeIngredients(
                                                            response.data.data
                                                                .recipeIngredients
                                                        );
                                                    })
                                                    .catch((error) =>
                                                        console.log(error)
                                                    );
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Box>
        );
    };

    useEffect(() => {
        if (foodie.foodieId === "") {
            toast({
                position: "top",
                title: "Error",
                description: "Please log in first.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            setTimeout(() => history.push("/login"), 1500);
        }
    }, []);

    useEffect(() => {
        getIngredients()
            .then((response) =>
                setIngredientList(response.data.data.ingredient)
            )
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (foodie.foodieId !== "") {
            getRecipeById(id)
                .then((response) => {
                    console.log(response);

                    setRecipeTitle(response.data.data.recipe[0].recipeTitle);
                    setInstruction(response.data.data.recipe[0].recipeText);
                    setCloudinaryLink(response.data.data.recipe[0].recipeImage);
                })
                .catch((error) => console.log(error));

            getRecipeIngredients(id)
                .then((response) => {
                    setRecipeIngredients(response.data.data.recipeIngredients);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    const editRecipe = () => {
        putRecipe({
            foodieId: foodie.foodieId,
            recipeId: id,
            recipeTitle,
            recipeImage: cloudinaryLink,
            recipeText: instruction,
        })
            .then(() => {
                history.push("/recipe/" + id);
            })
            .catch((error) => console.log(error));
    };

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
            <Heading variant="page">Edit Recipe Entry</Heading>
            <SectionDivider />

            <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
                <PageSection>
                    {/* Recipe title will already be set */}

                    <Heading variant="section">Recipe Title</Heading>
                    <SectionDivider />

                    <FormLabel></FormLabel>
                    <Text>{recipeTitle}</Text>
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
                        <EditRecipeIngredient />
                        <Heading pt={6} variant="section">
                            Add a new ingredient
                        </Heading>
                        <SectionDivider />
                        <Heading variant="subsection">Ingredient Name</Heading>
                        <Select
                            placeholder={"Select Ingredient"}
                            value={ingredient?.ingredientId}
                            onChange={(event) =>
                                setIngredient(
                                    ingredientList[
                                        parseInt(event.target.value) - 1
                                    ]
                                )
                            }
                        >
                            {ingredientList.map((ingredientObject) => {
                                return (
                                    <option
                                        key={ingredientObject.ingredientId}
                                        value={ingredientObject.ingredientId}
                                    >
                                        {
                                            ingredientList[
                                                ingredientObject.ingredientId -
                                                    1
                                            ].ingredientName
                                        }
                                    </option>
                                );
                            })}
                        </Select>
                        <Heading variant="subsection">Variant</Heading>
                        <Input
                            placeholder="Variant"
                            value={ingredientVariant}
                            onChange={(event) => {
                                setIngredientVariant(event.target.value);
                            }}
                            _hover={{
                                borderColor: "orange.300",
                            }}
                            borderColor="orange.600"
                            focusBorderColor="orange.400"
                        />{" "}
                        <Heading variant="subsection">Guide</Heading>
                        <Input
                            placeholder="Guide"
                            value={ingredientGuide}
                            onChange={(event) => {
                                setIngredientGuide(event.target.value);
                            }}
                            _hover={{
                                borderColor: "orange.300",
                            }}
                            borderColor="orange.600"
                            focusBorderColor="orange.400"
                        />
                        <Heading variant="subsection">Quantity</Heading>
                        <Input
                            placeholder="Quantity"
                            value={ingredientQuantity}
                            onChange={(event) => {
                                setIngredientQuantity(event.target.value);
                            }}
                            _hover={{
                                borderColor: "orange.300",
                            }}
                            borderColor="orange.600"
                            focusBorderColor="orange.400"
                        />
                        <Button
                            px={12}
                            onClick={() => {
                                postRecipeIngredient({
                                    foodieId: foodie.foodieId,
                                    recipeId: id,
                                    ingredientId: ingredient?.ingredientId,
                                    ingredientVariant,
                                    ingredientGuide,
                                    ingredientQuantity,
                                })
                                    // TODO: Add api call for fetching the whoel recipe Ingredient object
                                    .then((response) =>
                                        setRecipeIngredients(
                                            response.data.data.recipeIngredients
                                        )
                                    )
                                    .catch((error) => console.log(error));
                            }}
                        >
                            Add
                        </Button>
                        {/* TODO: Edit button for recipe Ingredients */}
                    </FormControl>
                </PageSection>

                <PageSection>
                    <Heading variant="section">Instructions</Heading>
                    <SectionDivider />

                    <FormControl id="instruction">
                        <Textarea
                            variant="outline"
                            placeholder="..."
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
                    onClick={editRecipe}
                    disabled={instruction === "" || cloudinaryLink === ""}
                >
                    Submit Recipe
                </Button>
            </Stack>
        </PageContainer>
    );
};

export default EditRecipePage;