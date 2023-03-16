import React, { useState } from "react"
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import api from "../../api/api";
import { Loader } from "../../utis/components/loader/Loader";
import { Tournament } from "../../utis/types/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    // searchName: string,
    // begining:string,
    // date:string,
    // hoursCount: number,
    // freeSeatsCount: number,
    // freeSeatsInRowCount: number,
    // refresh: boolean,
    tournamentList: any,
    isCaptain: boolean
}

export const TournamentTable = ({tournamentList, isCaptain}:Props)=>{
    const [loading, setLoading] = useState(false);

    function registerTeam(tournamentId:string)
    {
        var requestBody = {
            tournamentId: tournamentId
        };
        api.put(`/tournaments/registerTeam`,requestBody).then(()=>{
            toast.success('Successful registration');
        }).catch(error=>{
            const data = error.response.data;
            if(data.Other)
            {
                toast.error(data.Other);
            }
        })
    }

    return <><div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"42vh"}}>
        {loading ?
        <div>
           <Loader loading={loading}/>
        </div>
        :  <div>
            <div style={{"overflowY":"scroll"}}>
                <table className="container w-100 text-white" >
                    <thead>
                        <tr>
                            <th style={{"width":"3vw"}}><h1 className="tableh1">№</h1></th>
                            <th style={{"width":"15vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Room</h1></th>
                            <th style={{"width":"15vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Teams count</h1></th>
                            <th style={{"width":"15vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Date</h1></th>
                            <th style={{"width":"15vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Begining</h1></th>
                            {isCaptain && <th style={{"width":"7vw"}}></th>}
                            <th style={{"width":"7vw"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tournamentList?.map((tournament: Tournament, index:number)=>{
                            return <tr key={index}> 
                                <td>
                                    {index + 1}
                                </td>
                                <td style={{"textAlign":"center"}}>
                                    {tournament.name}
                                </td>
                                <td style={{"textAlign":"center"}}>
                                    {tournament.teamsCount}
                                </td>
                                <td style={{"textAlign":"center"}}>
                                    {tournament.date}
                                </td>
                                <td style={{"textAlign":"center"}}>
                                    {tournament.begining}
                                </td>
                                {isCaptain &&  <td style={{backgroundColor:"#238D43"}}>
                                    <a onClick={(e)=>{e.preventDefault();registerTeam(tournament.id);}} style={{"textAlign":"center"}}>Register</a>
                                </td>}
                                <td style={{backgroundColor:"#FFC840"}}>
                                    <Link to={`/showTournamentDetailed/${tournament.id}`} style={{"textAlign":"center"}}>Bracket</Link>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
       
        </div>}
    </div>
    </>
}