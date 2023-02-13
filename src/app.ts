import express from "express";
import "express-async-errors";

import errorHandler from "./middlewares/errorHandler.js";
import { MainRouter } from "./routers/mainRouter.js";

const app = express();
app.use(express.json());

const router = new MainRouter();
router.connect();
app.use(router.connection);

app.use(errorHandler);

export default app;