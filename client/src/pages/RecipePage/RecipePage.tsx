import React, { useEffect, useState } from "react";
import {
    Center,
    Image,
    Text,
    Box,
    Button,
    ResponsiveValue,
    Textarea,
    IconButton,
} from "@chakra-ui/react";
import { Heading, Stack, SimpleGrid, GridItem } from "@chakra-ui/layout";

import { useParams } from "react-router-dom";
import { getCaloriesById, getRecipeById } from "../../api/recipe.api";
import PageSection from "../../components/PageSection";
import PageContainer from "../../components/PageContainer";
import SectionDivider from "../../components/SectionDivider";
import Loading from "../../components/Loading";
import { Recipe } from "../../state/types/recipe.type";
import RecipeIngredientTable from "../../components/RecipeIngredientTable";
import { RecipeIngredient } from "../../state/types/recipe-ingredient.type";
import { FaSuperpowers, FaThumbsUp } from "react-icons/fa";
import { Comment } from "../../state/types/comment.type";
import { foodieState } from "../../state/foodie/foodie.state";
import { useRecoilValue } from "recoil";
import { postComment, deleteComment } from "../../api/comment.api";
import {
    getRatingByRecipe,
    getRatingByUser,
    postRating,
} from "../../api/rating.api";

interface CommentProps {
    comment: Comment;
}

