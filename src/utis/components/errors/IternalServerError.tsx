import {Link} from "react-router-dom"
import React from 'react';

export const IternalServerError = () => {

    return  <div className="d-flex align-items-center justify-content-center pt-4" style={{"height":"80vh","width":"100vw","display":"flex","alignItems":"center","justifyContent":"center"}}>
                <div className="p-5 m-2 text-white shadow rounded-2 d-flex align-items-center justify-content-center" style={{"backgroundColor":"#242C48"}}>
                    <h1 className="text-centre">500 - Unexpected Error!<b> :( </b></h1>
                    <Link to="/" className="btn btn-outline-dark btn-sm w-50 m-1">Go Home</Link>
                </div>
        </div>
}