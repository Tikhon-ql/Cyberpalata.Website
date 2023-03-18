import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";
import { BookingCollection } from "../../utis/types/types";

export const Basket = () => {

    const[bookings, setBookings] = useState<BookingCollection[]>([
        {
            id:"d;kk",
            roomName: "Room 1",
            date: "03.10.2023",
            begining:"10:10",
            hoursCount: 10,
            price: 15,
            seats:[1,2,3,4]
        },
        {
            id:"d;kk",
            roomName: "Room 2",
            date: "04.10.2023",
            begining:"20:00",
            hoursCount: 3,
            price: 10,
            seats:[7,6,8]
        },
        {
            id:"d;kk",
            roomName: "Room 3",
            date: "04.11.2023",
            begining:"21:00",
            hoursCount: 2,
            price: 13,
            seats:[7,6,8,10,15,13,46]
        }
    ]);
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    useEffect(()=>{
        // api.get(`/booking/getBasket`).then(res=>
        // {
        //     setBookings(res.data);
        // }).catch((error)=>{
        //     if(error.code && error.code == "ERR_NETWORK")
        //     {
        //         //navigate('/500');
        //         setIternalServerError(true);
        //     }
        //     if((error.response.status >= 500 && error.response.status <= 599))
        //     {
        //         //navigate('/500');
        //        setIternalServerError(true);
        //     }
        // });
    });

    return <div className="myConteiner"> {iternalServerError ? <div>
            <IternalServerError/>
            </div>:
            <div className="w-50 h-100" style={{"display":"flex","justifyContent":"center","alignItems":"center",color:"white","backgroundColor":"#242C48","marginTop":"2vh","borderRadius":"1vw"}}>
            <div className="w-75 h-75">
                <table className="container w-100 text-white" >
                <thead>
                    <tr>
                        <th style={{"width":"3vw"}}><h1 className="tableh1">№</h1></th>
                        <th style={{"width":"17vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Room</h1></th>
                        <th style={{"width":"17vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Price</h1></th>
                        <th style={{"width":"17vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Date</h1></th>
                        <th style={{"width":"17vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Begining</h1></th>
                        <th style={{"width":"17vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Seats</h1></th>
                        <th style={{"width":"7vw"}}></th>
                    </tr>
                </thead>
                <tbody>
                    {bookings?.map((item: BookingCollection, index:number)=>{
                        return <tr key={index}>
                            <td>
                                {index + 1}
                            </td>
                            <td style={{"textAlign":"center"}}>
                                {item.roomName}
                            </td>
                            <td style={{"textAlign":"center"}}>
                                {item.price}
                            </td>
                            <td style={{"textAlign":"center"}}>
                                {item.date}
                            </td>
                            <td style={{"textAlign":"center"}}>
                                {item.begining}
                            </td>
                            <td style={{"textAlign":"center"}}>
                                {item.seats.map((seat: number, index)=>{
                                    return <> {seat}
                                    </>
                                })}
                            </td>
                            <td style={{backgroundColor:"#FFC840"}}>
                                <Link to={`/payment/${item.id}`}>Pay</Link>
                            </td>
                        </tr>
                    })}
                </tbody>
                </table>

            </div>
        </div>}
    </div>
}

{/* <table className="container w-100 text-white" >
<thead>
    <tr>
        <th style={{"width":"3vw"}}><h1 className="tableh1">№</h1></th>
        <th style={{"width":"17vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Room</h1></th>
        <th style={{"width":"17vw"}}><h1 className="tableh1" style={{"textAlign":"center"}}>Free seats count</h1></th>
        <th style={{"width":"7vw"}}></th>
        {AuthVerify() &&  <th style={{"width":"7vw"}}></th>}
    </tr>
</thead>
<tbody>
    {gamingList?.map((room: RoomItem, index:number)=>{
        return <tr key={index}>
            <td>
                {index + 1}
            </td>
            <td style={{"textAlign":"center"}}>
                {room.name}
            </td>
            <td style={{"textAlign":"center"}}>
                10
            </td>
            <td style={{backgroundColor:"#238D43"}}>
                <Link to={`/room/${room.id}/${room.name}`} style={{"textAlign":"center"}}>Info</Link>
            </td>
            {AuthVerify() &&     <td style={{backgroundColor:"#FFC840"}}>
                <Link to={`/booking/${room.id}/${room.name}`}>Booking</Link>
            </td>}
        </tr>
    })}
</tbody>
</table>



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
                // </div> 