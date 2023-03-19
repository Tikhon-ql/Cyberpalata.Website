import {useState} from "react";
import { Loader } from "../../utis/components/loader/Loader";
import { Chat, JoinRequest } from "../../utis/types/types";
import { toast } from "react-toastify";
import api from "../../api/api";
import { Link } from "react-router-dom";

type Props = {
    chats: any,
    loading:boolean,
}


export const ChatTable = ({chats, loading}: Props) => {
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

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
                        <th><h1 className="tableh1">User name</h1></th>
                        <th><h1 className="tableh1">User surname</h1></th>
                        <th></th>
                        {/* <th><h1 className="tableh1">Win count</h1></th> */}
                    </tr>
                </thead>
                <tbody>
                    {chats?.map((chat: Chat, index:number)=>{
                        return <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {chat.otherUserName}
                            </td>
                            <td>
                                {chat.otherUserSurname}
                            </td>
                            <td style={{backgroundColor:"#238D43"}}>
                                    <Link to={`/chats/${chat.chatId}/${chat.isYouACaptain}/${chat.teamId}/${chat.otherId}`} style={{"textAlign":"center"}}>Open</Link>
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
}

{/*  */}