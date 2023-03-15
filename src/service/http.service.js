/* eslint-disable indent */
import axios from "axios";
import { toast } from "react-toastify";
import configJson from "../config.json";

axios.defaults.baseURL = configJson.isFarebase.apiEndPointFirebase;

axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        if (configJson?.isFarebase.db) {
            config.url =
                (/\/$/gi.test(config.url)
                    ? config.url.slice(0, -1)
                    : config.url) + ".json";
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : [];
}

axios.interceptors.response.use(
    (res) => {
        if (configJson?.isFarebase.db) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (e) {
        const expErrors =
            e.response && e.response.status >= 400 && e.response.status < 500;
        if (!expErrors) {
            toast.error("Try again later or contact your administrator");
            console.error("Unexpected error: ", e);
        }
        return Promise.reject(e);
    }
);

const httpServer = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpServer;
