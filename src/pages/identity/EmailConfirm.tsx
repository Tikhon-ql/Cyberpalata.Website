import { useEffect, useState } from "react";
import { Link,Navigate,useLocation, useNavigate, useParams } from "react-router-dom";
import React from 'react';
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";

export const EmailConfirm = ()=>{
    const navigate = useNavigate();
    const {email} = useParams<string>();
    const {userId} = useParams<string>();
    const [code,setCode] = useState(0);
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);
    useEffect(()=>{

        const requestBody = 
        {
            "userId" : userId,
            "email" : email
        };
        api.post(`/users/emailConfirm`,requestBody).then(res=>{
            setCode(res.data);
        }).catch(error=>{
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
   

    function sendActivateRequest(event: any)
    {
        event.preventDefault();
        if(event.target.elements.code.value == code)
        { 
            const requestBody = 
            {
                "email" : email
            };
            api.put(`/users/activate`,requestBody).then(()=>{
                navigate('/');
            }).catch(error=>{
                if(error.code && error.code == "ERR_NETWORK")
                {
                    setIternalServerError(true);
                }
                if((error.response.status >= 500 && error.response.status <= 599))
                {
                    setIternalServerError(true);
                }
            });
        }
        else
        {
            alert("Code is incorrect");
        }
    }


    return <>{iternalServerError ? <div>
        <IternalServerError/>
    </div>:
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"80vh"}}>
        <div>
            <div style={{color:"white",marginBottom:"2vh"}}>On your email we send a message</div>
            <form onSubmit={sendActivateRequest}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"></label>
                    <input type="number" name="code" id="exampleInputEmail1" onChange={(e)=>{e.preventDefault()}} required placeholder="Enter six-digit code here..." aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text text-white">We'll never share your code with anyone else.</div>
                </div>
                <div className="d-flex justify-content-around">
                    <button type="submit" style={{background:"none","border":"1px solid","padding":"1vh","borderRadius":"1vh","marginRight":"1vw"}}>Confirm</button>
                    <Link to='/' style={{"border":"1px solid","padding":"1vh","borderRadius":"1vh","marginRight":"1vw"}}>Cancel</Link>
                </div>
            </form>
        </div>
    </div>
    }
    </> 
}   