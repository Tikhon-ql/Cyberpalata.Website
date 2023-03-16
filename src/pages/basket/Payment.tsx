import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import api from "../../api/api";

export const Payment = ()=>{

    const {bookingId} = useParams<string>();

    const [cardNumber, setCardNumber] = useState<string>("");
    const [cardMonth, setCardMonth] = useState<string>("");
    const [cardYear, setCardYear] = useState<string>("");
    const [cardCvv, setCardCvv] = useState<string>("");

    function finalizeBooking(e:any)
    {
        e.preventDefault();
        var requestBody = {
            cardNumber: cardNumber,
            cardDate: cardMonth + cardYear,
            cardCvv: cardCvv,
            bookingId: bookingId
        };
        api.post(`/booking/finalizeBooking`,requestBody).then(()=>{
            toast.success("Booking successed");
        });
    }

    return <div className="myConteiner">
        <div className="align-items-center justify-content-center text-white w-50 h-100" style={{"display":"flex","justifyContent":"center","alignItems":"center","backgroundColor":"#242C48","marginTop":"2vh","borderRadius":"1vw"}}>
            <form>
                <div style={{"width":"25vw","height":"15vw","borderRadius":"1vw","backgroundColor":"white"}}>
                </div>
                <input type="submit" value={"Submit"} style={{"marginTop":"3vh","width":"13vw"}}/>
            </form>
        </div>
        {/* <form method="post" onSubmit={(e)=>{finalizeBooking(e)}}>
            <input type="text" id="number" name="number" onChange={(e)=>{setCardNumber(e.target.value)}} defaultValue={cardNumber} placeholder="0000-0000-0000-0000"/>
            <div className="d-flex">
                <select name='expireMM' onChange={(e)=>setCardMonth(e.target.value)} id='expireMM'>
                    <option value=''>Month</option>
                    <option value='01'>January</option>
                    <option value='02'>February</option>
                    <option value='03'>March</option>
                    <option value='04'>April</option>
                    <option value='05'>May</option>
                    <option value='06'>June</option>
                    <option value='07'>July</option>
                    <option value='08'>August</option>
                    <option value='09'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                </select> 
                <select name='expireYY' onChange={(e)=>{setCardYear(e.target.value)}} id='expireYY'>
                    <option value=''>Year</option>
                    <option value='23'>2023</option>
                    <option value='24'>2024</option>
                    <option value='25'>2025</option>
                    <option value='26'>2026</option>
                    <option value='27'>2027</option>
                </select> 
                <input style={{"marginLeft":"0.2vw"}} type="number" id="cvv" name="cvv" onChange={(e)=>{setCardCvv(e.target.value)}} min="0" max="999"/>
            </div>        
            <input type="submit" value={"Finalize booking"}/>
        </form> */}
    </div>
}