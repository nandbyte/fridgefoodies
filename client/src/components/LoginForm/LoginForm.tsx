import React, { useState } from "react";
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

interface Props {}

const LoginForm: React.FC<Props> = (props: Props) => {
    const toast = useToast();

    const history = useHistory();

    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

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
            // bcryptjs
            //     .hash(password, "$2a$10$5874nLVXZq5CSbNxKsMTYu")
            //     .then((hashedPassword: string) =>
            //         loginUser({ email, password: hashedPassword })
            //             .unwrap()
            //             .then((payload) => {
            //                 toast({
            //                     position: "top",
            //                     title: "Success",
            //                     description: "Logged in successfully",
            //                     status: "success",
            //                     duration: 2000,
            //                     isClosable: true,
            //                 });
            //                 setTimeout(
            //                     () => history.push("/create-recipe"),
            //                     2000
            //                 );
            //             })
            //             .catch((error) => {
            //                 toast({
            //                     position: "top",
            //                     title: "Error",
            //                     description: error.data.error,
            //                     status: "error",
            //                     duration: 2000,
            //                     isClosable: true,
            //                 });
            //             })
            //     );
        }
    };

    return (
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
                <Text fontSize="2xl" fontWeight="normal">
                    Don't have an account?
                    <Link
                        textDecoration="underline"
                        _hover={{
                            fontWeight: "bold",
                        }}
                        href="/register"
                    >
                        Register
                    </Link>
                </Text>
            </Stack>
        </Stack>
    );
};

export default LoginForm;
