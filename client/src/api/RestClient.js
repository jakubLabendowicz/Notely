import Notification from "../utils/NotificationUtils";
import axios from "axios";

export class RestClient {
    constructor(baseURL, headers) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: headers
        });
    }

    async get(url) {
        return new Promise((resolve, reject) => {
            this.client.get(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response.data.result.status === 404) {
                    resolve({data: []});
                } else if (error.response.data.result) {
                    new Notification(error.response.data.result.message, error.response.data.result.type).send();
                    reject(error.response.data.result);
                } else {
                    new Notification(error.message, 'error').send();
                    reject(error);
                }
            });
        });
    }

    async post(url, data) {
        return new Promise((resolve, reject) => {
            this.client.post(url, {data: data})
            .then((response) => {
                console.log(response);
                new Notification(response.data.result.message, response.data.result.type).send();
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.data.result) {
                    new Notification(error.response.data.result.message, error.response.data.result.type).send();
                    reject(error.response.data.result);
                } else {
                    new Notification(error.message, 'error').send();
                    reject(error);
                }
            });
        });
    }

    async put(url, data) {
        return new Promise((resolve, reject) => {
            this.client.put(url, data)
            .then((response) => {
                new Notification(response.data.result.message, response.data.result.type).send();
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response.data.result) {
                    new Notification(error.response.data.result.message, error.response.data.result.type).send();
                    reject(error.response.data.result);
                } else {
                    new Notification(error.message, 'error').send();
                    reject(error);
                }
            });
        });
    }

    async delete(url) {
        return new Promise((resolve, reject) => {
            this.client.delete(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response.data.result) {
                    new Notification(error.response.data.result.message, error.response.data.result.type).send();
                    reject(error.response.data.result);
                } else {
                    new Notification(error.message, 'error').send();
                    reject(error);
                }
            });
        });
    }
}


export class NotelyRestClient extends RestClient {
    constructor(headers) {
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
        let token = null;
        try {
            token = localStorage.getItem('token');
        } catch (e) {
            console.log(e);
        }
        const HEADERS = {
            'Content-Type': 'application/json',
                // 'User-Agent': window.navigator.userAgent
            'Authorization': 'Bearer' + ' ' + token,
            ...headers
        };
        super(BASE_URL, HEADERS);
    }
}