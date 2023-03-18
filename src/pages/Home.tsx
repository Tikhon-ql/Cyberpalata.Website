import './../App.css';
import {Link} from 'react-router-dom'
import React from "react";

// const img = React.lazy(() => import())



export const Home = ()=>{
    return <div className='myConteiner'>
        <div>
            <div className='d-flex'>
                <Link to="/rooms" className='mainButton myConteiner'>
                    <div className='mainInnerButton myConteiner'>
                        <img src={require(`./../assets/imgs/room.png`)}></img>
                    </div>
                </Link>
                <Link to="/games" className='mainButton myConteiner'>
                    <div className='mainInnerButton myConteiner'>
                        <img src={require(`./../assets/imgs/games.png`)}></img>
                    </div>
                </Link>
                <Link to="/showActualTournaments" className='mainButton myConteiner'>
                    <div className='mainInnerButton myConteiner'>
                        <img src={require(`./../assets/imgs/trophy.png`)}></img>
                    </div>
                </Link>
            </div>
            <div className='d-flex'>
                <Link to="/location" className='mainButton myConteiner'>
                    <div className='mainInnerButton myConteiner'>
                        <img src={require(`./../assets/imgs/location.png`)}></img>
                    </div>
                </Link>
                <Link to="/hiringTeam" className='mainButton myConteiner'>
                    <div className='mainInnerButton myConteiner'>
                        <img src={require(`./../assets/imgs/recruitment.png`)}></img>
                    </div>
                </Link>
                <Link to="/topTeams" className='mainButton myConteiner'>
                    <div className='mainInnerButton myConteiner'>
                        <img src={require(`./../assets/imgs/teamTop.png`)}></img>
                    </div>
                </Link>
            </div>
        </div>    
    </div>
}










// export type Image = {
//     path: string,
//     index: number
// };

// export const Home = () => {

//     const imgsPathes = [
//         "./first.jpg",
//         "./second.jpg",
//         "./third.jpg",
//         "./forth.jpg",
//         "./fiveth.jpg",
//         "./first.jpg"
//     ]

//     const [curImage, setCurImage] = useState<number>(0);
//     const [img, setImg] = useState<string>("./first.jpg");

//     let accessToken;
//     if(localStorage.getItem('accessToken'))
//     {
//         accessToken = jwtDecode(localStorage.getItem('accessToken') || "");
//         console.dir(accessToken);
//     }
    
//     function liFocus(event:any)
//     {   
//         if(event.target.value)
//         {
//             setCurImage(event.target.value as number);
//             // console.log();
//             setImg(imgsPathes[curImage]);
//         }
//         // var indexImage: number = event.target.value as number;
//         // (document.getElementById("image") as HTMLDivElement).style.backgroundImage = `${images[indexImage].path}`;
//     }
//     return <>
//         <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"90vh"}}>
//             {/* <div style={{"width":"150px"
//             ,"height":"150px","background":"blue","position":"absolute","top":"0","left":"0"}}></div> */}
//             <div style={{"height":"100vh","width":"35%"}}>
//                 <div className='circle' style={{"borderRadius":"125px","width":"250px","height":"250px","marginLeft":"9vw"}}>
//                 </div>
//                 <div style={{"marginTop":"8vh","marginLeft":"7vw"}}>
//                     <ul className="customUl">
//                         <li onMouseOver={(e)=>{
//                             liFocus(e)
//                         }}  
//                         className="dropdown">
//                            {(AuthVerify() && accessToken) && <button value={0} className="dropbtn">Booking</button>}
//                             <div className="dropdown-content">
//                                 <Link to="/gamingRooms">Add</Link>
//                                 <Link to="/bookingView/actual">Current</Link>
//                                 <Link to="/bookingView/history">History</Link>
//                             </div>
//                         </li>                  
//                         <li className="dropdown" onMouseOver={(e)=>{liFocus(e)}}>
//                             <button className="dropbtn" value={1}>Tournaments</button>
//                             <div className="dropdown-content">
//                                 <Link to="/showActualTournaments">Actual</Link>
//                             </div>
//                         </li>
//                         <Link to="/gamesLibrary" onMouseOver={(e)=>{liFocus(e)}}><li value={2}>Game library</li></Link>
//                         <Link to="/location" onMouseOver={(e)=>{liFocus(e)}}><li value={5}>Show room</li></Link>
//                         <Link to="/contacts" onMouseOver={(e)=>{liFocus(e)}}><li value={3}>Contacts</li></Link>
//                         <Link to="/location" onMouseOver={(e)=>{liFocus(e)}}><li value={4}>Location</li></Link>
//                     </ul>
//                 </div>
//             </div>
//             <div id="image" className="leftSide"> <img src={require(`${imgsPathes[curImage]}`)} style={{padding:"8vw 8vh",borderRadius:""}}/></div>
//         </div>
//     </>
// }

