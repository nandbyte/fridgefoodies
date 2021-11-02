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
} from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";

import { useTypedSelector } from "../../hooks/useTypedSelector";

interface Props {}

const RegisterForm: React.FC<Props> = (props: Props) => {
    const error = null;

    const registerUser = async () => {
        // await register(email, name, password);
    };

    const handleRegister: React.MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        event.preventDefault();

        const emailRegexPattern =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (password !== confirmPassword) {
            setRegisterError("The passwords do not match.");
        } else if (!emailRegexPattern.test(email)) {
            setRegisterError("Please provide a valid email address.");
        } else {
            setRegisterError("");
        }
    };

    useEffect(() => {
        setRegisterError(error === null ? "" : error);
    }, [error]);

    const [name, setName] = useState<string>("");

    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [registerError, setRegisterError] = useState<string>("");

    return (
        <Stack spacing={6} p={4}>
            <form>
                <Stack spacing={{ base: 8 }}>
                    {registerError !== "" ? (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle
                                mr={2}
                                fontSize={{ lg: "lg" }}
                                color="gray.900"
                            >
                                {registerError}
                            </AlertTitle>
                        </Alert>
                    ) : (
                        <></>
                    )}
                    <FormControl id="register-name">
                        <FormLabel>
                            <Heading
                                fontSize={{
                                    base: "xl",
                                    lg: "2xl",
                                }}
                                py={4}
                            >
                                Name
                            </Heading>
                        </FormLabel>
                        <Input
                            placeholder="John"
                            size="lg"
                            fontFamily="Montserrat"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </FormControl>{" "}
                    <FormControl id="register-email">
                        <FormLabel>
                            <Heading
                                fontSize={{
                                    base: "xl",
                                    lg: "2xl",
                                }}
                                py={4}
                            >
                                Email
                            </Heading>
                        </FormLabel>
                        <Input
                            placeholder="gordon@lambsauce.com"
                            size="lg"
                            value={email}
                            type="email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </FormControl>
                    <FormControl id="register-password">
                        <FormLabel>
                            <Heading
                                fontSize={{
                                    base: "xl",
                                    lg: "2xl",
                                }}
                                py={4}
                            >
                                Password
                            </Heading>
                        </FormLabel>
                        <Input
                            placeholder="**********"
                            size="lg"
                            value={password}
                            type="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </FormControl>{" "}
                    <FormControl id="register-password-confirmation">
                        <FormLabel>
                            <Heading
                                fontSize={{
                                    base: "xl",
                                    lg: "2xl",
                                }}
                                py={4}
                            >
                                Confirm Password
                            </Heading>
                        </FormLabel>
                        <Input
                            placeholder="**********"
                            size="lg"
                            value={confirmPassword}
                            type="password"
                            onChange={(event) => {
                                setConfirmPassword(event.target.value);
                            }}
                        />
                    </FormControl>
                </Stack>
            </form>
            <Stack direction="column" spacing="4" py={4}>
                <Button
                    onClick={handleRegister}
                    leftIcon={<FaUserPlus />}
                    fontSize="lg"
                    disabled={
                        email === "" ||
                        password === "" ||
                        name === "" ||
                        confirmPassword === ""
                    }
                >
                    Register
                </Button>
                <Heading fontSize="lg" fontWeight="normal">
                    Already have an account?
                    <Link
                        textDecoration="underline"
                        fontSize="lg"
                        _hover={{
                            fontWeight: "bold",
                        }}
                        href="/login"
                    >
                        Login
                    </Link>
                </Heading>
            </Stack>
        </Stack>
    );
};

export default RegisterForm;
