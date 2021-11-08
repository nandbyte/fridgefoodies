import { Comment } from "../models";
import { query } from "../database";
import expressAsyncHandler from "express-async-handler";

export const addComment = expressAsyncHandler(async (req, res) => {
    console.log(req.headers);
    const { foodieId, recipeId, commentText } = req.body;
    let result: any;
    try {
        result = await query("INSERT INTO comment(foodie_id,recipe_id,comment_text) VALUES($1,$2,$3) RETURNING *", [foodieId, recipeId, commentText]);
        console.log(result.rows[0]);
        if (result.rowCount > 0) {

            const currentComment: Comment = {
                commentId: result.rows[0].comment_id,
                foodieId: result.rows[0].foodie_id,
                recipeId: result.rows[0].recipe_id,
                commentText: result.rows[0].comment_text
            }
            let allComments: any = await query("SELECT comment.*, foodie.foodie_name as foodie_name FROM comment,foodie WHERE comment.recipe_id=$1 AND comment.foodie_id = foodie.foodie_id ORDER BY comment.comment_id desc", [recipeId]);
            var allCommentsMapped: any;
            if (allComments.rowCount > 0) {
                allCommentsMapped = allComments.rows.map(
                    (obj: any) => {
                        return {
                            "commentId": obj.comment_id,
                            "foodieId": obj.foodie_id,
                            "recipeId": obj.recipe_id,
                            "commentText": obj.comment_text,
                            "foodieName": obj.foodie_name
                        }
                    }
                );
                res.status(200).json({
                    status: 200,
                    data: {
                        comments: allCommentsMapped,
                    },
                    error: null,
                })
            }
        } else {
            res.status(200).json({
                status: 200,
                data: {},
                error: "Unable to post comment!",
            })
        }
    } catch (err: any) {
        console.log(err);
        throw new Error(err);
    }
})

export const deleteComment = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    let recipeIdResult:any;
    let recipeId:any;
    try{
        recipeIdResult = await query("SELECT recipe_id from comment where comment_id = $1",[id]);
        if(recipeIdResult.rowCount>0){
            recipeId = recipeIdResult.rows[0].recipe_id;
        }
    }catch(err:any){
        console.log(err);
    }
    let deletedComment: any;
    try {
        deletedComment = await query("DELETE FROM comment WHERE comment_id=$1 RETURNING *", [id]);
        if (deletedComment.rowCount > 0) {
            let allComments: any = await query("SELECT comment.*, foodie.foodie_name as foodie_name FROM comment,foodie WHERE comment.recipe_id=$1 AND comment.foodie_id = foodie.foodie_id ORDER BY comment.comment_id desc", [recipeId]);
            var allCommentsMapped: any;
            if (allComments.rowCount > 0) {
                allCommentsMapped = allComments.rows.map(
                    (obj: any) => {
                        return {
                            "commentId": obj.comment_id,
                            "foodieId": obj.foodie_id,
                            "recipeId": obj.recipe_id,
                            "commentText": obj.comment_text,
                            "foodieName": obj.foodie_name
                        }
                    }
                );
                res.status(200).json({
                    status: 200,
                    data: {
                        comments: allCommentsMapped,
                    },
                    error: null,
                })
            }
        } else {
            res.status(200).json({
                status: 200,
                data: [],
                error: "No comment found!"
            })
        }
    } catch (err: any) {
        console.log(err);
    }
})