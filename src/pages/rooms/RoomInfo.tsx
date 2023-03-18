import {Link, useAsyncError, useNavigate} from 'react-router-dom'
// import './../css/RoomInfo.css';
// import './../../../Components/Index.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BarLoader from "react-spinners/BarLoader";
import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import api from '../../api/api';
import { Pc, Periphery } from '../../utis/types/types';
import { Loader } from '../../utis/components/loader/Loader';
import { IternalServerError } from '../../utis/components/errors/IternalServerError';
  
export const RoomInfo = () => {
    let navigate = useNavigate();
    const {id} = useParams();
    const {name} = useParams();
    const {type} = useParams();
    const [peripheries, setPeripheries] = useState<Periphery[]>([]);
    const [device, setDevices] = useState<Pc[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);
    useEffect(()=>{
        api.get(`/gamingRooms/getRoomInfo?id=${id}`).then((res:any) => {
            console.dir(res);
            setDevices(res.data.pcInfos);
            setPeripheries(res.data.peripheries);
            setLoading(false);
        }).catch((error: any)=>{
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


    return <> { false ? <div>
                    {/* <IternalServerError/> */}
                </div>

        : <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"80vh"}}>
        {loading ?

            <div>
              <Loader loading={loading}/>
            </div> 

            : <div className="text-white w-50 h-100" style={{"backgroundColor":"#242C48","marginTop":"2vh","borderRadius":"1vw","display":"flex","justifyContent":"center"}}>
                <div>
                    <div className='m-3'>
                            <h1 style={{"textAlign":"center"}}>{name}</h1>
                        </div>
                        <div style={{"display":"flex", "justifyContent":"center","backgroundColor":"white",width:"35vw",height:"15vw",borderRadius:"1vw"}}>
                            <div>
                                <h1 style={{"color":"black","marginTop":"3vh","textAlign":"center"}}>Peripheries</h1>
                                <ul className='text-dark'>
                                {peripheries.map((item:Periphery, index)=>{
                                    return <li key={index} style={{"display":"flex"}}>
                                        <div className='m-1'><u>{item.typeName}: </u></div>
                                        <div className='m-1'>{item.name}</div>
                                    </li>
                                })}
                             </ul>   
                            </div>
                           
                            
                        </div>
                        <div style={{"display":"flex", "justifyContent":"center","backgroundColor":"white","marginTop":"3vh",width:"35vw",height:"15vw",borderRadius:"1vw"}}>
                            <div>
                                <h1 style={{"color":"black","marginTop":"3vh","textAlign":"center"}}>Hardware</h1>
                                <ul className='text-dark'>
                                    {device.map((item:Pc, index)=>{
                                        return <li key={index} style={{"display":"flex"}}>
                                            <div className='m-1'><u>{item.type}</u></div>
                                            <div className='m-1'>{item.name}</div>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                </div>
                   
            </div>}
    </div>}
</>
}