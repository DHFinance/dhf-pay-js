import DHFPay from "./DHFPay";

// test('Create Payment', async ()=>{
//     const client = new DHFPay({
//         AUTH_TOKEN: '6bzKGw4Rcd508FbTZA02OW1mQglxSwJ1CXdY'
//     });
//
//     const createParams: CreatePaymentDTO = {
//         amount: 2500000,
//         comment: "test payment"
//     }
//     const result = await client.createPayment(createParams)
//     console.log(result);
// });


// test('Get Payment', async ()=>{
//     const client = new DHFPay({
//         AUTH_TOKEN: '6bzKGw4Rcd508FbTZA02OW1mQglxSwJ1CXdY'
//     });
//
//     const result = await client.getPayment(6)
//     console.log(result);
//
// });
//
// test('Get Payments', async ()=>{
//     const client = new DHFPay({
//         AUTH_TOKEN: '6bzKGw4Rcd508FbTZA02OW1mQglxSwJ1CXdY'
//     });
//
//     const result = await client.getPayments();
//     console.log(result);
//
// });

test('Get Transactions', async ()=>{
    const client = new DHFPay({
        AUTH_TOKEN: '6bzKGw4Rcd508FbTZA02OW1mQglxSwJ1CXdY'
    });

    const result = await client.getTransactions();
    console.log(result);

});


// 6bzKGw4Rcd508FbTZA02OW1mQglxSwJ1CXdY