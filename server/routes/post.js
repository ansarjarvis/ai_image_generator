import express from "express";

import { getPost } from "../controllers/post.js";
import { createPost } from "../controllers/post.js";

let Router = express.Router();

Router.get("/", getPost);
Router.post("/", createPost);

export default Router;
