import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from "qrcode.react";
import api from '../../api/api';
import { TournamentDetailed } from '../../utis/types/types';
import { IternalServerError } from '../../utis/components/errors/IternalServerError';
export const ShowQrCode = () => {

    const {tournamentId} = useParams();
    const {teamId} = useParams();
    const [tournament, setTournament] = useState<TournamentDetailed>();
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    useEffect(()=>{
        api.get(`/tournaments/getTournamentSmall?id=${tournamentId}`)
        .then((res:any)=>{
            setTournament(res.data);
        }).catch((error:any)=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                setIternalServerError(true);
            }
        });
    },[]);
    //https://dotnetinternship2022.norwayeast.cloudapp.azure.com:8080
    //https://localhost:3000
    return <>{iternalServerError ? <div><IternalServerError/></div>:<div>
                <div style={{"display":"flex","justifyContent":"center","alignItems":"center","height":"100vh"}}>
                <div>
                    <QRCodeCanvas
                            id="qrCode"
                            value={`https://localhost:3000/#/checkTeam/${tournamentId}/${teamId}`}
                            size={300}
                            bgColor={"#00607c"}
                            level={"H"}
                        />
                        <div style={{textAlign:"center", color:"white"}}>
                            <div style={{marginBottom:"1vh"}}><h4>Tournament: </h4>{tournament?.name}</div>
                            <div><h4>Date: </h4>{tournament?.date}</div>
                        </div>
                </div>  
            </div>
        </div>}
    </>
}