import axios, {AxiosError, AxiosStatic} from "axios";
import {DEFAULT_API_URL, PAYMENTS_URI, TRANSACTION_URI} from "./constants";
import {PaymentInterface} from "./interfaces/PaymentInterface";
import {TransactionInterface} from "./interfaces/TransactionInterface";
import {AmountTooSmallException, BadRequestException, NotAuthorizedException} from "./exceptions";

/**
 * API wrap.
 * @class
 */
class DHFPay {
    private readonly API_URL: string;
    private AUTH_TOKEN: string;
    private axiosConfig: any
    private httpClient: AxiosStatic
    static default: any;


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

        } catch (error: any) {
            if(axios.isAxiosError(error)){
                const typedError = error as  AxiosError;
                const status = typedError.response?.status;

                const possibleError = typedError?.response?.data?.message;
                const hasError = possibleError !== undefined
                switch (status){
                    case 400:
                        if(hasError){
                            throw  new AmountTooSmallException(typedError)
                        }else{
                            throw new BadRequestException(typedError);
                        }
                    case 401:
                        throw  new NotAuthorizedException(typedError)
                    default:
                        throw new BadRequestException(typedError);
                }
            }else{
                throw error;
            }
        }

    }

    /**
     * @description Get a payment by id
     * @param {number} id
     * @return {(Object|null)}
     */
    public async getPayment(id: number): Promise<PaymentInterface | null  > {
        try{
            const result = await this.httpClient.get(`${this.API_URL}${PAYMENTS_URI}/${id}`, {
                ...this.axiosConfig
            });

            return result.data;
        }catch (e: any) {

            if(axios.isAxiosError(e)){
                const error = e as  AxiosError;
                const status = error.response?.status;


                switch (status){
                    case 401:
                        throw  new NotAuthorizedException(e)
                    default:
                        throw new BadRequestException(e);
                }
            }else{
                throw e;
            }

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
        }catch (e: any) {

            if(axios.isAxiosError(e)){
                const error = e as  AxiosError;
                const status = error.response?.status;


                switch (status){
                    case 401:
                        throw  new NotAuthorizedException(e)
                    default:
                        throw new BadRequestException(e);
                }
            }else{
                throw e;
            }
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
        }catch (e: any) {
            if(axios.isAxiosError(e)){
                const error = e as  AxiosError;
                const status = error.response?.status;


                switch (status){
                    case 401:
                        throw  new NotAuthorizedException(e)
                    default:
                        throw new BadRequestException(e);
                }
            }else{
                throw e;
            }
        }
    }
}

DHFPay.default = DHFPay;
export = DHFPay;

