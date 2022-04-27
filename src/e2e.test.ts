import DHFPay from "./DHFPay";
import axios, {AxiosError} from "axios";
import {AmountTooSmallException, BadRequestException, NotAuthorizedException} from "./exceptions";

require('dotenv').config()

const client = new DHFPay({
    AUTH_TOKEN: process.env.STORE_API_TOKEN,
    API_URL: process.env.STORE_API_URL
});



describe("Create payment", () => {
    test('Create Payment returns correctly', async () => {

        const createParams: CreatePaymentDTO = {
            amount: 2500000000,
            comment: "test payment"
        }
        const result = await client.createPayment(createParams)
        expect(result).toBeDefined()
        expect(result).toHaveProperty('id')
    });

    test('Create Payment throws error on small amount', async () => {

        const createParams: CreatePaymentDTO = {
            amount: 250000,
            comment: "test payment"
        }

        await expect(client.createPayment(createParams)).rejects
            .toThrow(AmountTooSmallException);
    });

    test('Create Payment throws error on bad request', async () => {

        const client = new DHFPay({
            AUTH_TOKEN: process.env.STORE_API_TOKEN,
            API_URL: 'https://wrongapi234234.com'
        });

        const createParams: CreatePaymentDTO = {
            amount: 2500000000,
            comment: "test payment"
        }

        await expect(client.createPayment(createParams)).rejects
            .toThrow(BadRequestException);
    });


})

describe("Get payment", () => {
    test('Get payment returns correctly', async () => {
        const result = await client.getPayment(10)
        console.log(result)

        expect(result).not.toBeNull()
        expect(result).toBeDefined()
        expect(result).toHaveProperty('id')
        expect(result).toHaveProperty('store')
        expect(result).toHaveProperty('amount')
        if (result && "id" in result) {
            expect(result?.id).toEqual(10)
        }

    })

    test('Get payment throws exception on bad request', async () => {
        const client = new DHFPay({
            AUTH_TOKEN: process.env.STORE_API_TOKEN,
            API_URL: 'https://wrongapi234234.com'
        });


        await expect(client.getPayment(10)).rejects
            .toThrow(BadRequestException);
    })


})



describe("Get Payments", () => {
    test('Get Payments returns correctly', async () => {
        const result = await client.getPayments();
        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)

    });

    test('Get Payments throws error on bad request', async () => {
        const client = new DHFPay({
            AUTH_TOKEN: process.env.STORE_API_TOKEN,
            API_URL: 'https://wrongapi234234.com'
        });

        await expect(client.getPayments()).rejects
            .toThrow(BadRequestException);

    });

    // todo спросить про токен
    test.skip('Get Payments throws error on bad token', async () => {
        const client = new DHFPay({
            AUTH_TOKEN: process.env.STORE_API_TOKEN+'1',
        });

        await expect(client.getPayments()).rejects
            .toThrow(BadRequestException);

    });

})


describe("Get Transactions", () => {

    test('Get Transactions returns correctly', async () => {
        const result = await client.getTransactions();
        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)

    });

    test('Get Transactions  throws exception on bad request', async () => {
        const client = new DHFPay({
            API_URL: 'https://wrongapi234234.com'

        });

        await expect(client.getTransactions()).rejects
            .toThrow(BadRequestException);


    });
    // todo fix unauthorized
    test.skip('Get Transactions  throws exception on bad token', async () => {
        const client = new DHFPay({
            AUTH_TOKEN: process.env.STORE_API_TOKEN+'1',
            API_URL: process.env.STORE_API_URL

        });

        await expect(client.getTransactions()).rejects
            .toThrow(BadRequestException);


    });
})

