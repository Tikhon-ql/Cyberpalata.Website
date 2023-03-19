import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import React from "react";
import { Chat } from "../../utis/types/types";
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";
import { ChatTable } from "./ChatTable";
import { Pagination } from "../../utis/components/pagination/Pagination";

export type Chats = {
    items: Chat[],
    pageSize: number,
    totalItemsCount: number,
}

export const ChatList = () => {

    const [chats, setChats] = useState<Chats>({items:[], pageSize:0,totalItemsCount:0});
    const [curPage, setCurPage] = useState<number>(1);
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        setLoading(true);
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
        }).finally(()=>{
            setLoading(false);
        })
    },[curPage]);

    return <> {iternalServerError ? <div>
        <IternalServerError/>
    </div>: 
          <div>
          <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"89vh","marginTop":"1vh"}}>
          <div className='d-flex align-items-center justify-content-center w-75 h-100 bg-dark' style={{"color":"white","paddingInline":"2vw", "borderRadius":"2vh"}}>
                  <div className="w-100 h-100">
                      <div className="w-100 h-100 p-1">
                          <h1 className='m-5' style={{"textAlign":"center"}}>Chats</h1>
                          <div style={{"display":"flex","justifyContent":"center","alignItems":"center","height":"70%"}}><ChatTable chats={chats?.items} loading={loading}/></div>
                          <div className="m-3" style={{"position":"absolute","bottom":"0","left":"47%"}}>
                              <Pagination totalItemsCount = {chats?.totalItemsCount}  pageCount = {chats?.pageSize} actualSize = {chats?.items.length} curPage = {curPage} setCurPage = {setCurPage}/>
                          </div>
                              {/* {gamings.map((item, index)=>{
                                  return <ul key={index}>
                                      {item.map((room, index)=>{
                                          return <li key={index} style={{width:"100px",height:"100px",backgroundColor:"white", display:"inline"}}>
                                              {room.name}
                                          </li>
                                      })}
                                  </ul>
                                  searchName={searchName} hoursCount={hoursCount as unknown as number} date={date} begining={begining} freeSeatsCount={freeSeatsCount as unknown as number} freeSeatsInRowCount={freeSeatsInRowCount as unknown as number} refresh={refresh
                              })} */}
                          </div>
                         
                      </div>
                  </div>
          </div>
              </div>}
    </>
}