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
    async (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        console.log("⚠️ AXIOS ERROR STATUS:", status);
        console.log("⚠️ AXIOS ERROR MESSAGE:", message);

        // If token is expired — just show the error now
        if (status === 401 && message === "Token is invalid or expired") {
            console.error("🔥 ACCESS TOKEN EXPIRED 🔥");
        }

        return Promise.reject(error);
    }
);

export { api };
