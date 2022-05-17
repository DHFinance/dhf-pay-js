import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

export class BadRequestException extends Error {
    public code: string | undefined;
    public config: AxiosRequestConfig<any>;
    public request: any | undefined;
    public response: AxiosResponse<any, any> | undefined;
    constructor(error: AxiosError) {
        super(error.message);

        this.message = error.message;
        this.name = 'BadRequestException';
        this.code = error.code;
        this.config = error.config;
        this.request = error.request;
        this.response = error.response;
        Object.setPrototypeOf(this, BadRequestException.prototype);
    }
}


export class NotAuthorizedException extends Error {
    public code: string | undefined;
    public config: AxiosRequestConfig<any>;
    public request: any | undefined;
    public response: AxiosResponse<any, any> | undefined;
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
export class AmountTooSmallException extends Error {
    public code: string | undefined;
    public config: AxiosRequestConfig<any>;
    public request: any | undefined;
    public response: AxiosResponse<any, any> | undefined;
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

export default {BadRequestException, NotAuthorizedException, AmountTooSmallException};
