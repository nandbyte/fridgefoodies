import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { foodieState } from "../../state/foodie/foodie.state";

interface Props {}

const PrivateRoute: React.FC<any> = (props: any) => {
    const [foodie] = useRecoilState(foodieState);

    return (
        <Route
            {...props.rest}
            render={({ location }) =>
                foodie.foodieId === "" ? (
                    <Redirect
                        to={{ pathname: "/login", state: { from: location } }}
                    />
                ) : (
                    props.children
                )
            }
        />
    );
};

export default PrivateRoute;
