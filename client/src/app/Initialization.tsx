import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getFoodie } from "../api/foodie.api.ts";
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
        if (
            window.localStorage.getItem("Token") !== null &&
            window.localStorage.getItem("FoodieId") !== null
        ) {
            setJwt(window.localStorage.getItem("Token"));
            getFoodie(window.localStorage.getItem("FoodieId"))
                .then((response) => {
                    setFoodie(response.data.data.foodie);
                })
                .catch((error) => console.log(error));
        }

        // console.log(
        //     "Initialized with state: \n\n" +
        //         "Bearer Token: " +
        //         jwt +
        //         "\n\nFoodie Id: " +
        //         foodie!.foodieId
        // );
    }, []);

    return <></>;
};

export default Initialization;
