import React from "react";

import { Heading, Box, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import {
    ingredientFilterState,
    ingredientOrderState,
    ingredientSortState,
} from "../../state/recipe/ingredient-recipe.state";

interface Props {}

const SearchCriteria: React.FC<Props> = (props: Props) => {
    const [filterType, setFilterType] = useRecoilState(ingredientFilterState);
    const [sortType, setSortType] = useRecoilState(ingredientSortState);
    const [orderType, setOrderType] = useRecoilState(ingredientOrderState);

    const changeFilterType = (value: string) => {
        setFilterType(parseInt(value));
    };

    const changeSortType = (value: string) => {
        setSortType(parseInt(value));
    };

    const changeOrderType = (value: string) => {
        setOrderType(parseInt(value));
    };

    // const sortRecipes = () => {
    //     let intermediateList = [...matchingRecipes];
    // };

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
