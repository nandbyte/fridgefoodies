import React, { useEffect } from "react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { Box } from "@chakra-ui/layout";
import { useDispatch } from "react-redux";
import { setSelectedIngredients } from "../../state/recipe/find-recipe-by-ingredients.slice";
import { setIngredients } from "../../state/ingredient/ingredient.slice";
import { useFetchIngredientsMutation } from "../../state/ingredient/ingredient.api.slice";
import { useToast } from "@chakra-ui/toast";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface Props {}

const AutoComplete: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();

    const toast = useToast();

    const { ingredientList } = useTypedSelector((state) => state.ingredient);

    const [fetchIngredients] = useFetchIngredientsMutation();

    useEffect(() => {
        fetchIngredients({})
            .unwrap()
            .then((payload) => {
                console.log(payload);
                setIngredients(payload.data);
            })
            .catch((error) => {
                toast({
                    position: "top",
                    title: "Error",
                    description: "Something unexpected happened.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            });
    }, []); // eslint-disable-line

    const [selectedItems, setSelectedItems] = React.useState([]);

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
                items={ingredientList.map(
                    (ingredient) => ingredient.ingredientId
                )}
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
