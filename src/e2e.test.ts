import DHFPay from "./DHFPay";


const client = new DHFPay({
    AUTH_TOKEN: 'owUOeCBjAgT0vD7gY7u1PTeGwQYoLbusDWEe'
});

let paymentId: number;

describe("Create payment", () => {
    test('Create Payment returns correctly', async () => {
        const createParams: CreatePaymentDTO = {
            amount: 2500000,
            comment: "test payment"
        }
        const result = await client.createPayment(createParams)
        expect(result).toBeDefined()
        expect(result).toHaveProperty('id')
        expect(result?.id).not.toBeNull();
        paymentId = result.id
    });

    test('Create Payment returns null if invalid data', async () => {
        const createParams: any = {
            comment: "test payment"
        };
        const result = await client.createPayment(createParams)
        expect(result).toHaveProperty("error")
    });

})

describe("Get Payment", () => {
    test('Get Payment returns correctly', async () => {
        const result = await client.getPayment(paymentId)
        expect(result).not.toBeNull()
        expect(result).toBeDefined()
        expect(result).toHaveProperty('id')
        expect(result).toHaveProperty('store')
        expect(result).toHaveProperty('amount')
        if(result && "id" in result){
            expect(result?.id).toEqual(paymentId)
        }
    });
});

describe("Get Payments", () => {
    test('Get Payments returns correctly', async () => {
        const result = await client.getPayments();
        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
    });
})

describe("Get Transactions", () => {
    test('Get Transactions returns correctly', async () => {
        const result = await client.getTransactions();
        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
    });
})



