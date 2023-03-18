import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";

export const Payment = ()=>{

    const {bookingId} = useParams<string>();

    const [cardNumber, setCardNumber] = useState<string>("");
    const [cardMonth, setCardMonth] = useState<string>("");
    const [cardYear, setCardYear] = useState<string>("");
    const [cardCvv, setCardCvv] = useState<string>("");
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

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

    return <> {iternalServerError ? <div>
            <IternalServerError/>
    </div>
    :<div className="myConteiner">
        <div className="align-items-center justify-content-center text-white w-50 h-100" style={{"display":"flex","justifyContent":"center","alignItems":"center","backgroundColor":"#242C48","marginTop":"2vh","borderRadius":"1vw"}}>
            <form>
                <div style={{"width":"25vw","height":"15vw","borderRadius":"1vw","backgroundColor":"white"}}>
                </div>
                <input type="submit" value={"Submit"} style={{"marginTop":"3vh","width":"13vw"}}/>
            </form>
        </div>
    </div>}
    </>
}