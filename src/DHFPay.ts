import axios, {AxiosStatic} from "axios";
import {DEFAULT_API_URL, PAYMENTS_URI, TRANSACTION_URI} from "./constants";
import {PaymentInterface} from "./interfaces/PaymentInterface";
import {TransactionInterface} from "./interfaces/TransactionInterface";

/**
 * API wrap.
 * @class
 */
class DHFPay {
    private readonly API_URL: string;
    private AUTH_TOKEN: string;
    private axiosConfig: any
    private httpClient: AxiosStatic


    /**
     * @constructor
     * @param {DHPayInterface} params
     */
    constructor(params: DHPayInterface) {
        this.API_URL = params.API_URL || DEFAULT_API_URL;
        this.AUTH_TOKEN = params.AUTH_TOKEN;
        this.axiosConfig = {
            headers: {Authorization: `Bearer ${this.AUTH_TOKEN}`}
        };
        this.httpClient = axios;
    }

    /**
     * @return {string}
     */
    public getUrl() {
        return this.API_URL;
    }

    /**
     * @description Create a payment
     * @param {CreatePaymentDTO} params
     * @return Promise
     */
    public async createPayment(params: CreatePaymentDTO): Promise<{ id?: number, error?: any } | null > {
        try {
            const result = await this.httpClient.post(`${this.API_URL}${PAYMENTS_URI}`, params, {
                ...this.axiosConfig
            });


            if (!result?.data || !result.data?.id) {
                // console.log("Error on payment creating", result);
                return {
                    error: result
                };
            }

            return result.data;

        } catch (error) {
            return {
                error
            };
        }

    }

    /**
     * @description Get a payment by id
     * @param {number} id
     * @return {(Object|null)}
     */
    public async getPayment(id: number): Promise<PaymentInterface | null | { error: any }> {
        try{
            const result = await this.httpClient.get(`${this.API_URL}${PAYMENTS_URI}/${id}`, {
                ...this.axiosConfig
            });

            return result.data;
        }catch (e) {
            return {
                error: e
            };
        }

    }

    /**
     * @description Get payments list
     * @return {Promise}
     */
    public async getPayments():  Promise<PaymentInterface[] | {error: any}>  {
        try{
            const result = await this.httpClient.get(`${this.API_URL}${PAYMENTS_URI}`, {
                ...this.axiosConfig
            });

            return result.data;
        }catch (e) {

            return {
                error: e
            };
        }
    }

    /**
     * @description Get transactions list
     * @return {Promise}
     */
    public async getTransactions(): Promise<TransactionInterface[]| {error: any}> {
        try{
            const result = await this.httpClient.get(`${this.API_URL}${TRANSACTION_URI}`, {
                ...this.axiosConfig
            });

            return result.data;
        }catch (e) {
            return {
                error: e
            };
        }
    }
}


export default DHFPay;
