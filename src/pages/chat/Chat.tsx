import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom"
import React from "react";
import { MessageContainer } from "./MessageContainer";
import jwtDecode from "jwt-decode";
import { ChatUser, Message, MessageToSend } from "../../utis/types/types";
import api from "../../api/api";
import { joinChatRoom, sendMessage, sendNotification } from "../../utis/scripts/signalR";
import notificationStore from "../../utis/stores/notificationStore";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
// export type MessageList = {
//     items: Message[],
//     pageSize: number,
//     totalItemsCount: number
// }

export const Chat = observer(()=>{
    const {chatId} = useParams<string>();
    const {isYouACaptain} = useParams();
    const {teamId} = useParams<string>();
    const {otherId} = useParams<string>();
    const [connection, setConnection] = useState();
    const [user,setUser] = useState<ChatUser>({id:"",email:""});
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    const [message, setMessage] = useState<string>("");

    const accessToken:any = jwtDecode(localStorage.getItem('accessToken') || "");
    if(accessToken)
    {
        console.dir(accessToken);
        user.id = accessToken.sid;
        user.email = accessToken.email;
    }

    // const messageRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    //ref={messageRef}

    useEffect(()=>{
        api.get(`/chats/getMessages?chatId=${chatId}`).then(res=>{
            setMessageList(res.data);
        }).catch((error=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                setIternalServerError(true);
            }
        }));

        joinChatRoom(user,chatId ,setConnection,setMessageList);
    },[]);

    function answerRequest(isAccpeted: boolean)
    {
        var requestBody = {
            teamId: teamId,
            userToJoinId: otherId,
            chatId: chatId,
            isAccepted:isAccpeted
        };
        api.put(`/joinRequests/answerJoinRequest`,requestBody).then(()=>{
            sendNotification(notificationStore.connection, otherId as string);
        }).catch((error)=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                setIternalServerError(true);
            }
            toast.error(error.response.data.Other);
        });
    }

    return <>{iternalServerError ? <div>
        <IternalServerError/>
    </div>:
    <div className="myConteiner">
        <div className="chatPlaceholder">
            <div className="messageContainer">
                <MessageContainer messages={messageList} curUser={user.email}/>
            </div>
        
            <form onSubmit={(e)=>
                {
                    e.preventDefault();
                    console.log("send message invoke");
                    var messageToSend: MessageToSend = {message:message,sender: user.email,chatId: chatId as string };
                    sendMessage(messageToSend, connection);
                    setMessage("");
                }}>
                <input  type="text" onChange={(e)=>{setMessage(e.target.value);}} value={message} required/>
                <input type="submit" value="Send"/>
                {isYouACaptain == "true" && <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                        <a style={{margin:"1vh",border: "1px solid white",borderRadius:"10px", padding:"1vh 1vw",color:"white"}} onClick={(e)=>{answerRequest(true)}}>Accept</a>
                        <a style={{margin:"1vh",border: "1px solid white",borderRadius:"10px", padding:"1vh 1vw",color:"white"}} onClick={(e)=>{answerRequest(false)}}>Declain</a>
                    </div>}
            </form>
        </div>
    </div>
    }
</> 
})



{/* <>{(messageRef && messageRef.current) ? 
                            <div>
                                <div key={index}>
                                    <div className="message bg-dark">{message.messageText}</div>
                                    <div className="from-user">{message.username}</div>
                                </div>
                            </div> : 
                          } 
                        </> */}