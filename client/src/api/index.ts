import axios from "axios";

const URL = "http://localhost:6969/posts";

export const fetchPosts: any = () => {
    return axios.get(URL);
};

export const createPost: any = (newPost: any) => {
    return axios.post(URL, newPost);
};
