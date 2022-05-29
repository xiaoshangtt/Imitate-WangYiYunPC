import axios from "axios";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { Gloconfig } from "@/network/config";


export default class Request {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: Gloconfig.baseURL,
            timeout: 100000,
        });
        this.instance.interceptors.request.use(config => {
            Gloconfig.isLoading = true;
            if (config?.params?.id == 0) {
                return Promise.reject(new Error("it not to zero"))
            }
            return config;
        }, (err) => {
            return err;
        })
        this.instance.interceptors.response.use(response => {
            return response;
        }, (err) => {
            return err;
        })
    }
    request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance.request<T, any>(config).then(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            })
        })
    }
    get<T>(config: AxiosRequestConfig) {
        return this.instance.request<T>({ method: "get", ...config });
    }
    post<T>(config: AxiosRequestConfig) {
        return this.instance.request<T>({ method: "post", ...config });
    }
}