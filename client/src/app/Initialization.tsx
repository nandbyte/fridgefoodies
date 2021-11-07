import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getIngredients } from "../api/ingredient.api";
import { foodieJwtState, foodieState } from "../state/foodie/foodie.state";
import { ingredientState } from "../state/ingredient/ingredient.state";

const Initialization = () => {
    const [foodie, setFoodie] = useRecoilState(foodieState);
    const [jwt, setJwt] = useRecoilState(foodieJwtState);

    const [ingredientList, setIngredientList] = useRecoilState(ingredientState);

    useEffect(() => {
        console.log(
            "Initialized with local storage: \n\n" +
                "Bearer Token: " +
                window.localStorage.getItem("Token") +
                "\n\nFoodieId: " +
                window.localStorage.getItem("FoodieId") +
                "\n\nFoodie: " +
                window.localStorage.getItem("Foodie")
        );
        if (window.localStorage.getItem("Foodie") !== null) {
            setFoodie(window.localStorage.getItem("Foodie"));
            setJwt(window.localStorage.getItem("Token"));
        }

        console.log(
            "Initialized with state: \n\n" +
                "Bearer Token: " +
                jwt +
                "\n\nFoodie: " +
                foodie
        );

        getIngredients()
            .then((response) => {
                console.log(response.data.data.ingredient);
                setIngredientList(response.data.data.ingredient);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return <></>;
};

export default Initialization;
