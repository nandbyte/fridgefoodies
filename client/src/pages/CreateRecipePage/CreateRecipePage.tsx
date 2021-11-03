import React, { useEffect, useState } from "react";

import { Heading, Stack } from "@chakra-ui/layout";

import SectionDivider from "../../components/SectionDivider";
import PageContainer from "../../components/PageContainer";
import PageSection from "../../components/PageSection";
import { Button } from "@chakra-ui/react";

const CreateRecipePage = (props: any) => {
    useEffect(() => {}, []);

    return (
        <PageContainer variant="navbar">
            <Heading variant="page">Create a New Recipe</Heading>
            <SectionDivider />

            <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
                <PageSection>
                    {/* Recipe title will already be set */}
                    <Heading variant="section">Recipe Title</Heading>
                    <SectionDivider />
                </PageSection>
                <PageSection>
                    <Heading variant="section">Image</Heading>
                    <SectionDivider />
                </PageSection>
                <PageSection>
                    <Heading variant="section">Ingredients</Heading>
                    <SectionDivider />
                </PageSection>
                <PageSection>
                    <Heading variant="section">Instructions</Heading>
                    <SectionDivider />
                </PageSection>
                <Button>Submit Recipe</Button>
            </Stack>
        </PageContainer>
    );
};

export default CreateRecipePage;
