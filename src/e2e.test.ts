import DHFPay from "./DHFPay";
import axios from "axios";
require('dotenv').config()

const client = new DHFPay({
    AUTH_TOKEN: process.env.STORE_API_URL
});

let paymentId: number;

describe("Create payment", () => {
    test('Create Payment returns correctly', async () => {
        const res = await  axios.get('https://pay.dhfi.online/api/store/5', {
            headers: {Authorization: `Bearer ${process.env.STORE_API_URL}`}
        })
        console.log(res)
        console.log(res.data)
    });



})

//
//
// describe("Create payment", () => {
//     test('Create Payment returns correctly', async () => {
//         const createParams: CreatePaymentDTO = {
//             amount: 2500000,
//             comment: "test payment"
//         }
//         const result = await client.createPayment(createParams)
//         expect(result).toBeDefined()
//         expect(result).toHaveProperty('id')
//         expect(result?.id).not.toBeNull();
//         paymentId = result.id
//     });
//
//     test('Create Payment returns null if invalid data', async () => {
//         const createParams: any = {
//             comment: "test payment"
//         };
//         const result = await client.createPayment(createParams)
//         expect(result).toHaveProperty("error")
//     });
//
// })
//
// describe("Get Payment", () => {
//     test('Get Payment returns correctly', async () => {
//         const result = await client.getPayment(paymentId)
//         expect(result).not.toBeNull()
//         expect(result).toBeDefined()
//         expect(result).toHaveProperty('id')
//         expect(result).toHaveProperty('store')
//         expect(result).toHaveProperty('amount')
//         if(result && "id" in result){
//             expect(result?.id).toEqual(paymentId)
//         }
//     });
// });
//
// describe("Get Payments", () => {
//     test('Get Payments returns correctly', async () => {
//         const result = await client.getPayments();
//         expect(result).toBeDefined()
//         expect(Array.isArray(result)).toBe(true)
//     });
// })
//
// describe("Get Transactions", () => {
//     test('Get Transactions returns correctly', async () => {
//         const result = await client.getTransactions();
//         expect(result).toBeDefined()
//         expect(Array.isArray(result)).toBe(true)
//     });
// })
//
//
//
