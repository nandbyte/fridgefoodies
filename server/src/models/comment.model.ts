import { TimeStamp } from "./timestamp.model";

export interface Comment {
    commentId: number;
    foodieId: string;
    recipeId: number;
    commentText: string;
}
