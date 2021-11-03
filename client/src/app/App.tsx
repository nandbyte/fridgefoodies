import React from "react";

// Styling and theming
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import "focus-visible/dist/focus-visible";

// Router
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/";
import RecipePage from "../pages/RecipePage/";
import FindRecipePage from "../pages/FindRecipePage";
import CreateRecipePage from "../pages/CreateRecipePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { RecoilRoot } from "recoil";

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <RecoilRoot>
                <Router>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/find-recipe">
                        <FindRecipePage />
                    </Route>
                    <Route exact path="/recipe/:id">
                        <RecipePage />
                    </Route>
                    <Route exact path="/create-recipe">
                        <CreateRecipePage />
                    </Route>{" "}
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>{" "}
                    <Route exact path="/register">
                        <RegisterPage />
                    </Route>
                </Router>
            </RecoilRoot>
        </ChakraProvider>
    );
};

export default App;
