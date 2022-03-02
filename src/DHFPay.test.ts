import DHFPay from "./DHFPay";

const createPayment = jest.fn().mockImplementation(function () {
    return {id: 12}
});

const getPayment = jest.fn().mockImplementation(function () {
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
const getPayments = jest.fn().mockImplementation(function () {
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


const getTransactions = jest.fn().mockImplementation(function () {
    return []
});


const client = new DHFPay({
    AUTH_TOKEN: '6bzKGw4Rcd508FbTZA02OW1mQglxSwJ1CXdY'
});

client.createPayment = createPayment.bind(client)
client.getPayment = getPayment.bind(client)
client.getPayments = getPayments.bind(client)
client.getTransactions = getTransactions.bind(client)

=======
test('Get Transactions', async ()=>{
    const client = new DHFPay({
        AUTH_TOKEN: '6bzKGw4Rcd508FbTZA02OW1mQglxSwJ1CXdY'
    });
>>>>>>> e140db2a620b990df927cc1930367c2553e386a4

test('Create Payment', async ()=>{

    const createParams: CreatePaymentDTO = {
        amount: 2500000,
        comment: "test payment"
    }
    const result = await client.createPayment(createParams)
    expect(result).toBeDefined()
    expect(result).toHaveProperty('id')
    expect(result?.id).toEqual(12)
});


test('Get Payment', async ()=>{
    const result = await client.getPayment(6)
    expect(result).toBeDefined()
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('store')
    expect(result).toHaveProperty('amount')
    expect(result?.id).toEqual(6)

});

test('Get Payments', async () => {
    const result = await client.getPayments();
    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)

});

test('Get Transactions', async ()=>{
    const result = await client.getTransactions();
    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)

});

