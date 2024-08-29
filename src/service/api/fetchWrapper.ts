import axios, {AxiosResponse} from "axios";

const axiosApiInstance = axios.create();

const baseUrl: string = `https://open.er-api.com/v6/latest/USD`;

interface FetchWrapper {
    getDelay: (url: string, body?: any, credentials?: boolean, formData?: boolean, responseType?: any) => Promise<any>;
    get: (url: string, body?: any, credentials?: boolean, formData?: boolean, responseType?: any) => Promise<any>;
    post: (url: string, body?: any, credentials?: boolean, formData?: boolean, responseType?: any) => Promise<any>;
    put: (url: string, body?: any, credentials?: boolean, formData?: boolean, responseType?: any) => Promise<any>;
    delete: (url: string, body?: any, credentials?: boolean, formData?: boolean, responseType?: any) => Promise<any>;
}

export const fetchWrapper: FetchWrapper = {
    getDelay: request('GET', true),
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method: string, delay?: boolean,) {
    return async (url: string, body?: any, credentials: boolean = false, formData: boolean = false, responseType?: any): Promise<any> => {
        let handle = handleResponse;
        if (delay) {
            handle = handleResponseDelay;
        }
        const config = {
            method: method,
            url: url,
            timeout: 1000 * 30,
            data: body,
            baseURL: baseUrl,
            withCredentials: credentials,
            responseType: responseType,
            headers: authHeader(formData),
        };
        try {
            const response = await axiosApiInstance(config);
            return handle(response);
        } catch (error: any) {
            return handle(error);
        }
    }
}

function authHeader(formData: boolean) {
    return {
        'Content-Type': formData ? 'multipart/form-data' : 'application/json',
    }
}

async function handleResponseDelay(response: AxiosResponse): Promise<any> {
    const delay = (ms: number = 100): Promise<void> => new Promise(r => setTimeout(r, ms));
    await delay();
    return handleResponse(response);
}

async function handleResponse(response: AxiosResponse): Promise<any> {
    if (!response || !response.data) {
        throw new Error("No response data")
    }

    if (response.status === undefined) {
        throw new Error("No response status")
    }

    response.data.status = response.status;
    return response.data;
}
