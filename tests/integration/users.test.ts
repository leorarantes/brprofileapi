import supertest from 'supertest';

import app from "../../src/app";
import prisma from "../../src/database.js";
import { UsersRepository } from "../../src/repositories/usersRepository.js";
import { userDataSchema } from '../../src/schemas/userSchema';

const agent = supertest(app);

beforeAll(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE name = 'John Doe'`;
    await prisma.$executeRaw`DELETE FROM users WHERE name = 'Mary Doe'`;
    await prisma.$executeRaw`DELETE FROM users WHERE name = 'Joseph Doe'`;
});

describe("POST /users", () => {
    it("given valid body, create user", async () => {
        const response = await agent
            .post("/users")
            .send({
                name: "John Doe",
                cpf: "26647945075",
                dateOfBirth: "01/01/2001"
            })
        expect(response.status).toBe(201);
    });

    it("given invalid body, fail to create user", async () => {
        const response = await agent
            .post("/users")
            .send(undefined)
        expect(response.status).toBe(422);
    });

    it("given already existing user, fail to create user", async () => {
        const response = await agent
            .post("/users")
            .send({
                name: "John Doe",
                cpf: "26647945075",
                dateOfBirth: "01/01/2001"
            })
        expect(response.status).toBe(409);
    });
});

describe("GET /users", () => {
    it("given valid body, get users", async () => {
        const repository = new UsersRepository();
        await repository.create({
            name: "Mary Doe",
            cpf: "28601854028",
            dateOfBirth: new Date("01/01/2001")
        })
        const response = await agent
        .get(`/users`)
        .send({
            pageNumber: 1,
            pageSize: 1
        })
        const validation = userDataSchema.validate(response.body[0]);
        expect(validation.error).toBe(undefined);
    });

    it("given invalid body, fail to get users", async () => {
        const response = await agent
        .get(`/users`)
        .send(undefined)
        expect(response.status).toBe(422);
    });
});

describe("GET /users/cpf", () => {
    it("given valid body, get user", async () => {
        const repository = new UsersRepository();
        await repository.create({
            name: "Joseph Doe",
            cpf: "14839082081",
            dateOfBirth: new Date("01/01/2001")
        })
        const response = await agent
        .get(`/users/cpf`)
        .send({
            cpf: "14839082081"
        })
        const validation = userDataSchema.validate(response.body);
        expect(validation.error).toBe(undefined);
    });

    it("given invalid body, fail to get user", async () => {
        const response = await agent
        .get(`/users/cpf`)
        .send(undefined)
        expect(response.status).toBe(422);
    });
});