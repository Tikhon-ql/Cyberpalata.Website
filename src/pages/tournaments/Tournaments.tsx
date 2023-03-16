import { useEffect, useState } from "react"
import {Link} from "react-router-dom";
import React from 'react'
import { Tournament } from "../../utis/types/types";
import { Pagination } from "../../utis/components/pagination/Pagination";
import api from "../../api/api";
import { TournamentTable } from "./TournamentTable";
import { Loader } from "../../utis/components/loader/Loader";
import { toPrimitive } from "mobx/dist/internal";

export type TournamentList = {
    items: Tournament[],
    totalItemsCount: number,
    pageSize: number,
    isCaptain:boolean
}

export const Tournaments = ()=>{

    const [searchName, setSearchName] = useState<string>("");
    const [tournamentsChecked, setTournamentsChecked] = useState<string>("all");
    const [refresh, setRefresh] = useState<boolean>(false);
    const [tournamentList, setTournamentList] = useState<TournamentList>({
        items:[
            {
                id:"",
                name:"Tournament 1",
                teamsCount: 15,
                date:"15.03.2023",
                begining:"",
            },
            {
                id:"",
                name:"Tournament 1",
                teamsCount: 15,
                date:"15.03.2023",
                begining:""
            }, 
            {
                id:"",
                name:"Tournament 1",
                teamsCount: 15,
                date:"15.03.2023",
                begining:""
            },
            {
                id:"",
                name:"Tournament 1",
                teamsCount: 15,
                date:"15.03.2023",
                begining:""
            },
            {
                id:"",
                name:"Tournament 1",
                teamsCount: 15,
                date:"15.03.2023",
                begining:""
            },
        ],
        pageSize:5,
        totalItemsCount:12,
        isCaptain: false
    });
    const [curPage, setCurPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        setLoading(true);
        var requestBody = {
            searchName: searchName,
            allTournaments: false,
            actualTournaments: false,
            page: curPage
        };
        if(tournamentsChecked === "all")
        {
            requestBody.allTournaments = true;
        }
        if(tournamentsChecked == "actual")
        {
            requestBody.actualTournaments = true;
        }

        api.post(`/tournaments/getTournaments`,requestBody).then(res=>{
            console.dir(res.data);
            setTournamentList(res.data);
           
        }).finally(()=>{setLoading(false)});
    },[curPage,refresh]);
   
    return <div style={{"display":"flex","justifyContent":"center","alignItems":"center","height":"90vh"}}>{loading ? 
    <div>
        <Loader loading={loading}/>
    </div>
    :
    <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"89vh","marginTop":"1vh"}}>
    <div className='d-flex align-items-center justify-content-center w-75 h-100 bg-dark' style={{"color":"white","paddingInline":"2vw", "borderRadius":"2vh"}}>
            <div className="w-100 h-100">
                <div className="w-100 h-100 p-1">
                    <h1 className='m-5' style={{"textAlign":"center"}}>Tournaments</h1>
                    <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%"}}>
                        <form className="w-75" onSubmit={(e)=>{e.preventDefault(); setRefresh(!refresh);}}>
                            <input type="text" placeholder="Search..." onChange={(e) => {setSearchName(e.target.value)}} value={searchName}/>
                            <div style={{"display":"flex","justifyContent":"center","alignItems":"center","height":"100%"}}>
                                <label>All: </label><input id="all" type="radio" name="state" style={{"width":"1vw","marginRight":"1vw"}} checked={tournamentsChecked === "all" ? true : false} value="all"  onChange={(e)=>{setTournamentsChecked(e.target.value)}}/>
                                <label>Actual: </label><input id="actual" type="radio" style={{"width":"1vw","marginRight":"1vw"}} name="state" checked={tournamentsChecked === "actual" ? true : false} value="actual" onChange={(e)=>{setTournamentsChecked(e.target.value )}}/>
                                <label>Not actual: </label><input id="notActual" type="radio" style={{"width":"1vw","marginRight":"1vw"}} name="state" checked={tournamentsChecked === "notActual" ? true : false} value="notActual" onChange={(e)=>{setTournamentsChecked(e.target.value)}}/>
                                <input type="submit" value={"Submit"}/>
                            </div>
                        </form>
                    </div>
                    <TournamentTable tournamentList={tournamentList?.items} isCaptain={tournamentList.isCaptain}/>
                    {/* <RoomTable gamingList={gamingList?.items}/> */}
                    <div className="m-3">
                        <Pagination totalItemsCount = {tournamentList?.totalItemsCount}  pageCount = {tournamentList?.pageSize} actualSize = {tournamentList?.items.length} curPage = {curPage} setCurPage = {setCurPage}/>
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
    }
    </div>
}


//     return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh"}}>
//     {isLoading ? 
//      <div>
//         <ClimbingBoxLoader
//           color={"white"}
//           loading={isLoading}/>
//      </div>:
//      <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"80vh"}}>
//      {/* <ul className="list-style-non w-50" style={{"listStyle":"none"}}>
//              {tournamentList?.items.map((item:Tournament, index)=>{
//                  return <li key={index} className="text-decoration-none m-1">       
//                          <Link className="text-decoration-none text-dark" to={`/showTournamentDetailed/${item.id}`}>
//                              <div className="d-flex bg-white rounded p-2">
//                                  <img src="https://cdn-icons-png.flaticon.com/512/9743/9743492.png" style={{"width":"50px"}}/>
//                                  <h6 className="m-3">{item.name}</h6> 
//                                  <Link to={`/registerTeam/${item.id}`} style={{background:"#383651","border":"1px solid","padding":"1vh","borderRadius":"1vh",height:"5.5vh",marginTop:"0.7vh", "marginRight":"1vw","textAlign":"center"}}>Register</Link>        
//                              </div>
//                          </Link>
//                  </li>
//              })}
//      </ul> */}
//      {/* <Pagination totalItemsCount = {tournamentList?.totalItemsCount} pageCount = {tournamentList?.pageSize} curPage = {curPage} setCurPage = {setCurPage}/> */}
//     </div>}</div>
// }
