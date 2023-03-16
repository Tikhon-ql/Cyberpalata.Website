import { useEffect, useState } from "react";
import api from "../../api/api";
import {observer} from "mobx-react"
import headerRerenderStore from "../../utis/stores/headerRerenderStore";
import { AuthVerify } from "../../utis/scripts/AuthVerify";
import stateStore from "../../utis/stores/stateStore";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Notification } from "../../utis/types/types";
import {Link} from 'react-router-dom'
import { Logout } from "../../pages/identity/Logout";
import { Modal } from "../../utis/components/modal/Modal";
import { Notifications } from "../../pages/Notifications";


export const Header = observer(() => {

    console.log("Header rerender");
   

    stateStore.state = false;
    // headerRerenderStore.state = false;
    let accessToken: any;
    const [modalActive, setModalActive] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 

    if(localStorage.getItem('accessToken'))
    {

        accessToken = jwt_decode(localStorage.getItem('accessToken') || "");
        console.dir(accessToken);
    }
    useEffect(()=>{
        setIsAuthenticated(AuthVerify());
    },[headerRerenderStore.state]);

    //                                                                 background: -webkit-linear-gradient(90deg, #583544,#463951,#3614e1);/* Chrome 10-25, Safari 5.1-6 */                         ;/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */                                             

    return <>
    <div className='header' style={{"display":"flex","justifyContent":"space-between"}}>
        <>
            {(isAuthenticated && accessToken) && <div style={{"display":"flex","alignItems":"center"}}>
                <Link to="/profile" className='headerButton' style={{"marginLeft":"3vh","display":"flex", "alignItems":"center","justifyContent":"center"}}>
                    <img src={require(`./../../assets/imgs/avatar.png`)}/>
                </Link>
                <Link to="/basket" className='headerButton' style={{"marginLeft":"3vh","display":"flex", "alignItems":"center","justifyContent":"center"}}>
                    <img src={require(`./../../assets/imgs/basket.png`)}/>
                </Link>
                 <Link to="/basket" className='headerButton' style={{"marginLeft":"3vh","display":"flex", "alignItems":"center","justifyContent":"center"}}>
                    <img src={require(`./../../assets/imgs/basket.png`)}/>
                </Link>
            </div>}
        
            <Link to="/" style={{"display":"flex","alignItems":"center","justifyContent":"center"}}>
                <h1>CYBERPALATA</h1>
            </Link>
            {isAuthenticated && accessToken ? 
                    <div className="d-flex">
                        <Notifications/>
                         <a onClick={()=>{setModalActive(true)}} style={{"display":"flex","alignItems":"center"}}>
                            <div className='headerButton' style={{"marginRight":"3vh","display":"flex", "alignItems":"center","justifyContent":"center"}}>
                                <img src={require(`./../../assets/imgs/log-out.png`)}/>
                            </div>
                        </a>
                        { accessToken.role == "Admin" &&  
                        <Link to="/createTournament" style={{"display":"flex","alignItems":"center"}}>
                            <div className='headerButton' style={{"marginRight":"3vh","display":"flex", "alignItems":"center","justifyContent":"center"}}>
                                <img src={require(`./../../assets/imgs/plus.png`)}/>
                            </div>
                        </Link>
                    }
                    </div>       
                   
                :
                <div className="d-flex">
                  
                    
                    <Link to="/login" style={{"display":"flex","alignItems":"center"}}>
                        <div className='headerButton' style={{"marginRight":"3vh","display":"flex", "alignItems":"center","justifyContent":"center"}}>
                            <img src={require(`./../../assets/imgs/log-in.png`)}/>
                        </div>
                    </Link>
                    <Link to="/register" style={{"display":"flex","alignItems":"center"}}>
                            <div className='headerButton' style={{"marginRight":"3vh","display":"flex", "alignItems":"center","justifyContent":"center"}}>
                                <img src={require(`./../../assets/imgs/registration.png`)}/>
                            </div>
                    </Link>
            </div>}
            <Modal active={modalActive} setActive={setModalActive}>
                <Logout setModalActive={setModalActive}/>
            </Modal>
        </>
    </div>
   </>
})



{/* <nav id="headerId" className="navbar navbar-light" style={{background: "linear-gradient(90deg, #583544,#463951,#3614e1)"}}>
<ul style={{"height":"5vh", "display":"flex","width":"100%","justifyContent":"end","alignItems":"center","listStyle":"none"}}>
    <li className='whiteLink' style={{"color":"white","marginRight":"2vw","marginTop":"2vh","fontSize":"20px"}}>
        <Link to="/">Home</Link>
    </li>
    <li className='whiteLink' style={{"color":"white","marginRight":"2vw","marginTop":"2vh","fontSize":"20px"}}>
        <Link to="/payment">Payment</Link>
    </li>
    <li className='whiteLink' style={{"color":"white","marginRight":"2vw","marginTop":"2vh","fontSize":"20px"}}>
        <Link to="/hiringTeam">Hiring team</Link>
    </li>
    <li className='whiteLink' style={{"color":"white","marginRight":"2vw","marginTop":"2vh","fontSize":"20px"}}>
        <Link to="/topTeams">Top</Link>
    </li>
    {accessToken && accessToken.role === "Admin" &&
        <li className='whiteLink' style={{"color":"white","marginRight":"2vw","marginTop":"2vh","fontSize":"20px"}}>
            <Link to="/createTournament">Create tournament</Link>
        </li>
    }
    {(AuthVerify() && accessToken) && <li style={{"color":"white","marginTop":"2vh","fontSize":"20px"}}>
        <Link to="/basket">Basket</Link>
    </li>}
    {(AuthVerify() && accessToken) && <li style={{"color":"white","marginTop":"2vh","fontSize":"20px"}}>
        <Link to="/profile">Profile</Link>
    </li>}
    {notifications?.length > 0 && <a className='notification' onClick={()=>{showNotifications()}}>
            <img src={require(`./../../imgs/notifications.png`)} className='icon'/>
            <div className='counter'>{notifications.length}</div>
        </a>}
    {!AuthVerify() ? 
        <li style={{"color":"white","marginRight":"2vw","marginTop":"2vh","fontSize":"20px"}}>
            <Link to="/login">Login</Link>
        </li>:
        <li>
            <a onClick={()=>{setModalActive(true)}}><img className='icon'  src={require(`./../../imgs/turn-off.png`)}/></a>
        </li>
    }
    {!AuthVerify() && 
        <li className='whiteLink' style={{"color":"white","marginRight":"2vw","marginTop":"2vh","fontSize":"20px"}}>
            <Link to="/register">Register</Link>
        </li>
    }
</ul>
<Modal active={modalActive} setActive={setModalActive}>
    <LogoutComponent setModalActive={setModalActive}/>
</Modal>
</nav> */}