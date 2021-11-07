import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { foodieJwtState, foodieState } from "../state/foodie/foodie.state";

const Initialization = () => {
    const [foodie, setFoodie] = useRecoilState(foodieState);
    const [jwt, setJwt] = useRecoilState(foodieJwtState);

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
        console.log(
            "Initialized with state: \n\n" +
                "Bearer Token: " +
                jwt +
                "\n\nFoodie: " +
                foodie
        );
    }, []);

    return <></>;
};

export default Initialization;
