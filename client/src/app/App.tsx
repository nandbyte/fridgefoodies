import React from "react";

// Styling and theming
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import "focus-visible/dist/focus-visible";

import { RecoilRoot } from "recoil";

// Router
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/";
import RecipePage from "../pages/RecipePage/";
import FindRecipePage from "../pages/FindRecipePage";
import CreateRecipePage from "../pages/CreateRecipePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EditRecipePage from "../pages/EditRecipePage";
import ProfilePage from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";
import Initialization from "./Initialization";

const App = () => {
    return (
        <RecoilRoot>
            <ChakraProvider theme={theme}>
                <Initialization />
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
                    </Route>
                    <Route exact path="/edit-recipe/:id">
                        <EditRecipePage />
                    </Route>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                    <Route exact path="/register">
                        <RegisterPage />
                    </Route>
                    <Route exact path="/profile">
                        <ProfilePage />
                    </Route>
                    <Route exact path="/admin">
                        <AdminPage />
                    </Route>
                </Router>
            </ChakraProvider>
        </RecoilRoot>
    );
};

export default App;
