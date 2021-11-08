import React from "react";

import { Heading, Box, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import {
    titleOrderState,
    titleSortState,
} from "../../state/recipe/title-recipe.state";

interface Props {}

const TitleSearchCriteria: React.FC<Props> = (props: Props) => {
    const [sortType, setSortType] = useRecoilState(titleSortState);
    const [orderType, setOrderType] = useRecoilState(titleOrderState);

    const changeSortType = (value: string) => {
        setSortType(value);
    };

    const changeOrderType = (value: string) => {
        setOrderType(value);
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
                    value={sortType}
                    onChange={changeSortType}
                >
                    <Heading variant="subsection">1. Sort by - </Heading>
                    <Stack direction="column" space={2}>
                        <Radio value={"rating"}>Rating</Radio>
                        <Radio value={"alphabet"}>Alphabet</Radio>
                    </Stack>
                </RadioGroup>

                <RadioGroup
                    colorScheme={"orange"}
                    value={orderType}
                    onChange={changeOrderType}
                >
                    <Heading variant="subsection">2. Order by - </Heading>
                    <Stack direction="column" space={2}>
                        <Radio value={"desc"}>Descending</Radio>
                        <Radio value={"asc"}>Ascending</Radio>
                    </Stack>
                </RadioGroup>
            </Stack>
        </Box>
    );
};

export default TitleSearchCriteria;
