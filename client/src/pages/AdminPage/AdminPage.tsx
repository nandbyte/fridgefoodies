import React, { useState, useEffect } from "react";
import bcryptjs from "bcryptjs";

import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    useToast,
} from "@chakra-ui/react";

import { Text } from "@chakra-ui/layout";
import { FaSignInAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { login } from "../../api/foodie.api.ts";
import { foodieJwtState, foodieState } from "../../state/foodie/foodie.state";
import SectionDivider from "../../components/SectionDivider";
import PageSection from "../../components/PageSection";
import PageContainer from "../../components/PageContainer";

const AdminPage = () => {
    const toast = useToast();

    const history = useHistory();

    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [foodie, setFoodie] = useRecoilState(foodieState);

    const [jwt, setJwt] = useRecoilState(foodieJwtState);

    // useEffect(() => {
    //     if (foodie.foodieId !== "") {
    //         toast({
    //             position: "top",
    //             title: "Error",
    //             description: "Please log out first.",
    //             status: "error",
    //             duration: 2000,
    //             isClosable: true,
    //         });
    //         setTimeout(() => history.push("/profile"), 1500);
    //     }
    // }, []);

    const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        const emailRegexPattern =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!emailRegexPattern.test(email)) {
            toast({
                position: "top",
                title: "Error",
                description: "Please provide a valid email address.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        } else {
            bcryptjs
                .hash(password, "$2a$10$5874nLVXZq5CSbNxKsMTYu")
                .then((hashedPassword: string) =>
                    login(email, hashedPassword)
                        .then((response) => {
                            setFoodie(response.data.data.foodie);
                            setJwt(response.data.data.token);
                            window.localStorage.setItem(
                                "Token",
                                response.data.data.token
                            );
                            window.localStorage.setItem(
                                "FoodieId",
                                response.data.data.foodie.foodieId
                            );
                            window.localStorage.setItem(
                                "Foodie",
                                JSON.stringify(response.data.data.foodie)
                            );

                            console.log(
                                "Foodie Logged In - \n" +
                                    "Bearer " +
                                    window.localStorage.getItem("Token") +
                                    "\nFoodie" +
                                    window.localStorage.getItem("Foodie") +
                                    "\nFoodie" +
                                    window.localStorage.getItem("FoodieId")
                            );

                            console.log(response.data.data.foodie);

                            toast({
                                position: "top",
                                title: "Success",
                                description: "Logged in successfully",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                            });

                            setTimeout(() => history.push("/profile"), 1500);
                        })
                        .catch((error) => {
                            toast({
                                position: "top",
                                title: "Error",
                                description: "Login Failed",
                                status: "error",
                                duration: 2000,
                                isClosable: true,
                            });
                        })
                );
        }
    };

    return (
        <PageContainer variant="jumbotron">
            <Heading variant="page">Admin Login</Heading>
            <SectionDivider />

            <PageSection>
                <Stack spacing={6} p={4}>
                    <form>
                        <Stack spacing={{ base: 8 }}>
                            <FormControl id="login-email">
                                <FormLabel>
                                    <Heading>Email</Heading>
                                </FormLabel>
                                <Input
                                    placeholder="gordon@lambsauce.com"
                                    size="lg"
                                    value={email}
                                    type="email"
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                    _hover={{
                                        borderColor: "orange.300",
                                    }}
                                    borderColor="orange.600"
                                    focusBorderColor="orange.400"
                                />
                            </FormControl>
                            <FormControl id="login-password">
                                <FormLabel>
                                    <Heading>Password</Heading>
                                </FormLabel>
                                <Input
                                    placeholder="**********"
                                    size="lg"
                                    value={password}
                                    type="password"
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    _hover={{
                                        borderColor: "orange.300",
                                    }}
                                    borderColor="orange.600"
                                    focusBorderColor="orange.400"
                                />
                            </FormControl>
                        </Stack>
                    </form>
                    <Stack direction="column" spacing="4" py={4}>
                        <Button
                            onClick={handleLogin}
                            leftIcon={<FaSignInAlt />}
                            fontSize="lg"
                            disabled={email === "" || password === ""}
                        >
                            Login
                        </Button>
                    </Stack>
                </Stack>
            </PageSection>
        </PageContainer>
    );
};

export default AdminPage;
