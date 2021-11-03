import React from "react";
import { Heading, Box } from "@chakra-ui/layout";

import PageContainer from "../../components/PageContainer";
import SubsectionDivider from "../../components/SubsectionDivider";
import RegisterForm from "../../components/RegisterForm";
import { Redirect } from "react-router-dom";
import PageSection from "../../components/PageSection";

const RegisterPage = () => {
    // if (user) {
    //     return <Redirect to="/create-recipe" />;
    // }

    return (
        <PageContainer variant="jumbotron">
            <Heading variant="page">Register</Heading>
            <SubsectionDivider />

            <PageSection>
                <RegisterForm />
            </PageSection>
        </PageContainer>
    );
};

export default RegisterPage;
