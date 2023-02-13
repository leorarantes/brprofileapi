import { Router as Connection } from "express";

import logger from '../logger.js';
import { userSchema, cpfSchema, pageSchema } from "../schemas/userSchema.js";
import { UsersController } from "../controllers/usersController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { Router } from "./index.js";

export class UsersRouter extends Router {
    connect() {
        logger.info("usersRouter connecting...");
        this.connection = Connection();
        const controller = new UsersController();

        this.connection.post("/users", schemaValidator(userSchema), controller.create);
        this.connection.get("/users", schemaValidator(pageSchema), controller.get);
        this.connection.get("/users/cpf", schemaValidator(cpfSchema), controller.getByCpf);
        logger.info("usersRouter connected successfully.");
    }
}