import { Bounce, toast } from "react-toastify";

export const sendSuccessToast = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 1999,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
};


export const sendError = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 1999,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
};


export const sendInfo = (msg) => {
    toast.info(msg, {
        position: "top-center",
        autoClose: 4999,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
};