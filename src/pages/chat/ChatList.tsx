import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import React from "react";
import { Chat } from "../../utis/types/types";
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";

export type Chats = {
    items: Chat[],
    pageSize: number,
    totalItemsCount: number,
}

export const ChatList = () => {

    const [chats, setChats] = useState<Chats>({items:[], pageSize:0,totalItemsCount:0});
    const [curPage, setCurPage] = useState<number>(1);
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    useEffect(()=>{
        api.get(`/chats/getChatList?page=${curPage}`).then(res=>{
            console.log("Chat list");
            console.dir(res);
            setChats(res.data);
        }).catch((error)=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                setIternalServerError(true);
            }
        })
    },[]);

    return <> {iternalServerError ? <div>
        <IternalServerError/>
    </div>: 
            <div className="myConteiner">
            {chats?.items.map((item: Chat,index)=>{
                return <Link to={`/chats/${item.chatId}/${item.isYouACaptain}/${item.teamId}/${item.otherId}`} className={item.isYouACaptain ? "bg-dark" : "bg-info"} key={index}>
                        <div className="w-100">
                            <div>{item.otherUserName}</div>
                            <div>{item.otherUserSurname}</div>
                        </div>
                    </Link>
            })}
        </div>}
    </>
}