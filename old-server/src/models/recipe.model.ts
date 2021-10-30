import { TimeStamp } from "./timestamp.model";
export interface Recipe {
    recipeId: number;
    foodieId: string;
    recipeTitle: string;
    recipeCreationTime: TimeStamp;
    recipeText: string;
    recipeRating: number;
}
