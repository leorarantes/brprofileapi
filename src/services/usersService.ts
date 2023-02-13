import { Users } from "@prisma/client";

import logger from "../logger.js";
import { User } from "../models/user.js";
import { UsersRepository } from "../repositories/usersRepository.js";

export interface UserData {
    name: string,
    cpf: string,
    dateOfBirth: Date
}

export class UsersService {
    constructor() {
    }
    async create(user: User) {
        const repository = new UsersRepository();

        logger.info("Ensuring user doesnt already exists...");
        const existinguser: Users = await repository.getByCpf(user.cpf);
        if(existinguser) throw { type: "error_conflict", message: "User already exists." };

        // change date format to mm/dd/aaaa
        const dateParts = user.dateOfBirth.split("/");
        const dateStr = dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];

        // fix user type to insert in database
        const date = new Date(dateStr);
        const userData: UserData = {
            name: user.name,
            cpf: user.cpf,
            dateOfBirth: date
        };

        await repository.create(userData);
    }

    async get(pageNumber: number, pageSize: number): Promise<Users[]> {
        const repository = new UsersRepository();
        const users: Users[] = await repository.get(pageNumber, pageSize);
        return users;
    }

    async getByCpf(cpf: string) {
        const repository = new UsersRepository();
        
        logger.info("Ensuring user exists...");
        const user = await repository.getByCpf(cpf);
        if (!user) throw { type: "error_not_found", message: "User doesnt exist." };

        return user;
    }
}