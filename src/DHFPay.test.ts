import DHFPay from "./DHFPay";
import axios from "axios";
require('dotenv').config()

jest.mock("axios");
const createPayment = jest.fn().mockImplementation(() => {
    return {id: 12}
});

const getPayment = jest.fn().mockImplementation(() => {
    return {
        id: 6,
        datetime: '2022-02-24T10:36:34.580Z',
        amount: '2500000',
        status: 'Not_paid',
        comment: 'test payment',
        type: null,
        text: null,
        store: {
            id: 5,
            url: 'https://enflow.io/callback',
            name: 'Store1',
            wallet: '01133ff8c7bab58c2067306c4ae3c8c08f10f0a9d60ab1b7489a5c88b78a4aba01',
            description: '',
            apiKey: '6bzKGw4Rcd508FbTZA02OW1mQglxSwJ1CXdY',
            blocked: false
        }
    }
});
const getPayments = jest.fn().mockImplementation(() => {
    return [
        {
            id: 5,
            datetime: '2022-02-24T10:32:23.758Z',
            amount: '2500000',
            status: 'Not_paid',
            comment: 'test payment',
            type: null,
            text: null,
            store: {
                id: 5,
                url: 'https://enflow.io/callback',
                name: 'Store1',
                wallet: '01133ff8c7bab58c2067306c4ae3c8c08f10f0a9d60ab1b7489a5c88b78a4aba01',
                description: '',
                apiKey: '6bzKGw4Rcd508FbTZA02OW1mQglxSwJ1CXdY',
                blocked: false
            }
        }]
});


const getTransactions = jest.fn().mockImplementation(() => {
    return []
});


const client = new DHFPay({
    AUTH_TOKEN: process.env.STORE_API_URL
});

client.createPayment = createPayment.bind(client)
client.getPayment = getPayment.bind(client)
client.getPayments = getPayments.bind(client)
client.getTransactions = getTransactions.bind(client)

describe("Create payment", () => {


    test('Create Payment returns correctly', async () => {

        const createParams: CreatePaymentDTO = {
            amount: 2500000,
            comment: "test payment"
        }
        const result = await client.createPayment(createParams)
        expect(result).toBeDefined()
        expect(result).toHaveProperty('id')
        expect(result?.id).toEqual(12)
    });

    test('Create Payment returns null if invalid data', async () => {


        const client = new DHFPay({
            AUTH_TOKEN: process.env.STORE_API_URL
        });

        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.resolve({data: {}}));

        const createParams: CreatePaymentDTO = {
            amount: 2500000,
            comment: "test payment"
        };
        const result = await client.createPayment(createParams)
        expect(result).toHaveProperty("error")
    });

    test('Create Payment throws exception on request error', async () => {


        const client = new DHFPay({
            AUTH_TOKEN: process.env.STORE_API_URL
        });

        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.reject({}));

        const createParams: CreatePaymentDTO = {
            amount: 2500000,
            comment: "test payment"
        };
        const result = await client.createPayment(createParams)
        expect(result).toHaveProperty("error")
    });
})

describe("Get Payment", () => {


    test('Get Payment returns correctly', async () => {
        const result = await client.getPayment(6)
        expect(result).not.toBeNull()
        expect(result).toBeDefined()
        expect(result).toHaveProperty('id')
        expect(result).toHaveProperty('store')
        expect(result).toHaveProperty('amount')
        if(result && "id" in result){
            expect(result?.id).toEqual(6)
        }
    });

    test('Get Payment return error on request error', async () => {

        const client = new DHFPay({
            AUTH_TOKEN: process.env.STORE_API_URL
        });

        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.reject({}));


        const result = await client.getPayment(6)
        expect(result).toBeDefined()
        expect(result).toHaveProperty('error')

    });

});

describe("Get Payments", () => {
    test('Get Payments returns correctly', async () => {
        const result = await client.getPayments();
        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)

    });
    test('Get Payments return error on request error', async () => {
        const client = new DHFPay({
            AUTH_TOKEN: process.env.STORE_API_URL
        });

        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.reject({}));

        const result = await client.getPayments();
        expect(result).toBeDefined()
        expect(result).toHaveProperty('error')


    });

})

describe("Get Transactions", () => {

    test('Get Transactions returns correctly', async () => {
        const result = await client.getTransactions();
        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)

    });

    test('Get Transactions  return error on request error', async () => {
        const client = new DHFPay({
            AUTH_TOKEN: process.env.STORE_API_URL
        });

        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.reject({}));
        const result = await client.getTransactions();
        expect(result).toBeDefined()
        expect(result).toHaveProperty('error')


    });
})



