import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { observer } from "mobx-react-lite";
import React from 'react';
import api from "../../api/api";
import stateStore from "../stores/stateStore";

export const AccessTokenVerify = observer(() => {
    let location = useLocation();

    function checkAccessTokenExpirationTime()
    {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken != null)
        {
            var decodedToken:any  = jwtDecode(accessToken);
            let minutes = 1 * 30;

            if(decodedToken.exp - minutes < (Date.now() / 1000))
            {
                console.log(decodedToken.exp - minutes);
                console.log(Date.now() / 1000);
                var refreshToken = localStorage.getItem('refreshToken');
                if(refreshToken != null)
                {
                    const requestBody =
                    {       
                        "accessToken" : accessToken,
                        "refreshToken":refreshToken
                    }
                    api.post(`/authentication/refresh`,requestBody).then((res:any)=>
                        {
                            localStorage.setItem("accessToken", res.data.accessToken);
                            localStorage.setItem("refreshToken", res.data.refreshToken);
                            stateStore.stateChange();
                        }).catch(console.log);      
                    console.log("Access token has been refreshed.");
                }      
            }
        }
    }


    useEffect(()=>{
        setInterval(checkAccessTokenExpirationTime,5000);
        console.log(location);
    },[]);
    return <></>
})