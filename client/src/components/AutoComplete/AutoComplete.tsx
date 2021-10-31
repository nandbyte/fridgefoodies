import React, { useEffect } from "react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { getAllIngredients } from "../../api";
import { Box } from "@chakra-ui/layout";
import { useDispatch } from "react-redux";
import {
    selectRecommendationsLoading,
    setSelectedIngredients,
} from "../../state/slices/recipe.find.slice";

interface Props {}

const AutoComplete: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();

    const [ingredients, setIngredients] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState([]);

    useEffect(() => {
        (async function () {
            try {
                const response = await getAllIngredients();
                console.log(response);
                let ingredientList: any = [];

                // TODO: Convert this into your API comsumption mode
                response.data.meals.forEach((ingredient: any) => {
                    ingredientList.push({
                        value: ingredient.strIngredient,
                        label: ingredient.strIngredient,
                    });
                });

                setIngredients(ingredientList);

                console.log(ingredients);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []); // eslint-disable-line

    const handleSelectedItemsChange = (selectedItems: any) => {
        if (selectedItems) {
            setSelectedItems(selectedItems);
            dispatch(
                setSelectedIngredients(
                    selectedItems.map((selectedItem: any) => {
                        return selectedItem.label;
                    })
                )
            );
        }
    };

    return (
        <Box>
            <CUIAutoComplete
                label="Choose Ingredients"
                placeholder="Ingredient"
                items={ingredients}
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
