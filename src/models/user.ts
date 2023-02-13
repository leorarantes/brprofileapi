export class User {
    name: string;
    cpf: string;
    dateOfBirth: string;

    constructor(name: string, cpf: string, dateOfBirth: string) {
        this.name = name;
        this.cpf = cpf;
        this.dateOfBirth = dateOfBirth;
    }
}