import axios from 'axios'

const axiosClientApi = axios.create({
    baseURL: "http://localhost:1001/care-health/api/v1",
});

axiosClientApi.interceptors.request.use(
    function (config) {
        const tokenUser = localStorage.getItem('token-user');
        if (tokenUser) {
            config.headers.Authorization = `Bearer ${tokenUser.trim()}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClientApi;