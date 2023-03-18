import React, {useState,useEffect} from 'react';
import { ClimbingBoxLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import api from '../../api/api';
import { toast } from 'react-toastify';
import { IternalServerError } from '../../utis/components/errors/IternalServerError';
import { Loader } from '../../utis/components/loader/Loader';

export type Round = {
    number:number,
    date:string
}

export const CreateTournament = ()=>{
    const [rounds, setRounds] = useState<Round[]>([]);
    const [maxState, setMaxState] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const [tournamentName, setTournamentName] = useState<string>("");
    const [date, setDate] = useState("");
    const [begining, setBegining] = useState("");
    const [roundCount, setRoundCount] = useState<string>("");
    const [otherError, setOtherError] = useState<string>("");
    const [tournamentNameError, setTournamentNameError] = useState<string>("");
    const [dateError, setDateError] = useState<string>("");
    const [roundCountError, setRoundCountError] = useState<string>("");
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    const navigate = useNavigate();
    useEffect(()=>{

    },[maxState])

    function sendTournamentCreatingRequest(event:any)
    {
        event.preventDefault();
        setLoading(true)
        console.dir(event.target.elements);
        var requestBody = {
            "name":tournamentName,
            "date":date,
            "roundCount":roundCount,
            "begining":begining
            //"teamsMaxCount":event.target.elements.teamsMaxCount.value,
            //"rounds": rounds
        };
        console.dir(requestBody);
        api.post(`/tournaments/createTournament`,requestBody)
        .then((res:any)=>{ 
            toast.success("Tournament created successfully");
            navigate("/");
        })
        .catch((error:any)=>
            {
                const data = error.response.data;
                if(error.code && error.code == "ERR_NETWORK")
                {
                    setIternalServerError(true);
                }
                if((error.response.status >= 500 && error.response.status <= 599))
                {
                    setIternalServerError(true);
                }
                if(data.Other)
                {
                    toast.error(data.Other);
                }
                if(data.Name)
                {
                    setTournamentNameError(data.Name);
                }
                if(data.Date)
                {
                    setDateError(data.Date);
                }
                if(data.RoundCount)
                {
                    setRoundCountError(data.RoundCount);
                }
            })
        .finally(()=>{setLoading(false);});
    }
    function clearErrors()
    {
        setOtherError("");
        setTournamentNameError("");
        setDateError("");
        setRoundCountError("");
    }

    // function teamsMaxCountChanged(event: any)
    // {
    //     event.preventDefault();
    //     if(event.target.value >= 8)
    //     {
    //         var teamsCount = event.target.value;
    //         var index:number = 0;
    //         while(Math.floor(teamsCount) > 1)
    //         {
    //             teamsCount /= 2;
    //             index++;
    //             console.log(teamsCount);
    //         }
    //         var round: number = index - 1;
    //         if(rounds.length > round)
    //         {
    //             for(let i = 0;i < rounds.length - round;i++)
    //             {
    //                 rounds.pop();
    //             }
    //         }
    //         else
    //         {
    //             for(let i = rounds.length;i < round;i++)
    //             {
    //                 rounds.push({
    //                     number: i,
    //                     date: ""
    //                 });
    //             }
    //         }      
    //         console.dir(rounds);
    //         setMaxState(!maxState);
    //     }
    //     // else
    //     // {
    //     //     event.target.value /= 4;
    //     // }
    // }

    return <>{iternalServerError ? <div><IternalServerError/></div> : <div style={{"display":"flex","justifyContent":"center", "alignItems":"center","width":"100%","height":"80vh"}}>
    {isLoading ? <div>
        <Loader loading={isLoading}/>
    </div>
    :<form onSubmit={(event) => {sendTournamentCreatingRequest(event)}}>
        <div className="w-100">
            {otherError != "" && <div className="m-1 text-danger">{otherError}</div>}
            <div className="w-100">
                    <input id="name" name="name" className="w-100" onChange={(e)=>{setTournamentName(e.target.value);clearErrors()}} type="text" value={tournamentName} placeholder="Name here..."/>
                    {tournamentNameError != "" && <div className="m-1 text-danger">{tournamentNameError}</div>}
                </div>
                <div>
                    <input id="date" name="date" className="w-100" onChange={(e)=>{setDate(e.target.value);clearErrors()}} type="date" value={date} placeholder="Date here..."/>
                    {dateError != "" && <div className="m-1 text-danger">{dateError}</div>}
                </div>
                <div>
                    <input id="begining" name="begining" className="w-100" onChange={(e)=>{setBegining(e.target.value);clearErrors()}} type="time" value={begining}/>
                    {dateError != "" && <div className="m-1 text-danger">{dateError}</div>}
                </div>
                <div >
                    <input id="roundCount" name="roundCount" className="w-100" onChange={(e)=>{setRoundCount(e.target.value);clearErrors()}} value={roundCount} type="number" min="2" max="6" placeholder="Round count..."/>
                    {roundCountError != "" && <div className="m-1 text-danger">{roundCountError}</div>}
                </div>
                {/* <div className ="m-1">
                    <input id="teamsMaxCount" className="w-100" name="teamsMaxCount" type="number" onChange={(event)=>{teamsMaxCountChanged(event)}}  placeholder="Teams max count here..." min={8} max={40}/>
                </div> */}
            {/* {rounds.map((item:Round, index)=>{
                return <div className="m-1">
                    <h6 className="m-1">Round number {item.number + 1}</h6>
                    <input id="roundDate" name="roundDate" type="date" onChange={(e)=>{rounds[item.number].date = e.target.value}} className="m-2" placeholder="Round date here..."/>
                </div>
            })} */}
            <input type="submit" className="w-100" value ="Create"/>
        </div>         
    </form>
    }    
</div>
}</>
}

    // return <div style={{"display":"flex","justifyContent":"center","alignItems":"center","height":"80vh"}}>
    //     <form onSubmit={(event) => {sendTournamentCreatingRequest(event)}}>
    //         <input id="name" name="name" type="text" placeholder="Enter tournament name here..."/>
    //         <input id="date" name="date" type="date"/>
    //         <input id="teamsMaxCount" name="teamsMaxCount" type="number" placeholder="Enter teams max count here..."/>
    //         <input type="submit" value="Create"/>
    //     </form>
    // </div>
// }