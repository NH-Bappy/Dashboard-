import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_DOMAIN}/${import.meta.env.VITE_BASE_URL}`,
    withCredentials: true
});

// =============================
// REQUEST INTERCEPTOR
// =============================
api.interceptors.request.use(
    function (config) {
        // Skip auth token for login or registration
        if (
            config.url.includes("/auth/login") ||
            config.url.includes("/auth/registration")
        ) {
            return config;
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            console.warn("Token is missing");
            return config;
        }
        config.headers.authorization = `Bearer ${accessToken}`;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// =============================
// RESPONSE INTERCEPTOR
// =============================
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const status = error.response?.status


        // Token expired
        try {
            const originalRequest = error.config;
            // const Response = error.response;
            // const status = error.response.status;
            // console.log("error from response interceptors:", error, config, response)
            if (status == 403 && !originalRequest._retry){
                originalRequest._retry = true

                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_DOMAIN}/${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    const newToken = response.data.data.accessToken;

                    // store new token
                    localStorage.setItem("accessToken", newToken);

                    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

                    // update original request header (important!)
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    // retry original request with updated token
                    return api(originalRequest);
                }


                // console.log("token expires that's why you see the error", response.data.data.accessToken)
            }
        } catch (error) {
            localStorage.removeItem("accessToken")
            window.location("/login")
            return Promise.reject(error)
        }
        return Promise.reject(error);
    }
);

export { api };
