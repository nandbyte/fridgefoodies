import React, { useEffect, useState } from "react";
import { Heading, Stack } from "@chakra-ui/layout";
import { Input, FormLabel, FormControl } from "@chakra-ui/react";
import SectionDivider from "../../components/SectionDivider";
import PageContainer from "../../components/PageContainer";
import PageSection from "../../components/PageSection";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { Image } from "cloudinary-react";

const EditRecipePage = (props: any) => {
    const [recipeTitle, setRecipeTitle] = useState<string>("");
    const [ingredient, setIngredient] = useState<string>("");
    const [instruction, setInstruction] = useState<string>("");

    const [imageSelected, setImageSelected] = useState<string>("");

    const uploadImage = () => {
        //console.log(files[0]);
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "g9faugip")
     

        
        axios.post("https://api.cloudinary.com/v1_1/charlatane2499/image/upload", formData).then((response) => {
            console.log(response);
        })

    };


    useEffect(() => {
        console.log('render');
    }, []);

    return (
        <PageContainer variant="navbar">
            <Heading variant="page">Edit Your Recipe</Heading>
            <SectionDivider />

            <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
                <PageSection>
                    {/* Recipe title will already be set */}

                    <Heading variant="section">Edit Recipe Title
                    </Heading>
                    <SectionDivider />

                    <FormControl id="recipe-title">
                        <FormLabel>
                        </FormLabel>
                        <Input variant="flushed"
                            placeholder="eg.Fried Rice,Shahi Mughal Biriyani.."
                            size="lg"
                            value={recipeTitle}
                            type="text"
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
                    <Heading variant="section">Edit Image</Heading>
                    <SectionDivider />
                    <Input type="file" onChange={(event) => {
                        setImageSelected(event.target.files[0]);
                    }}  >

                    </Input>
                    <Button type="submit" onClick={uploadImage}>Upload Image</Button>

                     <Image style={{ width:500,height:500 }}
                        cloudName="charlatane2499"
                        publicId=""
                        //publicId="https://res.cloudinary.com/charlatane2499/image/upload/v1635979399/sample.jpg"
                        //publicId={images.map(image => <img src = {image} alt=" " />)} 
                        /> 
                        

                </PageSection>


                <PageSection>
                    <Heading variant="section">Edit Ingredients</Heading>
                    <SectionDivider />
                    <FormControl id="ingredient">
                        <Input variant="flushed"
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
                    <Heading variant="section">Edit Instructions</Heading>
                    <SectionDivider />

                    <FormControl id="instruction">
                        <FormLabel>
                        </FormLabel>
                        <Input variant="flushed"
                            placeholder="eg. One cup of milk with half spoon sugar ..."
                            size="lg"
                            value={instruction}
                            type="text"
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
                <Button type='submit' boxShadow='sm'
                    _hover={{ boxShadow: 'md' }}
                    _active={{ boxShadow: 'lg' }} >
                    Edit Recipe
                </Button>
            </Stack>
        </PageContainer>
    );
};

export default EditRecipePage;