const RecipePage = (props: any) => {
    const [recipe, setRecipe]: any = useState<Recipe>(null);
    const [recipeIngredients, setRecipeIngredients] = useState<
        RecipeIngredient[]
    >([]);

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState<string>("");
    const [postCommentLoading, setPostCommentLoading] =
        useState<boolean>(false);
    const [ratingDisabled, setRatingDisabled] = useState<boolean>(true);
    const [ratingCount, setRatingCount] = useState<number>(0);
    const [calories, setCalories] = useState<number>(0);

    const foodie = useRecoilValue(foodieState);

    let { id }: any = useParams();

    useEffect(() => {
        getRecipeById(id)
            .then((response) => {
                setRecipe({
                    ...response.data.data.recipe[0],
                    recipeRating: response.data.data.totalRating,
                });

                setRatingCount(response.data.data.totalRating);
                setRecipeIngredients(response.data.data.recipeIngredients);
                setComments(response.data.data.comments);
            })
            .catch((error) => console.log(error));
    }, [id]);

    useEffect(() => {
        if (foodie !== null) {
            getRatingByUser(foodie?.foodieId, id)
                .then((response) =>
                    setRatingDisabled(response.data.data.rated !== false)
                )
                .catch((error) => console.log(error));
        }
    }, []);

    const CommentComponent: React.FC<CommentProps> = (props: CommentProps) => {
        const [deleteCommentLoading, setDeleteCommentLoading] =
            useState<boolean>(false);

        const displayDeleteButton: ResponsiveValue<any> = () => {
            if (foodie !== null)
                if (foodie.foodieId === props.comment.foodieId) return "block";

            return "none";
        };

        return (
            <Box
                p={2}
                borderWidth={1}
                borderStyle={"dotted"}
                borderColor={"orange.500"}
                borderRadius={8}
            >
                <SimpleGrid columns={{ base: 1, lg: 6 }}>
                    <GridItem colSpan={{ base: 1, lg: 5 }}>
                        <Stack spacing={8}>
                            <Text fontSize="lg">
                                {props.comment.commentText}
                            </Text>
                            <Text fontWeight="bold">
                                {" "}
                                - {props.comment.foodieName}
                            </Text>
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button
                            p={2}
                            w={{ base: "full", lg: "full" }}
                            mx={1}
                            my={{ base: 2, lg: 0 }}
                            height="100%"
                            loading={deleteCommentLoading}
                            onClick={() => {
                                setDeleteCommentLoading(true);
                                deleteComment(props.comment.commentId)
                                    .then((response) => {
                                        setComments(
                                            response.data.data.comments
                                        );
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                                setDeleteCommentLoading(false);
                            }}
                            display={displayDeleteButton}
                        >
                            Delete
                        </Button>{" "}
                    </GridItem>{" "}
                </SimpleGrid>
            </Box>
        );
    };

    const rateRecipe = () => {
        postRating(foodie?.foodieId, recipe.recipeId)
            .then((response) => {
                console.log(response.data);
                setRatingDisabled(true);

                getRatingByRecipe(id).then((response) => {
                    setRatingCount(response.data.data.rating);
                });
            })
            .catch((error) => console.log(error));
    };

    const RatingComponent = () => {
        return (
            <Stack>
                <Center>
                    <IconButton
                        m={0}
                        mx={0}
                        my={0}
                        p={4}
                        w="auto"
                        h="auto"
                        aria-label="rate"
                        icon={<FaThumbsUp size="25" />}
                        onClick={rateRecipe}
                        disabled={foodie === null}
                    />
                </Center>
                <Center>
                    <Heading>{ratingCount}</Heading>
                </Center>
            </Stack>
        );
    };

    useEffect(() => {
        getCaloriesById(id)
            .then((response) => setCalories(response.data.data.totalCalories))
            .catch((error) => console.log(error));
    }, []);

    const CalorieComponent = () => {
        return (
            <Stack>
                <Center>
                    <IconButton
                        m={0}
                        mx={0}
                        my={0}
                        p={4}
                        w="auto"
                        h="auto"
                        aria-label="rate"
                        icon={<FaSuperpowers size="25" />}
                        disabled={true}
                    />
                </Center>
                <Stack>
                    <Center>
                        <Heading>{calories} </Heading>
                    </Center>
                    <Center>
                        <Heading>cal </Heading>
                    </Center>
                </Stack>
            </Stack>
        );
    };

    return (
        <PageContainer variant="navbar">
            {recipe === null ? (
                <Loading />
            ) : (
                <>
                    <Text
                        fontSize={{ base: 16, lg: 24 }}
                        textAlign={{ base: "center", lg: "left" }}
                        fontWeight="black"
                        textTransform="uppercase"
                    >
                        Recipe
                    </Text>
                    <SectionDivider />
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack>
                            <Heading variant="page">
                                {recipe.recipeTitle}
                            </Heading>
                            <Stack direction="row">
                                <Text fontSize="xl" fontWeight="bold">
                                    Author:{" "}
                                </Text>
                                <Text fontSize="xl">{recipe.foodieName}</Text>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={6}>
                            <CalorieComponent />
                            <RatingComponent />
                        </Stack>
                    </Stack>
                    <Center py={24}>
                        <Image
                            borderRadius="md"
                            w={{ base: "100%", lg: "50%" }}
                            src={recipe.recipeImage}
                        />
                    </Center>

                    <Stack
                        px={0}
                        mx={0}
                        justifyContent="space-between"
                        spacing={12}
                    >
                        <PageSection>
                            <Heading variant="section">Ingredients</Heading>
                            <SectionDivider />
                            <RecipeIngredientTable
                                recipeIngredients={recipeIngredients}
                            />
                        </PageSection>

                        <PageSection>
                            <Heading variant="section">Instructions</Heading>
                            <SectionDivider />
                            <Stack spacing={4}>
                                {recipe.recipeText
                                    .split("\n")
                                    .map((text: string) => {
                                        return (
                                            <Text fontSize="xl">{text}</Text>
                                        );
                                    })}
                            </Stack>
                        </PageSection>

                        <Box py={4} pt={16}>
                            <Heading variant="section">Comments</Heading>
                            <SectionDivider />
                            {foodie !== null ? (
                                <SimpleGrid columns={{ base: 1, lg: 6 }}>
                                    <GridItem colSpan={{ base: 1, lg: 5 }}>
                                        <Textarea
                                            // display={}

                                            variant="outline"
                                            placeholder="Comment"
                                            p={2}
                                            value={commentText}
                                            onChange={(event) => {
                                                setCommentText(
                                                    event.target.value
                                                );
                                            }}
                                            _hover={{
                                                borderColor: "orange.300",
                                            }}
                                            borderColor="orange.600"
                                            focusBorderColor="orange.400"
                                        />
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Button
                                            p={2}
                                            w={{ base: "full", lg: "full" }}
                                            mx={1}
                                            my={{ base: 2, lg: 0 }}
                                            height="100%"
                                            isLoading={postCommentLoading}
                                            onClick={() => {
                                                setPostCommentLoading(true);
                                                postComment({
                                                    commentId: 0,
                                                    foodieId: foodie!.foodieId,
                                                    foodieName:
                                                        foodie!.foodieName,
                                                    recipeId: recipe.recipeId,
                                                    commentText: commentText,
                                                })
                                                    .then((response) => {
                                                        setComments(
                                                            response.data.data
                                                                .comments
                                                        );

                                                        setCommentText("");
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    });
                                                setPostCommentLoading(false);
                                            }}
                                        >
                                            Comment
                                        </Button>
                                    </GridItem>
                                </SimpleGrid>
                            ) : (
                                <></>
                            )}

                            <Stack spacing={2} py={2} pt={6}>
                                {comments.map((comment) => (
                                    <CommentComponent comment={comment} />
                                ))}
                            </Stack>
                        </Box>
                    </Stack>
                </>
            )}
        </PageContainer>
    );
};

export default RecipePage;
