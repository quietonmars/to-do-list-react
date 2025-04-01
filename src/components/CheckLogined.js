import axios from "axios";
import {BaseUrl} from "../constants";

export const verifyToken = async () => {
    const token = localStorage.getItem("Token");

    if (!token) {
        window.location.href = "/login";
        return false;
    }

    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/user/',
            headers: {
                'Authorization': 'Token ' + token
            },
        };
        // 验证 Token 是否有效
        await axios.request(config)
            .then((response) => {
                console.log("Verify Token Response:" + JSON.stringify(response.data));
                return true;
            })
            .catch((error) => {
                console.error("Invalid Token:", error);
                localStorage.removeItem("Token");
                window.location.href = "/login";
                return false;
            });
        return true;
    } catch (error) {
        console.error("Invalid Token:", error);
        localStorage.removeItem("Token");
        window.location.href = "/login";
        return false;
    }
};

