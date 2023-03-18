import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";
import { JoinRequest } from "../../utis/types/types";

export const JoinRequests = ()=>{

    const [joinRequest, setJoinRequest] = useState<JoinRequest>();
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    useEffect(()=>{
        console.log("Log 1");
        api.get(`/joinRequests/getTeamJoinRequests`).then(res=>{
            console.log("Join requests");
            console.dir(res);
            setJoinRequest(res.data[0]);
        });
    },[]);

    function setJoinRequestState(state: string)
    {
        console.log("sdoufbiodsf");
        var requestBody = {
            userToJoinId: joinRequest?.userId,
            teamId: joinRequest?.teamId,
            state: state
        }
        api.put(`/joinRequests/inProgressJoinRequest`,requestBody).then(res=>{toast.success("Accepted successfully")})
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

    return <>{iternalServerError ? <div>
        <IternalServerError/>
    </div> : <div>
    <div className="myConteiner">
        <div className="card">
            <div className="cardContent">
                <div>
                    {joinRequest?.username}
                </div>
                <div>
                    {joinRequest?.usersurname}
                </div>
            </div>
            <div className="links">
                <a className="blackLink" style={{marginBottom:"2vh"}}><img src={require(`./../../assets/imgs/skipArrow.png`)}  onClick={()=>{setJoinRequestState("Rejected")}} style={{"width":"15px", height:"15px",marginBottom:"0.5vh"}}/> Skip</a>
                <a  className="blackLink" style={{marginBottom:"2vh"}}><img src={require(`./../../assets/imgs/messenger.png`)} onClick={()=>{setJoinRequestState("InProgress")}}  style={{"width":"15px", height:"15px",marginBottom:"0.5vh"}}/> Open chat</a>
            </div>
        </div>
    </div> </div>}
    </> 
}