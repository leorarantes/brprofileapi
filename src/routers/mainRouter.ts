import { Router as Connection } from "express";

import logger from '../logger.js';
import { Router } from "./index.js";
import { UsersRouter } from "./usersRouter.js";

export class MainRouter extends Router {
    connect() {
        logger.info("MainRouter connecting...");
        this.connection = Connection();

        const usersRouter = new UsersRouter();
        usersRouter.connect();

        this.connection.use(usersRouter.connection);
        logger.info("MainRouter connected successfully.");
    }
}