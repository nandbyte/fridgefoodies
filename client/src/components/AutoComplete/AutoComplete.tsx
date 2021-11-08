import React, { useEffect } from "react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

import {
    findRecipeByIngredientTabValue,
    ingredientState,
    selectedIngredientsState,
} from "../../state/ingredient/ingredient.state";
import { useRecoilState, useRecoilValue } from "recoil";
import { getIngredients } from "../../api/ingredient.api";

interface Props {}

const AutoComplete: React.FC<Props> = (props: Props) => {
    const toast = useToast();

    const [ingredients, setIngredients] = useRecoilState(ingredientState);
    const [selectedIngredients, setSelectedIngredients] = useRecoilState(
        selectedIngredientsState
    );

    const pageData = useRecoilValue(findRecipeByIngredientTabValue);

    useEffect(() => {
        getIngredients()
            .then((response) => setIngredients(response.data.data.ingredient))
            .catch((error) => {
                console.log(error);
            });
    }, []); // eslint-disable-line

    const [selectedItems, setSelectedItems] = React.useState([]);

    const handleSelectedItemsChange = (selectedItems: any) => {
        setSelectedItems(selectedItems);
        console.log(selectedItems);
        setSelectedIngredients(
            selectedItems.map((item: any) => parseInt(item.value))
        );
    };

    return (
        <Box>
            <CUIAutoComplete
                label="Choose Ingredients"
                placeholder="Ingredient"
                items={pageData.ingredientDropdownList}
                inputStyleProps={{
                    colorScheme: "orange",
                    borderColor: "orange.500",
                    focusBorderColor: "orange.400",
                    _placeholder: {
                        color: "blackAlpha.600",
                    },
                }}
                listItemStyleProps={{
                    _hover: {
                        cursor: "pointer",
                    },
                }}
                listStyleProps={{
                    position: "absolute",
                    width: "intrinsic",
                    maxHeight: "256px",
                    overflowY: "auto",
                    zIndex: "overlay",
                    shadow: "lg",
                }}
                tagStyleProps={{
                    display: "none",
                }}
                labelStyleProps={{
                    display: "none",
                }}
                highlightItemBg="orange.200"
                selectedItems={selectedItems}
                onSelectedItemsChange={(changes) =>
                    handleSelectedItemsChange(changes.selectedItems)
                }
                hideToggleButton
                disableCreateItem
            />
        </Box>
    );
};

export default AutoComplete;
