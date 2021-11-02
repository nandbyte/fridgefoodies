import { TimeStamp } from "./timestamp.model";
export interface Recipe {
    recipeId: number;
    foodieId: string;
    recipeTitle: string;
    recipeText: string;
    recipeImage: string;
}
