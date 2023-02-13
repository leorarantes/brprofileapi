import { Users } from "@prisma/client";

import logger from "../logger.js";
import prisma from "../database.js";
import { UserData } from "../services/usersService.js";

export class UsersRepository {
    constructor() {}
    async create(user: UserData) {
        logger.info("Creating new record in database...");
        await prisma.users.create({data: user});
        logger.info("1 record created.");
    }
    
    async get(pageNumber: number, pageSize: number): Promise<Users[]> {
        logger.info("Searching in database...");
        const users: Users[] = await prisma.users.findMany({
            skip: (pageNumber-1)*pageSize,
            take: pageSize
        });
        logger.info(`${users.length} ${users.length === 1 ? "record" : "records" } found with the specified pagination rules.`);
        return users;
    }
    
    async getByCpf(cpf: string): Promise<Users>  {
        logger.info("Searching in database...");
        const user: Users = await prisma.users.findFirst({where: {
            cpf
        }});
        if(!user) logger.info("0 records found in database.");
        else logger.info("1 record found in database.");
        return user;
    }
}

