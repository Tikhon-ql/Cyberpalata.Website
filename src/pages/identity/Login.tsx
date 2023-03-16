import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import { observer } from 'mobx-react-lite';
import React from 'react';
import jwt_decode from "jwt-decode";
import { ClimbingBoxLoader } from 'react-spinners';
import headerRerenderStore from '../../utis/stores/headerRerenderStore';
import api from '../../api/api';

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [otherError,setOtherError] = useState<string>("");
    const [emailError,setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    let navigate = useNavigate();
    function clearErrors()
    {
        setEmailError("");
        setOtherError("");
        setPasswordError("");
    }

    function sendLoginRequest(event: any)
    {
        setLoading(true);
        event.preventDefault();
        const data = {
            "email":event.target.elements.email.value,
            "password":event.target.elements.password.value
        }
        api.post(`/authentication/login`, data).then(res=>
        {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);

            var dec = jwt_decode(res.data.accessToken);
            console.dir(dec);

            headerRerenderStore.state = !headerRerenderStore.state;
            navigate("/");
        }).catch(error=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                //navigate('/500');
                //setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
                //navigate('/500');
               //setIternalServerError(true);
            }
            let data = error.response.data;
            if(data.Other)
            {
                setOtherError(data.Other);
            }
            if(data.Email)
            {
                setEmailError(data.Email);
            }
            if(data.Password)
            {
                setPasswordError(data.Password);
            }
        })
        .finally(()=>{ setLoading(false);});     
    }

return <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"80vh"}}>{loading ? <div> 
        <ClimbingBoxLoader
            color={"white"}
            loading={loading}

            // size={30}
            />
        </div> : 
        <div className="myForm">
            <h1>SignIn</h1>
            <form method="post" onSubmit={(e)=>{sendLoginRequest(e)}}>
                {otherError != "" && <div className="text-danger m-1 rounded">{otherError}</div>}
                {emailError != "" && <div className="text-danger m-1 rounded">{emailError}</div>}
                <input type="email" name="email" onInput={clearErrors} value={email} onChange={(event)=>{setEmail(event.target.value)}} placeholder="Email"/>
                {passwordError != "" && <div className="text-danger m-1 rounded">{passwordError}</div>}
                <input type="password"  name="password" onInput={clearErrors} placeholder="Password"/>
                <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
            </form>
      </div>
    }
    </div>
}

export default observer(Login);



  // <div classNameNameNameName="d-flex align-items-center justify-content-center">
        //     <htmlhtmlForm classNameNameNameName="p-5 m-2 bg-info text-white shadow rounded-2" onSubmit={sendLoginRequest}>
        //         <div classNameNameNameName="mb-3">
        //             {otherError != "" && <div classNameNameNameName="text-danger m-1 rounded">{otherError}</div>}
        //             <label htmlhtmlhtmlFor="exampleInputEmail1" classNameNameNameName="htmlhtmlForm-label">Email address</label>
        //             <input type="email" name="email" onInput={clearErrors} onChange={(event)=>{setEmail(event.target.value)}} classNameNameNameName="htmlhtmlForm-control" id="exampleInputEmail1" defaultValue={email} aria-describedby="emailHelp"/>
        //             {emailError != "" && <div classNameNameNameName="text-danger m-1 rounded">{emailError}</div>}
        //         </div>
        //         <div classNameNameNameName="mb-3">
        //             <label htmlhtmlhtmlFor="exampleInputPassword1" classNameNameNameName="htmlhtmlForm-label">Password</label>
        //             <input type="password" name="password" onInput={clearErrors} classNameNameNameName="htmlhtmlForm-control" id="exampleInputPassword1"/>
        //             {passwordError != "" && <div classNameNameNameName="text-danger m-1 rounded">{passwordError}</div>}
        //         </div>
        //         <div classNameNameNameName="d-flex justify-content-around">
        //             <button type="submit" classNameNameNameName="btn  btn-outline-dark btn-sm m-2 text-white">Login</button> 
        //             <Link to='/passwordRecovering' classNameNameNameName="btn btn-outline-dark btn-sm m-2 text-white">htmlhtmlForgot password</Link>
        //             <Link to='/register' classNameNameNameName="btn  btn-outline-dark btn-sm m-2 text-white">Register</Link>
        //             <Link to='/' classNameNameNameName="btn  btn-outline-dark btn-sm m-2 text-white">Cancel</Link>
        //         </div>  
        //     </htmlhtmlForm>
        // </div>