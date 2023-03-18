import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";
import { Pagination } from "../../utis/components/pagination/Pagination";
import { RoomItem } from "../../utis/types/types";
import { RoomTable } from "./RoomTable";

export type RoomList = {
    items: RoomItem[],
    totalItemsCount:number,
    pageSize: number
}


export const Rooms = () => {
  
    let navigate = useNavigate();
  
    const [date, setDate] = useState<string>("");
    const [begining, setBegining] = useState<string>("");
    const [hoursCount, setHoursCount] = useState<string>("0");
    const [searchName, setSearchName] = useState<string>("");
    const [freeSeatsCount, setFreeSeatsCount] = useState<string>("0");
    const [freeSeatsInRowCount, setFreeSeatsInRowCount] = useState<string>("0");
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);
    const [gamingList, setGamingList] = useState<RoomList>({items:[
        {
            id:"room1",
            name:"Room 1",
            freeSeatsCount:"-"
        },
        {
            id:"room1",
            name:"Room 2",
            freeSeatsCount:"-"
        },
        {
            id:"room1",
            name:"Room 3",
            freeSeatsCount:"-"
        },
        {
            id:"room1",
            name:"Room 4",
            freeSeatsCount:"-"
        },
        {
            id:"room1",
            name:"Room 5",
            freeSeatsCount:"-"
        },
    ],
    totalItemsCount: 15,
    pageSize: 10,});
    const [curPage ,setCurPage] = useState(1);

    useEffect(()=>{
        setLoading(true);
        var requestBody:any = {
            searchName: searchName,
            freeSeatsCount: freeSeatsCount,
            freeSeatsInRowCount: freeSeatsInRowCount,
            date:date,
            begining: begining,
            hoursCount: hoursCount,
            page: curPage
        }
        api.post(`/gamingRooms/getRooms`,requestBody).then((res:any) => {
            setGamingList(res.data);
            setCurPage(res.data.currentPage);
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
    },[curPage, refresh]);

    // const [gamings, setGamings] = useState<RoomItem[][]>([]);

    // var gamings:RoomItem[][] = [];

  

    // const {type} = useParams();
    // useEffect(()=>{
    //     if(gamingList)
    //     {
    //         var pageSize = gamingList?.pageSize ? gamingList.pageSize : 0;
    //         console.log("Page size " + gamingList?.pageSize);
    //         console.dir(gamingList);
    //         for(let i = 0;i < pageSize;i += 5)
    //         {
    //             var chunk = gamingList?.items.slice(i, i + 5);
    //             console.log("Chunk" + i);
    //             console.dir(chunk);
    //             gamings.push(chunk ? chunk : []);
    //         }
    //         console.log("Gamings");
    //         console.dir(gamings);    
    //         setLoading(false);
    //     }       
    // },[gamingList])

    return <>{false ? <div>
        <IternalServerError/>
    </div>:<div>
    <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"89vh","marginTop":"1vh"}}>
    <div className='d-flex align-items-center justify-content-center w-75 h-100 bg-dark' style={{"color":"white","paddingInline":"2vw", "borderRadius":"2vh"}}>
            <div className="w-100 h-100">
                <div className="w-100 h-100 p-1">
                    <h1 className='m-3' style={{"textAlign":"center"}}>Gaming rooms</h1>
                    <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%"}}>
                        <form className="w-75" onSubmit={(e)=>{e.preventDefault();setCurPage(1); setRefresh(!refresh)}}>
                            <input type="text" placeholder="Search..." onChange={(e) => {setSearchName(e.target.value)}} value={searchName}/>
                            <div className="d-flex">
                                <input type="date" onChange={(e) => {setDate(e.target.value)}}/>
                                <input type="time" onChange={(e) => {setBegining(e.target.value)}}/>
                                <input type="range" min="0" onChange={(e) => {setHoursCount(e.target.value)}} max="10"/>
                            </div>
                            <label>Free seats</label><input type="range" min="0" max="30"  onChange={(e)=>{setFreeSeatsCount(e.target.value)}}/>
                            <label>Free seats in row</label><input type="range" min="0" max="30" onChange={(e)=>{setFreeSeatsInRowCount(e.target.value)}}/>
                            <input type="submit" value="submit"/>
                        </form>
                    </div>
                    <RoomTable gamingList={gamingList?.items} loading={loading}/>
                    <div className="m-3">
                        <Pagination totalItemsCount = {gamingList?.totalItemsCount}  pageCount = {gamingList?.pageSize} actualSize = {gamingList?.items.length} curPage = {curPage} setCurPage = {setCurPage}/>
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
        </div>}</>
}