import React, { useEffect, useState } from "react"
import api from "../../api/api";
import { TeamDetailed, TeamMember } from "../../utis/types/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IternalServerError } from "../../utis/components/errors/IternalServerError";

type Props = {
    isCaptain:boolean
}

export const TeamInfo = ({isCaptain}:Props)=>{

    const [team, setTeam] = useState<TeamDetailed>();
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);
    useEffect(()=>{
        api.get(`/teams/getUserTeam`).then(res=>{
            setTeam(res.data);
        })
    },[])

    function sendTeamStartRecruting()
    {
        api.put(`/teams/setRecruting?teamId=${team?.id}`)
        .then(()=>{
            toast.success("Request sent successfully");
        })
        .catch((error)=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                setIternalServerError(true);
            }
        });
    }

    function deleteTeam()
    {
        api.delete(`/teams/deleteTeam?teamId=${team?.id}`)
        .then(()=>{
            toast.success("Team deleted successfully");
        }).catch((error)=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                setIternalServerError(true);
            }
        });
    }

    function leaveTeam()
    {
        api.delete(`/teams/leaveTeam?teamId=${team?.id}`)
        .then(()=>{
            toast.success("You left team successfully");
        }).catch((error)=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                setIternalServerError(true);
            }
        });
    }

    return <>{iternalServerError ? <div><IternalServerError/></div> : <div> <div>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <h3 style={{"textAlign":"center"}}>{team?.name}</h3>
        {isCaptain ? <div>
                <a onClick={(e) => {e.preventDefault(); sendTeamStartRecruting()}} className="m-1">Recruting</a>
                <a className="m-1" onClick={(e)=>{e.preventDefault(); deleteTeam()}}>Delete</a>
        </div>:<a className="m-1" onClick={(e)=>{e.preventDefault(); leaveTeam()}}>Leave</a> }
    </div>
   
    <table className="container text-white">
        <thead>
            <tr>
                <th>№</th>
                <th>Member</th>
                <th>Position</th>
            </tr>
        </thead>
        <tbody>
            {team?.members.map((member: TeamMember, index)=>{
                return <tr>
                    <td>{index + 1}</td>
                    <td>{member.name}</td>
                    <td>{member.position}</td>
                </tr>
            })}
        </tbody>
    </table>
</div></div>}</>
}