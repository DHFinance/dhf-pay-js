import DHFPay from "./DHFPay";

test('Get Transactions', async ()=>{
    const client = new DHFPay({
        AUTH_TOKEN: '6bzKGw4Rcd508FbTZA02OW1mQglxSwJ1CXdY'
    });

    const result = await client.getTransactions();
    console.log(result);

});
