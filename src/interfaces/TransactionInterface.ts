import {PaymentInterface} from "./PaymentInterface";

export interface TransactionInterface {
    id: number
    status: string
    email: string
    updated: string
    txHash: string
    sender: string
    amount: string
    payment: PaymentInterface
}