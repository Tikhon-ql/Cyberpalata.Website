import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import api from "../../api/api";
import { BookingCollection } from "../../utis/types/types";

export const Basket = () => {

    const[bookings, setBookings] = useState<BookingCollection[]>();

    useEffect(()=>{
        api.get(`/booking/getBasket`).then(res=>
        {
            setBookings(res.data);
        });
    });

    return <>
         <div className="d-flex align-items-center justify-content-center w-75" style={{color:"white"}}>
            <div className="w-100 h-100">
                <h1>Bookings</h1>  
                <div className="list-group w-100 p-2">
                    {bookings?.map((item: BookingCollection,index)=>{
                        return <div key={index} style={{color:"white"}} className="list-group-item list-group-item-action bg-transparent rounded">
                                <div className="w-100">
                                    <div className="d-flex w-100">
                                        <div className="m-1">Room: {item.roomName}</div>
                                        <div className="m-1">Price: {item.price}</div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="m-1">Date: {item.date}</div>
                                        <div className="m-1">Begining: {item.begining}</div>
                                    </div>
                                </div>
                                <Link to={`/payment/${item.id}`} style={{"background":"none","border":"1px solid","padding":"1vh","borderRadius":"1vh","marginRight":"1vw",textAlign:"start"}}>Pay</Link>
                            </div>
                    })}
                    {/* <Pagination totalItemsCount = {bookings?.totalItemsCount} pageCount = {bookings?.pageSize} curPage = {curPage} setCurPage = {setCurPage}/> */}
                </div>
            </div>
        </div>
    </>
}