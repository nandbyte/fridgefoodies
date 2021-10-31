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

// Redux
import { Provider } from "react-redux";
import { store } from "../state";
import CreateRecipePage from "../pages/CreateRecipePage";

const App = () => {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <Router>
                    <Route exact path="/">
                        <HomePage />
                    </Route>{" "}
                    <Route exact path="/find-recipe">
                        <FindRecipePage />
                    </Route>
                    <Route exact path="/recipe/:id">
                        <RecipePage />
                    </Route>
                    <Route exact path="/create-recipe/">
                        <CreateRecipePage />
                    </Route>
                </Router>
            </ChakraProvider>
        </Provider>
    );
};

export default App;