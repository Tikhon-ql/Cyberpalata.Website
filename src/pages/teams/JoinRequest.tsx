import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";
import { Pagination } from "../../utis/components/pagination/Pagination";
import { JoinRequest } from "../../utis/types/types";
import { JoinRequestsTable } from "./JoinRequestsTable";

export type JoinRequestList = {
    items: JoinRequest[],
    pageSize: number,
    totalItemsCount: number
}

export const JoinRequests = ()=>{

    const [joinRequests, setJoinRequests] = useState<JoinRequestList>();
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);
    const [curPage, setCurPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(()=>{
        setLoading(true);
        console.log("Log 1");
        api.get(`/joinRequests/getTeamJoinRequests?page=${curPage}`).then((res:any)=>{
            console.log("Join requests");
            console.dir(res);
            setJoinRequests(res.data);
        }).finally(()=>{setLoading(false)});
    },[curPage,refresh]);

  

    return <>{iternalServerError ? <div>
        <IternalServerError/>
    </div> : <div>
    <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"89vh","marginTop":"1vh"}}>
    <div className='d-flex align-items-center justify-content-center w-75 h-100 bg-dark' style={{"color":"white","paddingInline":"2vw", "borderRadius":"2vh"}}>
            <div className="w-100 h-100">
                <div className="w-100 h-100 p-1">
                    <h1 className='m-5' style={{"textAlign":"center"}}>All requests</h1>
                    <div style={{"display":"flex","justifyContent":"center","alignItems":"center","height":"70%"}}><JoinRequestsTable refresh={refresh} setRefresh={setRefresh} joinRequests={joinRequests?.items} loading={loading}/></div>
                    <div className="m-3" style={{"position":"absolute","bottom":"0","left":"47%"}}>
                        <Pagination totalItemsCount = {joinRequests?.totalItemsCount}  pageCount = {joinRequests?.pageSize} actualSize = {joinRequests?.items.length} curPage = {curPage} setCurPage = {setCurPage}/>
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