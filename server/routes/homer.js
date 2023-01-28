import express from "express";
import { getOpenAi } from "../controllers/homer.js";

let Router = express.Router();

Router.post("/", getOpenAi);

export default Router;
