import React, { useEffect } from "react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { Box } from "@chakra-ui/layout";
import { useDispatch } from "react-redux";
import { setSelectedIngredients } from "../../state/recipe/find-recipe-by-ingredients.slice";
import { setIngredients } from "../../state/ingredient/ingredient.slice";
import { useFetchIngredientsMutation } from "../../state/ingredient/ingredient.api.slice";
import { useToast } from "@chakra-ui/toast";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import axios from "axios";
import { baseUrl } from "../../config/api";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";

interface Props {}

const AutoComplete: React.FC<Props> = (props: Props) => {
    const dispatch = useTypedDispatch();

    const toast = useToast();

    const { ingredientList } = useTypedSelector((state) => state.ingredient);

    const [fetchIngredients, { data, isUninitialized, isSuccess }] =
        useFetchIngredientsMutation();

    useEffect(() => {
        fetchIngredients(0);
    }, []); // eslint-disable-line

    useEffect(() => {
        if (!isUninitialized && isSuccess) {
            useTypedDispatch(setIngredients(data.ingredient));
            console.log(ingredientList);
        }
    }, [isUninitialized, isSuccess]); // eslint-disable-line

    useEffect(() => {
        let list: any[] = [];
        ingredientList.forEach((item) => {
            list.push(item.ingredientName);
        });
        setFetchedIngredients(list);
    }, [ingredientList]); // eslint-disable-line

    const [selectedItems, setSelectedItems] = React.useState([]);
    const [fetchedIngredients, setFetchedIngredients] = React.useState<any[]>(
        []
    );

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
                items={fetchedIngredients}
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
