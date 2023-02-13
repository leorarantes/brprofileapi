import { Users } from "@prisma/client";
import { Request, Response } from "express";

import logger from "../logger.js";
import { User } from "../models/user.js";
import { UsersService } from "../services/usersService.js";

export class UsersController {
    constructor() { }
    async create(req: Request, res: Response) {
        const user: User = req.body;
        const service = new UsersService();
        logger.info("Creating new user...");
        await service.create(user);
        logger.info("User sucessfully created.");
        res.sendStatus(201);
    }

    async get(req: Request, res: Response) {
        const { pageNumber, pageSize } = req.body;
        const service = new UsersService();
        logger.info(`Retrieving users with pagination rules...`);
        const users: Users[] = await service.get(pageNumber, pageSize);
        logger.info("Users sucessfully retrieved.");
        res.status(200).send(users);
    }

    async getByCpf(req: Request, res: Response) {
        const { cpf }: { cpf: string } = req.body;
        const service = new UsersService();
        logger.info("Retrieving user by cpf...");
        const user: Users = await service.getByCpf(cpf);
        logger.info("User sucessfully retrieved.");
        res.status(200).send(user);
    }
}