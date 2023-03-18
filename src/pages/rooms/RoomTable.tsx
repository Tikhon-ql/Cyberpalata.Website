import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { Loader } from "../../utis/components/loader/Loader";
import { AuthVerify } from "../../utis/scripts/AuthVerify";
import { RoomItem } from "../../utis/types/types";

export type RoomList = {
    items: RoomItem[],
    totalItemsCount:number,
    pageSize: number
}

type Props = {
    // searchName: string,
    // begining:string,
    // date:string,
    // hoursCount: number,
    // freeSeatsCount: number,
    // freeSeatsInRowCount: number,
    // refresh: boolean,
    gamingList: any,
    loading: boolean
}

export const RoomTable = ({gamingList, loading}: Props) => {
    const [curPage, setCurPage] = useState(1);
   
    return <><div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"42vh"}}>
        {loading ?
        <div>
            <Loader loading={loading}/>
        </div>
        :  <div>
            <div style={{"overflowY":"scroll","height":"40vh"}}>
                <table className="container w-100 text-white" >
                    <thead>
                        <tr>
                            <th style={{"width":"3vw"}}><h1 className="tableh1">№</h1></th>
                            <th style={{"width":"17vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Room</h1></th>
                            <th style={{"width":"17vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Free seats count</h1></th>
                            <th style={{"width":"7vw"}}></th>
                            {AuthVerify() &&  <th style={{"width":"7vw"}}></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {gamingList?.map((room: RoomItem, index:number)=>{
                            return <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td style={{"textAlign":"center"}}>
                                    {room.name}
                                </td>
                                <td style={{"textAlign":"center"}}>
                                    {room.freeSeatsCount == "-1" ? "-" : room.freeSeatsCount}
                                </td>
                                <td style={{backgroundColor:"#238D43"}}>
                                    <Link to={`/room/${room.id}/${room.name}`} style={{"textAlign":"center"}}>Info</Link>
                                </td>
                                {AuthVerify() &&     <td style={{backgroundColor:"#FFC840"}}>
                                    <Link to={`/booking/${room.id}/${room.name}`}>Booking</Link>
                                </td>}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
       
        </div>}
    </div>
    </>
}