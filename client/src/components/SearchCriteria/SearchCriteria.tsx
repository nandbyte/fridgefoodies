import React from "react";

import { Heading, Box, Stack } from "@chakra-ui/layout";
import { Button, Radio, RadioGroup } from "@chakra-ui/react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
    setFilterType,
    setSortType,
    setOrderType,
} from "../../state/recipe/find-recipe-by-ingredients.slice";
import { Recipe } from "../../state/recipe/recipe.type";

interface Props {}

const SearchCriteria: React.FC<Props> = (props: Props) => {
    const dispatch = useTypedDispatch();

    const { filterType, sortType, orderType, matchingRecipes } =
        useTypedSelector((state) => state.findRecipeByIngredients);

    const changeFilterType = (value: string) => {
        dispatch(setFilterType(parseInt(value)));
    };

    const changeSortType = (value: string) => {
        dispatch(setSortType(parseInt(value)));
    };

    const changeOrderType = (value: string) => {
        dispatch(setOrderType(parseInt(value)));
    };

    const sortRecipes = () => {
        let intermediateList = [...matchingRecipes];
    };

    return (
        <Box>
            <Stack
                direction={{ base: "column", xl: "row" }}
                justifyContent="flex-start"
                spacing={24}
            >
                <RadioGroup
                    colorScheme={"orange"}
                    value={filterType}
                    onChange={changeFilterType}
                >
                    <Heading variant="subsection">1. Filter By - </Heading>
                    <Stack direction="column" space={2}>
                        <Radio value={0}>Ingredient</Radio>
                        <Radio value={1}>Best Match</Radio>
                    </Stack>
                </RadioGroup>

                <RadioGroup
                    colorScheme={"orange"}
                    value={sortType}
                    onChange={changeSortType}
                >
                    <Heading variant="subsection">2. Sort by - </Heading>
                    <Stack direction="column" space={2}>
                        <Radio value={0}>Rating</Radio>
                        <Radio value={1}>Alphabetical</Radio>
                    </Stack>
                </RadioGroup>

                <RadioGroup
                    colorScheme={"orange"}
                    value={orderType}
                    onChange={changeOrderType}
                >
                    <Heading variant="subsection">3. Order by - </Heading>
                    <Stack direction="column" space={2}>
                        <Radio value={0}>Ascending</Radio>
                        <Radio value={1}>Descending</Radio>
                    </Stack>
                </RadioGroup>
            </Stack>
        </Box>
    );
};

export default SearchCriteria;
