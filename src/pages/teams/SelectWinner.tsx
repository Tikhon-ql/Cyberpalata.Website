import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";

export const SelectWinner = () => {

    const {firstTeamName} = useParams();
    const {firstTeamId} = useParams();
    const {secondTeamName} = useParams();
    const {secondTeamId} = useParams();
    const {batleId} = useParams();
    const {tournamentId} = useParams();

    const navigate = useNavigate();

    const [winnerId, setWinnerId] = useState<string>("");
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    function submitWinner(e:any)
    {
        e.preventDefault();
        var requestBody = {
            tournamentId: tournamentId,
            batleId: batleId,
            winnerId: e.target.elements.winner.value
        }
        console.dir(requestBody);
        api.post(`/batles/setWinner`,requestBody).then((res:any)=>{navigate(`/showTournamentDetailed/${tournamentId}`)})
        .catch((error:any)=>{
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

    return ( <>{iternalServerError ? <div><IternalServerError/></div>:
        <div> 
            <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"80vh",color:"white"}}>
            <form onSubmit={(e)=>{submitWinner(e)}}>
                <input id="winner1" name="winner" type="radio" value={firstTeamId}/><label>{firstTeamName}</label>
                <input id="winner2" name="winner" type="radio" value={secondTeamId}/><label>{secondTeamName}</label>
                <input type="submit" value="Submit"/>
            </form>
            </div>
        </div>}
    </>
       
    )
}