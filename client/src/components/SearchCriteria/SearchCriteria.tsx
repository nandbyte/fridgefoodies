import React from "react";

import { Heading, Box, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import {
    ingredientFilterState,
    ingredientMatchingRecipeState,
    ingredientOrderState,
    ingredientSortState,
} from "../../state/recipe/ingredient-recipe.state";

interface Props {}

const SearchCriteria: React.FC<Props> = (props: Props) => {
    const [filterType, setFilterType] = useRecoilState(ingredientFilterState);
    const [sortType, setSortType] = useRecoilState(ingredientSortState);
    const [orderType, setOrderType] = useRecoilState(ingredientOrderState);
    const [ingredientMatchingRecipe, setIngredientMatchingRecipe] =
        useRecoilState(ingredientMatchingRecipeState);

    const changeFilterType = (value: string) => {
        setIngredientMatchingRecipe([]);
        setFilterType(value);
    };

    const changeSortType = (value: string) => {
        setIngredientMatchingRecipe([]);
        setSortType(value);
    };

    const changeOrderType = (value: string) => {
        setIngredientMatchingRecipe([]);
        setOrderType(value);
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
                        <Radio value={"best"}>
                            Including your ingredients and more.
                        </Radio>
                        <Radio value={"bounded"}>
                            Including your incredients only.
                        </Radio>
                    </Stack>
                </RadioGroup>

                <RadioGroup
                    colorScheme={"orange"}
                    value={sortType}
                    onChange={changeSortType}
                >
                    <Heading variant="subsection">2. Sort by - </Heading>
                    <Stack direction="column" space={2}>
                        <Radio value={"rating"}>Rating</Radio>
                        <Radio value={"alphabet"}>Alphabetical</Radio>
                    </Stack>
                </RadioGroup>

                <RadioGroup
                    colorScheme={"orange"}
                    value={orderType}
                    onChange={changeOrderType}
                >
                    <Heading variant="subsection">3. Order by - </Heading>
                    <Stack direction="column" space={2}>
                        <Radio value={"desc"}>Descending</Radio>
                        <Radio value={"asc"}>Ascending</Radio>
                    </Stack>
                </RadioGroup>
            </Stack>
        </Box>
    );
};

export default SearchCriteria;
