import {Link} from "react-router-dom";
import React from 'react';

export const NotFound = ()=>{

    return <div className="d-flex align-items-center justify-content-center pt-4" style={{"height":"80vh","width":"100vw","display":"flex","alignItems":"center","justifyContent":"center"}}>
        <div className="text-white" style={{"backgroundColor":"#242C48","borderRadius":"1vw"}}>
            <h1 className="text-centre m-5">404 - Not Found!</h1>
            <div style={{display:"flex","justifyContent":"center","alignItems":"center"}}>
                <Link to="/" style={{"textAlign":"center","width":"50%","border":"1px solid","padding":"0.5vh 1.5vh 0.5vh 1.5vh","borderRadius":"1vh","marginRight":"1vw",marginBottom:"3vh"}}>Go Home</Link>
            </div>
        </div>
    </div>
}