import { Link, useNavigate } from "react-router-dom";
import { Children, useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { observer } from "mobx-react-lite";
import React from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { ProfileType, TeamDetailed } from "../../utis/types/types";
import api from "../../api/api";
import stateStore from "../../utis/stores/stateStore";
import { TeamInfo } from "../teams/TeamInfo";
import { Loader } from "../../utis/components/loader/Loader";
import { Modal } from "../../utis/components/modal/Modal";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";

export const Profile = observer(() => {
    const [editingActive, setEditingActive] = useState<boolean>(false);
    const [submitState, setSubmitState] = useState<boolean>(false);
    let navigate = useNavigate();
    let accessToken = localStorage.getItem('accessToken');
    // let [name, setName] = useState<string>("");
    // let [surname, setSurname] = useState<string>("");
    // let [email, setEmail] = useState<string>("");
    // let [phone, setPhone] = useState<string>("");
    const [profile, setProfile] = useState<ProfileType>();
    const [loading, setLoading] = useState<boolean>(false);
    const [modalActive, setModalActive] = useState(false);

    const [otherError, setOtherError] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string>("");
    const [surnameError, setSurnameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [phoneError, setPhoneError] = useState<string>("");
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    const [teamName, setTeamName] = useState<string>("");

    const [team, setTeam] = useState<TeamDetailed>({id:"",name:"",captainName:"",members:[],isTeamRecruting:false});

    function createTeam()
    {
        var requestBody = {
            "name": teamName
        };
        api.post(`/teams/createTeam/`,requestBody).then(()=>{ navigate('/profile')
        }).catch((error:any)=>
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
                // if(data.Other)
                // {
                //     setOtherError(data.Other);
                // }
                // if(data.Name)
                // {
                //     setTeamNameError(data.Name);
                // }
            }).finally(()=>{
                setModalActive(false);
           ;
        })
    }

    let state = true;
    useEffect(()=>{
        setLoading(true);
        api.get(`/users/getUserProfile`).then((res:any) =>{
            console.dir(res);
            setProfile(res.data);
            // setName(res.data.username);
            // setSurname(res.data.surname);
            // setEmail(res.data.email);
            // setPhone(res.data.phone);
            
        }).catch((error:any)=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                setIternalServerError(true);
            }
        }).finally(()=>{setLoading(false);});       
    },[submitState, stateStore.state]);

    function editingEnableButtonClick(event: any, state: boolean)
    {
        event.preventDefault();
        setEditingActive(state);
    }


    function editingSubmit(event: any)
    {
        event.preventDefault();
        const requestBody = {
            "username": event.target.elements.name.value,
            "surname": event.target.elements.surname.value,
            "email":event.target.elements.email.value,
            "phone":event.target.elements.phone.value,
        };
        api.put(`/users/editUser`,requestBody).then(()=>{
            setEditingActive(false);
            setSubmitState(!submitState);
            navigate('/profile');
        }).catch((error:any)=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                setIternalServerError(true);
            }
            const data = error.response.data;
            if(data.Other)
            {
                setOtherError(data.Other);
            }
            if(data.Email)
            {
                setEmailError(data.Email);
            }
            if(data.Username)
            {
                setUsernameError(data.Username);
            }
            if(data.Surname)
            {
                setSurnameError(data.Surname);
            }
            if(data.Phone)
            {
                setPhoneError(data.Phone);
            }
        });
    }

    function clearErrors()
    {
        setOtherError("");
        setEmailError("");
        setUsernameError("");
        setSurnameError("");
        setPhoneError("");
    }
 
    return <> {iternalServerError ? <div>
        <IternalServerError/>
            </div>:<div><div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"80vh"}}>{loading ?
        <div>
    <Loader loading={loading}/>
</div>
 :
<div className="align-items-center justify-content-center text-white w-50 h-100" style={{"backgroundColor":"#242C48","marginTop":"2vh","borderRadius":"1vw"}}>
    <div style={{"display":"flex","justifyContent":"space-around","marginTop":"3vh"}}>
    {!editingActive ?
        <a onClick={(e)=>{editingEnableButtonClick(e,true)}} className="headerButton" style={{"display":"flex", "alignItems":"center","justifyContent":"center"}}>
            <img src={require(`./../../assets/imgs/edit.png`)}/>
        </a>
        :<a onClick={(e)=>{editingEnableButtonClick(e,false)}} className="headerButton" style={{"display":"flex", "alignItems":"center","justifyContent":"center"}}>
            <img src={require(`./../../assets/imgs/saveChanges.png`)}/>
        </a>}
        {profile?.hasTeam &&   <Link to="/usersTournaments" className="headerButton" style={{"display":"flex", "alignItems":"center","justifyContent":"center"}}>
            <img src={require(`./../../assets/imgs/trophy.png`)}/>
        </Link>}
        <Link to='/chats' className="headerButton" style={{"display":"flex", "alignItems":"center","justifyContent":"center"}}>
            <img src={require(`./../../assets/imgs/messenger.png`)}/>
        </Link>
        
        {profile?.isCaptain && <Link to='/joinRequests' className="headerButton" style={{"display":"flex", "alignItems":"center","justifyContent":"center"}}>
            <img src={require(`./../../assets/imgs/joinRequest.png`)}/>
        </Link>}
        {!profile?.hasTeam &&   <a onClick={()=>{setModalActive(true)}} className="headerButton" style={{"display":"flex", "alignItems":"center","justifyContent":"center"}}>
            <img src={require(`./../../assets/imgs/createTeam.png`)}/>
        </a>}
      
    </div>
    <div style={{"display":"flex","marginInline":"8vw","marginTop":"5vh"}}>
        <div style={{"marginInline":"2vw","marginTop":"2vw","width":"10vw","height":"10vw"}}>
            <img src={require(`./../../assets/imgs/user.png`)}/>
        </div>
        <div style={{"marginTop":"10vh","width":"12vw","height":"10vw"}}>
        <form  method="post" onSubmit={editingSubmit}>
        {editingActive ?
                <div>
                    {otherError != "" && <div className="m-1 text-danger">{otherError}</div>}
                    <div className="d-flex flex-row"><h2 className="text-white"></h2><input id="nameInput" name="name" type="text" onInput={clearErrors} className="form-control bg-transparent border-0 text-white" defaultValue={profile?.username} /></div>
                    {usernameError != "" && <div className="m-1 text-danger">{usernameError}</div>}
                    <div className="d-flex flex-row"><h2 className="text-white"></h2><input id="surnameInput" name="surname" type="text" onInput={clearErrors} className="form-control bg-transparent border-0 text-white" defaultValue={profile?.surname}/></div>
                    {surnameError != "" && <div className="m-1 text-danger">{surnameError}</div>}
                    <div className="d-flex flex-row"><h2 className="text-white"></h2><input id="emailInput" name="email" type="email" onInput={clearErrors} className="form-control bg-transparent border-0 text-white" defaultValue={profile?.email} /></div>
                    {emailError != "" && <div className="m-1 text-danger">{emailError}</div>}
                    <div className="d-flex flex-row"><h2 className="text-white"></h2><input id="phoneInput" name="phone" type="tel" onInput={clearErrors} className="form-control bg-transparent border-0 text-white" defaultValue={profile?.phone}/></div>
                    {phoneError != "" && <div className="m-1 text-danger">{phoneError}</div>}
                </div>
                : 
                <div>
                    <div className="d-flex flex-row"><h5 className="text-white" style={{"marginRight":"1vw"}}>Name: </h5><div id = "name" className="h5">{profile?.username} {profile?.surname}</div></div>
                    <div className="d-flex flex-row"><h5 className="text-white" style={{"marginRight":"1vw"}}>Email: </h5><div id="email" className="h5">{profile?.email}</div></div>
                    <div className="d-flex flex-row"><h5 className="text-white" style={{"marginRight":"1vw"}}>Phone: </h5><div id="phone" className="h5">{profile?.phone}</div></div>
                </div>
                
            }
              {editingActive &&
                <input type="submit" style={{"border":"1px solid","padding":"1vh","borderRadius":"1vh"}} value="Save changes"/>}
            </form>
        </div>
    </div>
    {profile?.hasTeam && 
        <TeamInfo isCaptain={profile.isCaptain}/>
    } 
    <Modal active={modalActive} setActive={setModalActive} >
        <form onSubmit={(e)=>{e.preventDefault(); createTeam();}}>
            <input type="text" placeholder="Team name..." onChange={(e) =>{setTeamName(e.target.value)}}/>
            <input type="submit" value="Submit"/>
        </form>
    </Modal>
</div>
}
</div></div>}
    </> 
})



