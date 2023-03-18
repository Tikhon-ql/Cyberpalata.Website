import React, { useEffect, useState } from "react"
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";
import { TeamTop } from "../../utis/types/types";

type TeamList = 
{
    items: TeamTop[],
    pageSize:number,
    totalItemsCount: number
}

export const TopTeams = () => {

    const [teamList, setTeamList] = useState<TeamList>(
        {
            items:[
                {
                    name:"Lakers",
                    winCount: 10,
                },
                {
                    name:"Celtics",
                    winCount: 20,
                },
                {
                    name:"Nuggets",
                    winCount: 30,
                },
                {
                    name:"Cavaliers",
                    winCount: 40,
                },
            ],
            pageSize: 5,
            totalItemsCount: 13
        }
    );
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    // useEffect(()=>{
    //     api.get(`/teams/topTeams`)
    //     .then(res=>{
    //         setTeamList(res.data);
    //     }).catch((error)=>{
    //         if(error.code && error.code == "ERR_NETWORK")
    //         {
    //             setIternalServerError(true);
    //         }
    //         if((error.response.status >= 500 && error.response.status <= 599))
    //         {
    //             setIternalServerError(true);
    //         }
    //     });
    // },[]);

    return <>{iternalServerError ? <div><IternalServerError/></div> : <div> <div className="myConteiner">
        <div className="w-50 h-100" style={{"display":"flex","justifyContent":"center","alignItems":"center","backgroundColor":"#242C48","marginTop":"2vh","borderRadius":"1vw"}}>
            <table className="container w-50 text-white">
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
   
      </div></div>}</>
}
//style={{"backgroundColor":"#242C48","marginTop":"2vh","borderRadius":"1vw"}}
//           


// <div className="myConteiner">
// {teamList?.items.length != 0 && <div>
//         <table className="table w-25">
//            
//         </table>
//     </div>}
// </div>