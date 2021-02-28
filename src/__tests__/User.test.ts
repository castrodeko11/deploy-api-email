import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";

import createConnection from '../database';

describe("Users", () => {
    beforeAll(async () => {
        const Connection = await createConnection();
        await Connection.runMigrations();;
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });


    it("Should be able create a new user", async () => {
        const response = await request(app).post("/users")
            .send({
                email: "user@example.com",
                name: "User Example"
            });

        expect(response.status).toBe(201)
    });


    it("Should not be able create a new user with exists email", async () => {
        const response = await request(app).post("/users")
            .send({
                email: "user@example.com",
                name: "User Example"
            });

        expect(response.status).toBe(400)
    });

});