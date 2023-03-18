import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import { ClimbingBoxLoader } from "react-spinners";
import api from "../../api/api";
import { Loader } from "../../utis/components/loader/Loader";
import { Pagination } from "../../utis/components/pagination/Pagination";
import { UserTournament } from "../../utis/types/types";
import { QRCodeCanvas } from "qrcode.react";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";

export type UserTournamentList = {
    items: UserTournament[],
    totalItemsCount: number,
    pageSize: number
}

export const UsersTournaments = ()=>{
    // const {tournamentId} = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    const [usersTournamentsList, setUsersTournamentsList] = useState<UserTournamentList>(
        {
            items:[
                {
                    id:"",
                    name:"Tourname 1",
                    date:"15.03.2020",
                    teamId:""
                },
                {
                    id:"",
                    name:"Tourname 1",
                    date:"15.03.2020",
                    teamId:""
                },
                {
                    id:"",
                    name:"Tourname 1",
                    date:"15.03.2020",
                    teamId:""
                },
            ],
            pageSize: 3,
            totalItemsCount: 5
        }
    );
    const [curPage, setCurPage] = useState<number>(1);
    useEffect(()=>{
        setIsLoading(true);
        api.get(`/tournaments/getUsersTournaments?page=${curPage}`).then(res=>{
            console.dir(res.data);
            setUsersTournamentsList(res.data);
        }).catch(error=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                setIternalServerError(true);
            }
        }).finally(()=>{setIsLoading(false)});
    },[curPage]);

    useEffect(()=>{
        var columnCount: string = usersTournamentsList?.items.length >= 3 ? "3" : usersTournamentsList?.items.length as unknown as string;
        document.getElementById("qrList")?.style.setProperty('column-count', columnCount);
    }, [usersTournamentsList])

    return <>{iternalServerError ? <div><IternalServerError/></div> : <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh"}}>
    {isLoading ? <div>
        <Loader loading={isLoading}/>
    </div>:
        <div style={{"width":"80%","height":"80vh","backgroundColor":"#242C48","borderRadius":"1vw","marginTop":"2vw"}}>
            <div className="w-100" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <div style={{width:"90%","height":"60vh", "display":"flex","justifyContent":"center","alignItems":"center"}}>
                        <ul id="qrList" className="list-style-non w-100" style={{"listStyle":"none","display":"flex","justifyContent":"center","alignItems":"center"}}>
                            {usersTournamentsList?.items.map((item:UserTournament, index)=>{
                                return <li key={index} style={{"width":"20vw","height":"50vh","marginInline":"3vw","backgroundColor":"white","borderRadius":"1vw","display":"flex","justifyContent":"center","alignItems":"center"}}>
                                    <div>
                                        <QRCodeCanvas
                                            id="qrCode"
                                            value={`https://localhost:3000/#/checkTeam/${item.id}/${item.teamId}`}
                                            size={250}
                                            bgColor={"#FFFFFF"}
                                            level={"H"}
                                        />
                                        <div style={{textAlign:"center", color:"black"}}>
                                            <div style={{marginBottom:"1vh"}}><h4>Tournament: </h4>{item?.name}</div>
                                            <div><h4>Date: </h4>{item?.date}</div>
                                        </div>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                  
            </div>
            <div>
                <Pagination totalItemsCount = {usersTournamentsList?.totalItemsCount} pageCount = {usersTournamentsList?.pageSize} curPage = {curPage} setCurPage = {setCurPage}/>
            </div>
        </div>  
    }
    </div>}</> 
}





// <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"80vh"}}>
// <div className="w-100">
//     <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
//         <ul className="list-style-non w-50" style={{"listStyle":"none"}}>
//             {usersTournamentsList?.items.map((item:UserTournament, index)=>{
//                 return <li key={index} className="text-decoration-none m-1">       
//                         <Link className="text-decoration-none text-dark" to={`/showQrCode/${item.id}/${item.teamId}`}>
//                             <div className="d-flex bg-white rounded p-2">
//                                 <img src="https://cdn-icons-png.flaticon.com/512/9743/9743492.png" style={{"width":"50px"}}/>
//                                 <h6 className="m-3">{item.name}</h6> 
//                             </div>
//                         </Link>
//                 </li>
//             })}
//         </ul>
//     </div>
//     <div>
//         <Pagination totalItemsCount = {usersTournamentsList?.totalItemsCount} pageCount = {usersTournamentsList?.pageSize} curPage = {curPage} setCurPage = {setCurPage}/>
//     </div>
// </div>
// </div>  