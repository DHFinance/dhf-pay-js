# DH Pay JS
NodeJS SDK to integrate with DHFinance in minutes.

# Getting Started
1. **Sign up for DHFinance** - Before you begin, you need to sign up for an DHFinance account and retrieve your store API token. 
2. **Requirements** – To run the SDK, your system will need to have Node JS >= 14 and npm >= 6 installed .
3. **Install** 
```sh
 npm i dhf-pay-js -S
```
# Import
```sh
 import DHFPay from "dhf-pay-js";
```

# Create client 
```sh
 const client = new DHFPay({
          AUTH_TOKEN: '#TOKEN#',
          API_URL: '#API_URL#'
      });
```


# Create payment
 ```sh
    const createParams: CreatePaymentDTO = {
          amount: 2500000, 
          comment: "test payment"
    }
    const result = await client.createPayment(createParams)
 
```
 
 # Payment status
 ```sh
    const paymentId = 1;
    const result: PaymentInterface = await client.getPayment(paymentId)
```
 
 
 
 # Payments list
 ```sh
    const result: PaymentInterface[] = await client.getPayments();
```
  
 
 # Transactions list
 ```sh
    const result: TransactionInterface[] = await client.getTransactions();
```
 
 
 # Interfaces
  ```sh
     interface PaymentInterface {
         id: number
         datetime: string
         amount: string
         status: 'Not_paid' | 'paid' | string
         comment: string
         text: string
         store: StoreInterface
     }

    interface StoreInterface {
        id: number
        url: string
        name: string
        wallet: string
        description: string
        blocked: boolean
    }

    interface TransactionInterface {
        id: number
        status: string
        email: string
        updated: string
        txHash: string
        sender: string
        amount: string
        payment: PaymentInterface
    }

    interface CreatePaymentDTO {
        amount: number
        comment: string
    }

 ```
 
 
# Run tests 
```sh
 npm test
```
 

