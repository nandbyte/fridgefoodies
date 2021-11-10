import React from "react";

import { Heading, Box, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import {
    calorieOrderState,
    calorieSortState,
} from "../../state/recipe/calorie-recipe.state";

interface Props {}

const CalorieSearchCriteria: React.FC<Props> = (props: Props) => {
    const [sortType, setSortType] = useRecoilState(calorieSortState);
    const [orderType, setOrderType] = useRecoilState(calorieOrderState);

    const changeSortType = (value: string) => {
        setSortType(value);
        console.log(sortType, orderType);
    };

    const changeOrderType = (value: string) => {
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
                    value={sortType}
                    onChange={changeSortType}
                >
                    <Heading variant="subsection">2. Sort by - </Heading>
                    <Stack direction="column" space={2}>
                        <Radio value={"calories"}>Calories</Radio>
                        <Radio value={"rating"}>Rating</Radio>
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

export default CalorieSearchCriteria;
