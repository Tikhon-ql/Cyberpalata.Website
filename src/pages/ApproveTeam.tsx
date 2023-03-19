import React, { useEffect, useState } from "react" 
import { Link } from "react-router-dom"; 
import { useParams } from "react-router-dom" 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import api from "../api/api";
import { TeamDetailed, TeamMember } from "../utis/types/types";
 
export const ApproveTeam = () => { 
    const {tournamentId} = useParams(); 
    const {teamId} = useParams(); 
    const [teamInfo, setTeamInfo] = useState<TeamDetailed>(); 
 
    useEffect(()=>{ 
        api.get(`/teams/getTeamInTournament?teamId=${teamId}&tournamentId=${tournamentId}`).then(res=>{ 
            setTeamInfo(res.data); 
        }); 
    },[]); 
 
    function approveTeam(e:any) 
    { 
        e.preventDefault(); 
        api.put(`/tournaments/approveTeam?teamId=${teamId}&tournamentId=${tournamentId}`).then(res=>{ 
            toast.success("Team successfully approved."); 
        }).catch(error=>{
            toast.error(error.response.data);
        }); 
    } 
 
    return <> 
        <div style={{color:"white","display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"80vh"}}> 
            <div> 
                <h4>Team: {teamInfo?.name}</h4><hr/> 
                <h4>Captain: {teamInfo?.captainName}</h4><hr/> 
                <h4>Members</h4> 
                <table className="container text-white">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Member</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {teamInfo?.members.map((member: TeamMember, index)=>{
                        return <tr>
                            <td>{index + 1}</td>
                            <td>{member.name}</td>
                            <td>{member.position}</td>
                        </tr>
                    })}
                </tbody>
            </table>
                <div style={{display:"flex",justifyContent:"center"}}> 
                    <a onClick={(e)=>{approveTeam(e)}} style={{"border":"1px solid","padding":"0.5vh 1.5vh 0.5vh 1.5vh","borderRadius":"1vh","marginRight":"1vw",marginBottom:"3vh"}}>Accept</a> 
                </div> 
            </div>         
        </div> 
    </> 
}