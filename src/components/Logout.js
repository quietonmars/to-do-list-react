import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";

function Logout(props) {
    const [token, setToken] = useState("")
    const [isDisabled, setIsDisabled] = useState("disabled");

    useEffect(() => {
        setIsDisabled("disabled");
        const fetchData = async () => {

            setToken(localStorage.getItem("Token"));
            console.log(localStorage.getItem("Token"));
            setIsDisabled(false);
        }
        fetchData();
    }, []);

    const logout = async () => {
        console.log("start logout");
        let data = '';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/logout/',
            headers: {
                'Authorization': 'Token ' + token
            },
            data: data
        };

        const response = await axios.request(config);
        console.log("Real Logout Response:" + JSON.stringify(response.data));
        localStorage.removeItem("Token");
        // console.log("Remove Token" + localStorage.getItem("Token"));
        window.location.href = "/";

    }

    return (
        <div>
            <h1>Logout</h1>
            <button disabled={isDisabled} data-testid="mylogout" onClick={logout}>Logout You Account</button>
        </div>
    );
}

export default Logout;