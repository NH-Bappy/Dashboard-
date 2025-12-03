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

        config.headers.Authorization = `Bearer ${accessToken}`;
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
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            console.warn("Unauthorized: Please login first.");
            console.log("You are not logged in. Please login first.");

            // Optional redirect
            // window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export { api };
