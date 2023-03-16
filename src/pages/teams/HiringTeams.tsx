import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api/api";
import { sendNotification } from "../../utis/scripts/signalR";
import notificationStore from "../../utis/stores/notificationStore";
import { Team } from "../../utis/types/types";

export type TeamList = {
    items: Team[],
    pageSize: number,
    totalPageCount: number
}

export const HiringTeams = () => {

    const [teamList, setTeamList] = useState<TeamList>();
    const [curPage, setCurPage] = useState<number>(1);
    const [curTeamId, setCurTeamId] = useState<string>("");

    useEffect(()=>{
       api.get(`/teams/getHiringTeams?page=${curPage}`).then(res=>{
            setTeamList(res.data);
       });
    },[]);

    function sendTeamJoinRequest(event: any)
    {
        var requestBody = {
            teamId: event.target.id
        };
        var team:Team | undefined;
        var lenght: number | undefined = teamList?.items.length;
        for(let i = 0;i < (lenght as number);i++)
        {
            if(teamList?.items[i].id == event.target.id)
            {
                team = teamList?.items[i];
            }
        }
        // console.dir(requestBody);
        api.post(`/joinRequests/createJoinRequest?teamId=${event.target.id}`).then(res=>{
            toast.success("Request sended successfully");
            if(team)
            {
                sendNotification(notificationStore.connection, team.captainId);
                console.log("Notifications sent");
            }
        }).catch(error=>{
            const data = error.response.data;
            if(data.Other)
            {
                toast.error(data.Other);
            }
        });
    }

    return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh"}}>
         <ul className="list-style-non w-50" style={{"listStyle":"none"}}>
             {teamList?.items.map((item:Team, index)=>{
                console.log("dshfiodsjfjdsofidsiofsdiodaTEAm");
                 return <li key={index} className="text-decoration-none m-1" value={item.id}>       
                         <a className="text-decoration-none text-dark">
                             <div className="d-flex bg-white rounded p-2">
                                 <img src="https://cdn-icons-png.flaticon.com/512/9743/9743492.png" style={{"width":"50px"}}/>
                                 <h6 className="m-3">{item.name}</h6>          
                                 <a onClick={(event)=>{sendTeamJoinRequest(event)}} style={{display:"flex",justifyContent:"center",alignItems:"center"}}><img id={item.id}  style={{width:"35px",height:"35px",position:"relative", right:"0px"}} src={require(`./../../assets/imgs/plus.png`)}/></a>
                             </div>
                         </a>
                 </li>
             })}
     </ul>
    </div>
}