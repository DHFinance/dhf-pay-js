import {StoreInterface} from "./StoreInterface";

export interface PaymentInterface {
    id: number
    datetime: string
    amount: string
    status: 'Not_paid' | 'paid' | string
    comment: string
    text: string
    store: StoreInterface
}