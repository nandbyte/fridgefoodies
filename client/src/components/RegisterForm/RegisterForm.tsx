import React, { useEffect, useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";
import bcryptjs from "bcryptjs";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { register } from "../../api/foodie.api.ts";
import { foodieState } from "../../state/foodie/foodie.state";

interface Props {}

const RegisterForm: React.FC<Props> = (props: Props) => {
    const toast = useToast();

    const history = useHistory();

    const [name, setName] = useState<string>("");

    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [foodie] = useRecoilState(foodieState);

    useEffect(() => {
        if (foodie !== null) {
            toast({
                position: "top",
                title: "Error",
                description: "Please log out first.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            setTimeout(() => history.push("/profile"), 1500);
        }
    }, []);

    const handleRegister: React.MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        event.preventDefault();

        const emailRegexPattern =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (password !== confirmPassword) {
            toast({
                position: "top",
                title: "Error",
                description: "The passwords do not match.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        } else if (!emailRegexPattern.test(email)) {
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
                    register(email, name, hashedPassword)
                        .then((response) => {
                            toast({
                                position: "top",
                                title: "Success",
                                description: "Registered successfully",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                            });
                            setTimeout(() => history.push("/login"), 1500);
                        })
                        .catch((error) => {
                            console.log(error);
                            toast({
                                position: "top",
                                title: "Error",
                                description: "Registration failed.",
                                status: "error",
                                duration: 2000,
                                isClosable: true,
                            });
                        })
                );
        }
    };

    return (
        <Stack spacing={6} p={4}>
            <form>
                <Stack spacing={{ base: 8 }}>
                    <FormControl id="register-name">
                        <FormLabel>
                            <Heading>Name</Heading>
                        </FormLabel>
                        <Input
                            placeholder="John"
                            size="lg"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            _hover={{
                                borderColor: "orange.300",
                            }}
                            borderColor="orange.600"
                            focusBorderColor="orange.400"
                        />
                    </FormControl>{" "}
                    <FormControl id="register-email">
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
                    <FormControl id="register-password">
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
                    <FormControl id="register-password-confirmation">
                        <FormLabel>
                            <Heading>Confirm Password</Heading>
                        </FormLabel>
                        <Input
                            placeholder="**********"
                            size="lg"
                            value={confirmPassword}
                            type="password"
                            onChange={(event) => {
                                setConfirmPassword(event.target.value);
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
                <Text fontSize="2xl" fontWeight="normal">
                    Already have an account?
                    <Link
                        textDecoration="underline"
                        _hover={{
                            fontWeight: "bold",
                        }}
                        href="/login"
                    >
                        Login
                    </Link>
                </Text>
            </Stack>
        </Stack>
    );
};

export default RegisterForm;
