import React from "react";
import { Heading, Box } from "@chakra-ui/layout";

import PageContainer from "../../components/PageContainer";
import SubsectionDivider from "../../components/SubsectionDivider";
import LoginForm from "../../components/LoginForm";
import { Redirect } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import PageSection from "../../components/PageSection";

const LoginPage = () => {
    const { foodie: user } = useTypedSelector((state) => state.foodie);
    if (user) {
        return <Redirect to="/create-recipe" />;
    }

    return (
        <PageContainer variant="jumbotron">
            <Heading variant="page">Login</Heading>
            <SubsectionDivider />

            <PageSection>
                <LoginForm />
            </PageSection>
        </PageContainer>
    );
};

export default LoginPage;
