import React, { useEffect, useState } from "react";

import { Heading, Stack } from "@chakra-ui/layout";
import { Input, FormLabel, FormControl } from "@chakra-ui/react";

import SectionDivider from "../../components/SectionDivider";
import PageContainer from "../../components/PageContainer";
import PageSection from "../../components/PageSection";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { Image } from "cloudinary-react";

const CreateRecipePage = (props: any) => {
    const [recipeTitle, setRecipeTitle] = useState<string>("");
    const [ingredient, setIngredient] = useState<string>("");
    const [instruction, setInstruction] = useState<string>("");

    const [imageSelected, setImageSelected] = useState<string>("");
    const [images,setImages] = useState([]);

    const uploadImage = () => {
        //console.log(files);
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "yag004g1")
     

        
        axios.post("https://api.cloudinary.com/v1_1/dvn255pxj/image/upload", formData).then((response) => {
            console.log(response);
        })
        
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


    useEffect(() => {
        console.log('render');
    }, []);

    return (
        <PageContainer variant="navbar">
            <Heading variant="page">Create a New Recipe</Heading>
            <SectionDivider />

            <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
                <PageSection>
                    {/* Recipe title will already be set */}

                    <Heading variant="section">Recipe Title
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
                    <Heading variant="section">Image</Heading>
                    <SectionDivider />
                    <Input type="file" onLoad={(event) => {
                        setImageSelected(event.target.files[0]);
                    }}  >

                    </Input>
                    <Button type="submit" onClick={uploadImage}>Upload Image</Button>

                     <Image style={{ }}
                        cloudName="dvn255pxj"
                        src = {imageSelected}
                        
                        //publicId={images.map(image => <img src = {image} alt=" " />)} 
                        /> 
                        

                </PageSection>


                <PageSection>
                    <Heading variant="section">Ingredients</Heading>
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
                    <Heading variant="section">Instructions</Heading>
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
                    Submit Recipe
                </Button>
            </Stack>
        </PageContainer>
    );
};

export default CreateRecipePage;
