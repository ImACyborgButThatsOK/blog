import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routerPost from "./routes/post.js";

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", true);
    next();
});

app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api", routerPost);

app.listen(5000, () => console.log("STARTED..."));
