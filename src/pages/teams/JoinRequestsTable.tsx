import {useState} from "react";
import { Loader } from "../../utis/components/loader/Loader";
import { JoinRequest } from "../../utis/types/types";
import { toast } from "react-toastify";
import api from "../../api/api";
import { observer } from "mobx-react-lite";
import { sendNotification } from "../../utis/scripts/signalR";
import notificationStore from "../../utis/stores/notificationStore";

type Props = {
    joinRequests: any,
    loading:boolean,
    setRefresh: any,
    refresh: boolean
}


export const JoinRequestsTable = observer(({joinRequests, loading, setRefresh,refresh}: Props) => {
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);
   
    const setJoinRequestState = (index:number,state: string) =>
    {
        console.log("sdoufbiodsf");
        var requestBody = {
            userToJoinId: joinRequests[index]?.userId,
            teamId: joinRequests[index]?.teamId,
            state: state
        }
        var url:string = state == "Rejected" ? "rejectJoinRequest" : "inProgressJoinRequest"
        api.put(`/joinRequests/${url}`,requestBody).then((res:any)=>{toast.success("Request sent successfully");sendNotification(notificationStore.connection, joinRequests[index]?.userId)})
        .catch((error:any)=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                setIternalServerError(true);
            }
        }).finally(()=>{setRefresh(!refresh)});
    }


    return <><div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"42vh"}}>
        {loading ?
        <div>
            <Loader loading={loading}/>
        </div>
        :  <div className="w-100 h-100">
            <div className="w-100 h-100">
                <table className="container w-100 text-white">
                <thead>
                    <tr>
                        <th><h1 className="tableh1">№</h1></th>
                        <th><h1 className="tableh1">Sender name</h1></th>
                        <th><h1 className="tableh1">Sender surname</h1></th>
                        <th></th>
                        <th></th>
                        {/* <th><h1 className="tableh1">Win count</h1></th> */}
                    </tr>
                </thead>
                <tbody>
                    {joinRequests?.map((request: JoinRequest, index:number)=>{
                        return <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td id={`username${index}`}>
                                {request.username}
                            </td>
                            <td>
                                {request.usersurname}
                            </td>
                            <td style={{backgroundColor:"#450814"}}>
                                <a style={{"textAlign":"center"}} onClick={()=>{setJoinRequestState(index, "Rejected")}}>Skip</a>
                            </td>
                            <td style={{backgroundColor:"#FFC840"}} onClick={()=>{setJoinRequestState(index, "InProgress")}}>
                                <a >Open chat</a>
                            </td>
                            {/* <td>
                                {team.winCount}
                            </td> */}
                        </tr>
                    })}
                </tbody>
            </table>
            </div>
       
        </div>}
    </div>
    </>
})