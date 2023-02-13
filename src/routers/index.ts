import { Router as Connection } from "express";

export class Router {
    connection: null | Connection;

    constructor() {
        this.connection = null;
    }
    connect() {}
}