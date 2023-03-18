import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";
import { BatleToSelectWinner } from "../../utis/types/types";

type Props = {
    batle: BatleToSelectWinner
    tournamentId:string,
    setModalState:any
}


export const SelectWinner = ({batle,tournamentId, setModalState}:Props) => {

    // const {firstTeamName} = useParams();
    // const {firstTeamId} = useParams();
    // const {secondTeamName} = useParams();
    // const {secondTeamId} = useParams();
    // const {batleId} = useParams();
    // const {tournamentId} = useParams();

    const navigate = useNavigate();

    const [winnerId, setWinnerId] = useState<string>("");
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    function submitWinner(e:any)
    {
        e.preventDefault();
        var requestBody = {
            tournamentId: tournamentId,
            batleId: batle.batleId,
            winnerId: e.target.elements.winner.value
        }
        console.dir(requestBody);
        api.post(`/batles/setWinner`,requestBody).then(res=>{navigate(`/showTournamentDetailed/${tournamentId}`)}).catch(error=>{toast.error(error.data)}).finally(()=>{
            setModalState(false);
        }).catch(error=>{
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

    return (<>{iternalServerError ? <div><IternalServerError/></div>:  <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"80vh",color:"white"}}>
    <form onSubmit={(e)=>{submitWinner(e)}}>
        <input id="winner1" name="winner" type="radio" value={batle.firstTeamId}/><label>{batle.firstTeamName}</label>
        <input id="winner2" name="winner" type="radio" value={batle.secondTeamId}/><label>{batle.secondTeamName}</label>
        <input type="submit" value="Submit"/>
    </form>
</div>}</>
       
    )
}