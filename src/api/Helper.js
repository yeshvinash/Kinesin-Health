import { Navigate } from "react-router-dom";
import { persistor } from "../redux/Store";




export const logoutFromHelper = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("requestId");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userId");
    persistor.pause();
    persistor.flush().then(() => {
        return persistor.purge();
    });
};


export var render = function () {

};