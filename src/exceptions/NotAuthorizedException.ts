import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";


/**
 * Not authorized exception
 * @class
 */
export class NotAuthorizedException extends Error {
    public code: string | undefined;
    public config: AxiosRequestConfig<any>;
    public request: any | undefined;
    public response: AxiosResponse<any, any> | undefined;

    /**
     * @constructor
     * @param {AxiosError} error
     */
    constructor(error: AxiosError) {
        super(error.message);

        this.message = error.message;
        this.name = 'BadRequestException';
        this.code = error.code;
        this.config = error.config;
        this.request = error.request;
        this.response = error.response;

        Object.setPrototypeOf(this, NotAuthorizedException.prototype);
    }
}