{/* <h1 className="text-white" style={{"textAlign":"center","marginBottom":"1vw"}}>User profile</h1><hr/>
<div>
    <div style={{"display":"flex","flexDirection":"column","justifyContent":"start", "marginRight":"1vw"}}>
        <Link to='/teamCreating' style={{"border":"1px solid","padding":"1vh","borderRadius":"1vh", "marginRight":"1vw",marginBottom:"0"}}>Create team</Link><br />
        <Link to='/usersTournaments'  style={{"border":"1px solid","padding":"1vh","borderRadius":"1vh","marginRight":"1vw"}}>Show tournaments</Link><br />
        {!editingActive ?
            <button onClick={editingEnableButtonClick} style={{"background":"none","border":"1px solid","padding":"1vh","borderRadius":"1vh","marginRight":"1vw",textAlign:"start"}}><div>Edit profile</div></button>
            :<button onClick={editingEnableButtonClick} style={{"background":"none","border":"1px solid","padding":"1vh","borderRadius":"1vh","marginRight":"1vw",textAlign:"start"}}><div>Stop editing profile</div></button>}
        <Link to='/joinRequests'  style={{"border":"1px solid","padding":"1vh","borderRadius":"1vh","marginRight":"1vw"}}>Show join request</Link><br />
        <Link to='/chats'  style={{"border":"1px solid","padding":"1vh","borderRadius":"1vh","marginRight":"1vw"}}>Show chats</Link><br />
    </div>
    <div>
        <form  method="post" onSubmit={editingSubmit}>
            {editingActive ?  
                <div>
                    {otherError != "" && <div className="m-1 text-danger">{otherError}</div>}
                    <div className="d-flex flex-row"><h2 className="text-white">Name: </h2><input id="nameInput" name="name" type="text" onInput={clearErrors} className="form-control bg-transparent border-0 text-white" defaultValue={name} /></div>
                    {usernameError != "" && <div className="m-1 text-danger">{usernameError}</div>}
                    <div className="d-flex flex-row"><h2 className="text-white">Surname: </h2><input id="surnameInput" name="surname" type="text" onInput={clearErrors} className="form-control bg-transparent border-0 text-white" defaultValue={surname}/></div>
                    {surnameError != "" && <div className="m-1 text-danger">{surnameError}</div>}
                    <div className="d-flex flex-row"><h2 className="text-white">Email: </h2><input id="emailInput" name="email" type="email" onInput={clearErrors} className="form-control bg-transparent border-0 text-white" defaultValue={email} /></div>
                    {emailError != "" && <div className="m-1 text-danger">{emailError}</div>}
                    <div className="d-flex flex-row"><h2 className="text-white">Phone: </h2><input id="phoneInput" name="phone" type="tel" onInput={clearErrors} className="form-control bg-transparent border-0 text-white" defaultValue={phone}/></div>
                    {phoneError != "" && <div className="m-1 text-danger">{phoneError}</div>}
                </div>
                : 
                <div>
                    <div className="d-flex flex-row"><h2 className="text-white" style={{"marginRight":"1vw"}}>Name: </h2><div id = "name" className="h3">{name}</div></div>
                    <div className="d-flex flex-row"><h2 className="text-white" style={{"marginRight":"1vw"}}>Surname: </h2><div id="surname" className="h3">{surname}</div></div>
                    <div className="d-flex flex-row"><h2 className="text-white" style={{"marginRight":"1vw"}}>Email: </h2><div id="email" className="h3">{email}</div></div>
                    <div className="d-flex flex-row"><h2 className="text-white"style={{"marginRight":"1vw"}}>Phone: </h2><div id="phone" className="h3">{phone}</div></div>
                </div>
            }
            <div>
            {editingActive &&
                <input type="submit" style={{"border":"1px solid","padding":"1vh","borderRadius":"1vh"}} value="Save changes"/>}
            </div>
        </form>
    </div>   
</div>
<div>
    <h1>Team info</h1>
    <TeamInfo />
</div> */}