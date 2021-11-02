import React from "react";
import { Heading, Box } from "@chakra-ui/layout";

import PageContainer from "../../components/PageContainer";
import SubsectionDivider from "../../components/SubsectionDivider";
import RegisterForm from "../../components/RegisterForm";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Registered from "../../components/Registered";
import LoggedIn from "../../components/LoggedIn";
import { Redirect } from "react-router-dom";

const RegisterPage = () => {
    const { foodie: user } = useTypedSelector((state) => state.foodie);
    if (user) {
        return <Redirect to="/create-recipe" />;
    }

    return (
        <PageContainer variant="jumbotron">
            <Heading textAlign={{ base: "left" }} fontWeight="black">
                Register
            </Heading>
            <SubsectionDivider />

            <Box
                w="100%"
                bgColor="gray.700"
                color="white"
                px={6}
                py={4}
                borderRadius="md"
            >
                <RegisterForm />
            </Box>
        </PageContainer>
    );
};

export default RegisterPage;
