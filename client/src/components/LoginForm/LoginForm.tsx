import React, { useEffect, useState } from "react";
import {
    Alert,
    AlertIcon,
    AlertTitle,
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
import { useLoginMutation } from "../../state/foodie/foodie.api.slice";

interface Props {}

const LoginForm: React.FC<Props> = (props: Props) => {
    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [loginError, setLoginError] = useState("");

    const [loginUser, { data, error }] = useLoginMutation();

    const toast = useToast();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        const emailRegexPattern =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!emailRegexPattern.test(email)) {
            setLoginError("Please provide a valid email address.");
            toast({
                position: "top",
                title: "Error",
                description: loginError,
                status: "error",
                duration: 1000,
                isClosable: true,
            });
        } else {
            loginUser({ email, password });
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
                            borderColor="orange"
                            focusBorderColor="orange.400"
                            colorScheme="orange"
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
                            borderColor="orange"
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
