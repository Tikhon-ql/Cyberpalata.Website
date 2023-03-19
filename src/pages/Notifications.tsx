import { observer } from "mobx-react-lite";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import { AuthVerify } from "../utis/scripts/AuthVerify";
import headerRerenderStore from "../utis/stores/headerRerenderStore";
import { Notification } from "../utis/types/types";
import React from "react";
import notificationRerenderStore from "../utis/stores/notificationRerenderStore";

export const Notifications = observer(() => {

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);
    
    useEffect(()=>{
        if(AuthVerify())
        {
            setLoading(true);
            api.get(`/notifications/getNotifications`).then((res:any)=>{
                console.log("Anime");
                console.dir(res.data);
                setNotifications(res.data);
            }).catch((error:any)=>{
                if(error.code && error.code == "ERR_NETWORK")
                {
                    setIternalServerError(true);
                }
                if((error.response.status >= 500 && error.response.status <= 599))
                {
                    setIternalServerError(true);
                }
            }).finally(()=>{setLoading(false)});
        }
    },[notificationRerenderStore.state])


    function showNotifications()
    {
        if(notifications?.length == 0)
        {
            toast.success(`Notification list is empty`);
        }
        else
        {
            api.put(`/notifications/setCheckedState`);
            notifications.forEach(element => {
                toast.success(`${element?.date} ${element?.text}`);
            });
            setNotifications([]);
        }
    }

    return <> {iternalServerError ? <div></div> :    <a onClick={()=>{showNotifications()}} style={{"display":"flex","alignItems":"center"}}>
    <div className='headerButton notification' style={{"marginRight":"3vh","display":"flex", "alignItems":"center","justifyContent":"center"}}>
         <img  src={require(`./../assets/imgs/notifications.png`)}/>
         {notifications?.length != 0 && <div className='counter'>{notifications?.length}</div>}
 </div>
</a>   }
      
    </>
})