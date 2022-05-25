import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

/**
 * Small amount exception
 * @class
 */
export class AmountTooSmallException extends Error {
    public code: string | undefined;
    public config: AxiosRequestConfig<any>;
    public request: any | undefined;
    public response: AxiosResponse<any, any> | undefined;

    /**
     * @constructor
     * @param {AxiosError} error
     */
    constructor(error: AxiosError) {

        // @ts-ignore
        super(error?.response?.data?.message);

        // @ts-ignore
        this.message = error?.response?.data?.message;
        this.name = 'AmountTooSmallException';
        this.code = error.code;
        this.config = error.config;
        this.request = error.request;
        this.response = error.response;

        Object.setPrototypeOf(this, AmountTooSmallException.prototype);
    }
}

