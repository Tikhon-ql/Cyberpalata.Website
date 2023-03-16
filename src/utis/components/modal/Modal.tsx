import { Children } from 'react'
import './Modal.css'
import React from 'react'

export const Modal = ({
    active,
    setActive,
    children
}: any)=>{
    return(

        <div className={active? "modal active" : "modal"} onClick={() => {setActive(false)}}>
            <div className={active? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}