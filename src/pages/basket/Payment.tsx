import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { IternalServerError } from "../../utis/components/errors/IternalServerError";

export const Payment = ()=>{

    const {bookingId} = useParams<string>();

    const [cardNumber, setCardNumber] = useState<string>("");
    // const [cardMonth, setCardMonth] = useState<string>("");
    // const [cardYear, setCardYear] = useState<string>("");
    const [cardExpiration, setCardExpiration] = useState<string>();
    const [cardCvv, setCardCvv] = useState<string>("");
    const [cardOwner, setCardOwner] = useState<string>("");
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    function finalizeBooking(e:any)
    {
        e.preventDefault();
        var requestBody = {
            cardNumber: cardNumber,
            cardDate: cardExpiration?.replace('/',''),
            cardCvv: cardCvv,
            bookingId: bookingId
        };
        api.post(`/booking/finalizeBooking`,requestBody).then(()=>{
            toast.success("Payment successed");
        }).catch(error=>{
            if(error.code && error.code == "ERR_NETWORK")
            {
                setIternalServerError(true);
            }
            if((error.response.status >= 500 && error.response.status <= 599))
            {
               setIternalServerError(true);
            }
            console.dir(error);
            toast.error(error.response.data.Other);
        });
    }

    function isNumeric(s:any) {
        return !isNaN(s - parseFloat(s));
    }

    function cardNumberChanged(e:any,value:string)
    {
        if(!e.nativeEvent.data || isNumeric(e.nativeEvent.data))
        {
            var length: number = value.replace(/ /g,'').length;
            if(length % 4 == 0 && length != 16 && e.nativeEvent.data)
            {
                value += ' ';
            }
            setCardNumber(value);
        }
    }
    function cardExpirationChanged(e:any,value:string)
    {
        if(!e.nativeEvent.data || isNumeric(e.nativeEvent.data))
        {
            var length: number = value.replace(/ /g,'').length;
            if(length == 2 && e.nativeEvent.data)
            {
                value += '/';
            }
            if(value.indexOf('/') != 2 && value.length > 2)
            {
                value = value.slice(0,2) + '/' + value.slice(2, value.length);
            }
            setCardExpiration(value);
        }
    }

    return <> {iternalServerError ? <div>
            <IternalServerError/>
    </div>
    :<div className="myConteiner">
        <div className="align-items-center justify-content-center text-white w-50 h-100" style={{"display":"flex","justifyContent":"center","alignItems":"center","backgroundColor":"#242C48","marginTop":"2vh","borderRadius":"1vw"}}>
                <div style={{"width":"25vw","height":"15vw","borderRadius":"1vw","backgroundColor":"#06040f"}}>
                    <div style={{"display":"flex","width":"100%","justifyContent":"end"}}>
                        <h1 style={{"marginTop":"2vw","marginRight":"2vw"}}>Creadit card</h1>
                    </div>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <form onSubmit={(e)=>{finalizeBooking(e)}} className="m-5 w-50">
                        <input name="nameoncard" className="inputForm" type="text" placeholder="IVAN IVANOV" maxLength={50} onChange={(e)=>{setCardOwner((e.target.value.toLocaleUpperCase()))}} value={cardOwner}/>
                            <input name="cardnumber" className="inputForm"  type="text" placeholder="0000-0000-0000-0000" maxLength={19}  onChange={(e)=>{cardNumberChanged(e,e.target.value)}} value={cardNumber}/>
                            <input name="experationdate" className="inputForm"  type="text" placeholder="MM/YYYY" maxLength={7} minLength={5} onChange={(e)=>{cardExpirationChanged(e,e.target.value)}} value={cardExpiration}/>
                            <input name="cvvnumber" className="inputForm"  type="text" placeholder="CVV" onChange={(e)=>{setCardCvv(e.target.value)}} maxLength={3}/>
                            <input className="form-submit" type="submit" value="Pay Now" />
                        </form>
                    </div>
                </div>
        </div>
    </div>}
    </>
}