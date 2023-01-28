import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import postRouter from "./routes/post.js";
import homerRouter from "./routes/homer.js";

/* configuration */

dotenv.config();
let app = express();
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

/* routes */

app.use("/api/v1/post", postRouter);
app.use("/api/v1/homer", homerRouter);

/* mongoose setup */
let PORT = process.env.PORT || 8000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server port : ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
