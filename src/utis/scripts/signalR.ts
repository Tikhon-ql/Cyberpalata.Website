import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import jwt_decode from "jwt-decode";
import { MessageToSend } from "../../utis/types/types";
import headerRerenderStore from "../stores/headerRerenderStore";
import notificationRerenderStore from "../stores/notificationRerenderStore";
import notificationStore from "../stores/notificationStore";

export const joinChatRoom = async(user:any, chat:any, setConnection:any, setMessageList:any)=>{
    try
    {
        let accessToken = localStorage.getItem('accessToken');
        if(accessToken)
        {
            // console.log(accessToken);
            //https://localhost:7227
            //https://dotnetinternship2022.norwayeast.cloudapp.azure.com:84 
            const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7227/chat")
            .configureLogging(LogLevel.Information)
            .build();
    
            connection.on("ReceiveMessage",(user,message)=>{
                console.log(message);
                
                setMessageList((messages: any)=>[...messages, {user, message}]);
            })
    
            connection.onclose(e=>{
                setConnection();
                setMessageList([]);
            })
    
            await connection.start();
            await connection.invoke("JoinRoom",{user, chat})
            setConnection(connection);
        }   
    }
    catch(e)
    {
        console.log(e);
    }
}

export const sendMessage = async(message: MessageToSend, connection:any)=>{
    try{

        await connection.invoke("SendMessage", message);
    }
    catch(e)
    {
        console.log(e);
    }
}

export const closeConnection = async(connection:any)=>{
    try
    {
        await connection.stop();
    }
    catch(e)
    {
        console.log(e);
    }
}



export const joinNotificationsBroadcasting = async () => {
    try
    {
        let accessToken = localStorage.getItem('accessToken');
        if(accessToken)
        {
            let decodeToken:any = jwt_decode(accessToken);
            // console.log(accessToken);
            //https://localhost:7227
            //https://dotnetinternship2022.norwayeast.cloudapp.azure.com:84 
            const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7227/notify")
            .configureLogging(LogLevel.Information)
            .build();
    
            connection.on("ReceiveNotification",(user,message)=>{
                console.log("Hello world!!!");
                notificationRerenderStore.setState();
                // setMessageList((messages: any)=>[...messages, {user, message}]);
            })
    
            connection.onclose(e=>{
                // setConnection();
                // setMessageList([]);
            })
    
            await connection.start();
            await connection.invoke("JoinNotificationsBroadcasting",decodeToken.sid);
            notificationStore.setConnection(connection);
        }   
    }
    catch(e)
    {
        console.log(e);
    }
}

export const sendNotification = async(connection:any, receiver: string)=>{
    try{

        await connection.invoke("SendNotification", receiver);
    }
    catch(e)
    {
        console.log(e);
    }
}