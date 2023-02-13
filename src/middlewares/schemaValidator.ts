import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

import logger from "../logger.js";

export default function schemaValidator(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        logger.info("Validating schema...");
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            throw { type: "error_unprocessable_entity", message: `${error.details.map(detail => detail.message)}` };
        }

        logger.info("Schema validated sucessfully.");
        next();
    }
};