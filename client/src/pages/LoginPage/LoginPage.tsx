import React, { useEffect } from "react";
import { Heading } from "@chakra-ui/layout";
import { useHistory } from "react-router-dom";

import PageContainer from "../../components/PageContainer";
import SubsectionDivider from "../../components/SubsectionDivider";
import LoginForm from "../../components/LoginForm";
import PageSection from "../../components/PageSection";

const LoginPage = () => {
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
