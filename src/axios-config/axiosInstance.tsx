
import axios, { AxiosError, AxiosRequestHeaders, GenericAbortSignal, InternalAxiosRequestConfig } from 'axios';
import { store } from '../redux/store/store';
import endpoints from './endpoints';
import { setToken } from '../redux/slice/authSlice';

interface NetworkConfig {
    signal?: GenericAbortSignal;
    headers?: AxiosRequestHeaders;
    token?: string;
    content_type?: boolean;
    timeOutTime?: number
};

const networkRequest = (networkConfig?: NetworkConfig) => {
    const { signal, token, content_type = true, timeOutTime = 10000 } = networkConfig!;
    const headers: Partial<AxiosRequestHeaders> = {
        'Content-Type': content_type ? 'multipart/form-data' : 'application/json',
        // Authorization: `Bearer ${process.env.AUTHORIZATION_KEY}`,
    };

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const PORT = {
        //Production
        PROD_URL: "https://api.negotigator.com/api/",

        //Staging
        STAGING_URL: "https://api.negotigator.com/api/",
    };

    const axiosInstance = axios.create({
        baseURL: PORT.PROD_URL,
        timeout: timeOutTime,
        headers,
        signal: signal,
    });
    axiosInstance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
        // console.log("......return request in Network-Request....\n")
        // console.log(JSON.stringify(request, null, 2), "requesttt")
        // console.log(".\n....return request in Network-Request....")
        return request;
    });

    createAxiosResponseInterceptor();

    function createAxiosResponseInterceptor() {
        const interceptor = axiosInstance.interceptors.response.use(
            (response) => {
                // console.log(JSON.stringify(response, null, 2), 'rsponse data .......')

                return response
            },
            async (error: AxiosError) => {
                console.log("error.response.status inside network-request", error.message)

                const refreshToken = store.getState().auth.refreshToken;
                const token = store.getState().auth.token;
                if (error.response && error.response.status === 401 && refreshToken) {
                    axiosInstance.interceptors.response.eject(interceptor);
                    try {
                        const url = `http://127.0.0.1:8000/api/accounts/token/refresh/`;
                        const headers = {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        };

                        const response = await axios.post(url, {
                            refresh: refreshToken,
                        }, { headers });
                        // const { token, refreshToken: newRefreshToken } = response.data.data;
                        const { access } = response.data;
                        store.dispatch(setToken(access));
                        /*Store the new token and refreshToken */
                        // await userData.storeInLocalData('token', token);
                        // await userData.storeInLocalData('refreshToken', newRefreshToken);
                        // store.dispatch(setToken(token));
                        // store.dispatch(setRefreshToken(newRefreshToken));
                        // store.dispatch(setSession('User'));

                        /*Return the previous request which got statusCode 401 with new token and get the data*/
                        error.response.config.headers['Authorization'] = `Bearer ${token}`;
                        return axios(error.response.config);
                    } catch (err: any) {
                        if (err.response && err.response.status === 400) {
                            throw { response: { status: 401 } };
                        }
                        return Promise.reject(err);
                    }
                    finally {
                        createAxiosResponseInterceptor();
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    return axiosInstance;
};

export default networkRequest;
