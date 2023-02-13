import { Request, Response, NextFunction } from "express";
import logger from "../logger.js";

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    logger.error(error.message);

    if (error.type === "error_not_found") {
        return res.status(404).send(error.message);
    }
    if (error.type === "error_conflict") {
        return res.status(409).send(error.message);
    }
    if (error.type === "error_unprocessable_entity") {
        return res.status(422).send(error.message);
    }

    return res.status(500).send("Internal Server Error");
}