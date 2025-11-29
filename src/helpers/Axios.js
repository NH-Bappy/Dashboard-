import axios from "axios";



const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_DOMAIN}/${import.meta.env.VITE_BASE_URL}`,
});


//

// Add a request interceptor

api.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
},
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