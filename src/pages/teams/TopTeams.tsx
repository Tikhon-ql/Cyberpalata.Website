import React, { useEffect, useState } from "react"
import api from "../../api/api";
import { TeamTop } from "../../utis/types/types";

type TeamList = 
{
    items: TeamTop[],
    pageSize:number,
    totalItemsCount: number
}

export const TopTeams = () => {

    const [teamList, setTeamList] = useState<TeamList>();

    useEffect(()=>{
        api.get(`/teams/topTeams`)
        .then(res=>{
            setTeamList(res.data);
        });
    },[]);

    return <div className="myConteiner">
  <table className="container w-25 text-white">
    <thead>
        <tr>
            <th><h1 className="tableh1">№</h1></th>
            <th><h1 className="tableh1">Team</h1></th>
            <th><h1 className="tableh1">Win count</h1></th>
        </tr>
    </thead>
    <tbody>
        {teamList?.items.map((team: TeamTop, index)=>{
            return <tr>
                <td>
                    {index + 1}
                </td>
                <td>
                    {team.name}
                </td>
                <td>
                    {team.winCount}
                </td>
            </tr>
        })}
    </tbody>
  </table>
    </div>
}

//           


// <div className="myConteiner">
// {teamList?.items.length != 0 && <div>
//         <table className="table w-25">
//            
//         </table>
//     </div>}
// </div>