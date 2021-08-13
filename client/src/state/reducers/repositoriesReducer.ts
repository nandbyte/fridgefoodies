// Design the store in paper (reducers, actions, action creators, action types)
// Create a Reducer state interface
// Create interfaces for all Actions
// Create a combined Action type
// Create an ActionType enum for the action types
// Create the reducer

import { ActionType } from "../action-types";
import { Action } from "../actions";

interface RepositoriesState {
    loading: boolean;
    error: string | null;
    data: string[];
}

const initialState: RepositoriesState = {
    loading: false,
    error: null,
    data: [],
};

const reducer = (
    state: RepositoriesState = initialState,
    action: Action
): RepositoriesState => {
    switch (action.type) {
        case ActionType.SEARCH_REPOSITORIES:
            return { loading: true, error: null, data: [] };
        case ActionType.SEARCH_REPOSITORIES_SUCCESS:
            return { loading: false, error: null, data: action.payload };
        case ActionType.SEARCH_REPOSITORIES_ERROR:
            return { loading: false, error: action.payload, data: [] };
        default:
            return state;
    }
};

export default reducer;
