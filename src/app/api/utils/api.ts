import axios, { AxiosInstance } from 'axios';


/**
 * Class to manage APi connections
 *
 * @class APIs
 */

class API {
    instance: AxiosInstance;
    token: string | null;
    baseURL: string | undefined;

    constructor(token: string | null = null) {
        this.baseURL = process.env.API_URL;
        this.instance = axios.create({
            baseURL: `http://${this.baseURL}:3000`,
            timeout: 3000,
            headers: {
                'Accept': '*/*',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Content-Type': 'application/json'
            }
        });

        this.token = token;
    }

    fetchData(conf: any) {
        if (conf.config) {
            this.instance.get(conf.path, { params: conf.config }).then(res => conf.setHandler(res.data));
        } else {
            this.instance.get(conf.path).then(res => conf.setHandler(res.data));
        }
    }
}

export default API;
