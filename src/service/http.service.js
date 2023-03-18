/* eslint-disable prefer-regex-literals */
/* eslint-disable indent */
import axios from "axios";
import { toast } from "react-toastify";
import configJson from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageService from "./localstorage.service";

const expiresDate = localStorageService.getExpDate();
const refreshToken = localStorageService.getRefreshToken();
const accessToken = localStorageService.getAccessToken();

axios.defaults.baseURL = configJson.isFarebase.apiEndPointFirebase;

axios.interceptors.request.use(
    async function (config) {
        // Do something before request is sent
        if (configJson?.isFarebase.db) {
            config.url = config.url.match(/.json/gi)
                ? config.url
                : (/\/$/gi.test(config.url)
                      ? config.url.slice(0, -1)
                      : config.url) + ".json";

            if (refreshToken !== null && expiresDate < Date.now()) {
                const { data } = await httpAuth.post("token", {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });
                localStorageService.setToken({
                    expiresIn: data.expires_in,
                    idToken: data.id_token,
                    localId: data.user_id,
                    refreshToken: data.refresh_token
                });
            }
            if (accessToken) {
                config.params = {
                    ...config.params,
                    auth: accessToken
                };
            }
        }

        return config;
    },

    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data;
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
