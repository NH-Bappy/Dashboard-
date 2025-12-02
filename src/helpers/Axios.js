import axios from "axios";



const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_DOMAIN}/${import.meta.env.VITE_BASE_URL}`,
    withCredentials:true
});


//

// Add a request interceptor

api.interceptors.request.use(
    function (config) {
        // Skip auth for login or registration
        if (
            config.url.includes("/auth/login") ||
            config.url.includes("/auth/registration")
        ) {
            return config;
        }

        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            console.warn("Token missing");
            return config; // do NOT throw error here
        }

        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


// Add a response interceptor

// api.interceptors.response.use(
//     (res) => res,
//     async (error) => {
//         try {

//         } catch (error) {
//             return Promise.reject(error);
//         }
//     });


export {api};