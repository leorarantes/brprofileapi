import joi, { Schema } from "joi";

export const userSchema: Schema = joi.object({
    name: joi.string().required(),
    cpf: joi.string().custom(validateCpf).required(),
    dateOfBirth: joi.string().required().pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/).required()
});

export const cpfSchema: Schema = joi.object({
    cpf: joi.string().custom(validateCpf),
});

export const pageSchema: Schema = joi.object({
    pageNumber: joi.number().greater(0),
    pageSize: joi.number().greater(0)
});

function validateCpf(value: string) {
    // build right number
    const originalNumber = value;
    let rightNumber: string = originalNumber.slice(0, 9);

    // method to calculate the right verifier digit
    function calculateVerifierDigit(number: string) {
        const numbers = number.split('').reverse();
        let sum = 0;
        for(let i = 2; i < numbers.length+2; i++) {
            sum += +numbers[i-2] * i;
        }

        const mod = sum % 11;
        if(mod < 2) return 0;
        return 11-mod;
    };

    // add right verifier digits
    rightNumber += calculateVerifierDigit(rightNumber);
    rightNumber += calculateVerifierDigit(rightNumber);

    // compare original number with right number
    if(originalNumber === rightNumber) return originalNumber;
    throw new Error("it is not valid.");
}