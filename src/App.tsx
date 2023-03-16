import './App.css';
import {BrowserRouter, Routes, Route, Navigate, HashRouter} from 'react-router-dom';
import { Header } from './components/header/Header';
import { AccessTokenVerify } from './utis/scripts/AccessTokenVerify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Footer } from './components/footer/Footer';
import { Home } from './pages/Home';
import { Rooms } from './pages/rooms/Rooms';
import { RoomInfo } from './pages/rooms/RoomInfo';
import { BookingMaking } from './pages/bookings/BookingMaking';
import { GameLibrary } from './pages/GameLibrary';
import { Location } from './pages/Location';
import { Logout } from './pages/identity/Logout';
import Login from './pages/identity/Login';
import { Registration } from './pages/identity/Registration';
import { EmailConfirm } from './pages/identity/EmailConfirm';
import { TopTeams } from './pages/teams/TopTeams';
import { Profile } from './pages/profile/Profile';
import { Tournaments } from './pages/tournaments/Tournaments';
import { TournamentDetailed } from './pages/tournaments/TournamentDetailed';
import { UsersTournaments } from './pages/tournaments/UsersTournaments';
import { ShowQrCode } from './pages/profile/ShowQrCode';
import { ChatList } from './pages/chat/ChatList';
import { Chat } from './pages/chat/Chat';
import { JoinRequests } from './pages/teams/JoinRequest';
import { HiringTeams } from './pages/teams/HiringTeams';
import { Basket } from './pages/basket/Basket';
import { Payment } from './pages/basket/Payment';
import { CreateTournament } from './pages/tournaments/CreateTournament';
import { SelectWinner } from './pages/teams/SelectWinner';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState } from 'react';
import { joinNotificationsBroadcasting } from './utis/scripts/signalR';

export const App = () => {

    //  const connection = new HubConnectionBuilder()
    //         .withUrl("https://localhost:7227/notify")
    //         .configureLogging(LogLevel.Information)
    //         .build();
    
    // const [notificationConnection, setNotificationConnection] = useState();

    joinNotificationsBroadcasting();

    // const[isAuth, setIsAuth] = useState(false);

    return <div>
        <HashRouter basename='/'>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<Rooms/>}></Route>
                <Route path="/room/:id/:name" element = {<RoomInfo/>}/>
                <Route path="/booking/:roomId/:roomName/" element={<BookingMaking/>}/>
                <Route path="/games" element = {<GameLibrary/>}/> 
                <Route path="/location" element={<Location/>}></Route> 
                <Route path="/login" element = {<Login/>}/>  
                <Route path="/logout" element = {<Logout />}/>   
                <Route path="/register" element = {<Registration/>}/>
                <Route path="/emailConfirm/:email/:userId" element={<EmailConfirm/>}/>
                <Route path="/topTeams" element={<TopTeams/>}></Route>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/showActualTournaments" element={<Tournaments/>}></Route>
                <Route path="/showTournamentDetailed/:id" element={<TournamentDetailed/>}></Route>
                <Route path="/usersTournaments" element={<UsersTournaments/>}/>
                <Route path="/showQrCode/:tournamentId/:teamId" element={<ShowQrCode/>}/>
                <Route path="/chats" element={<ChatList/>}></Route>
                <Route path="/chats/:chatId/:isYouACaptain/:teamId/:otherId" element={<Chat/>}></Route>
                <Route path="/joinRequests" element={<JoinRequests/>}></Route>
                <Route path="/hiringTeam" element={<HiringTeams/>}></Route>
                <Route path="/basket" element={<Basket/>}></Route>   
                {/* <Route path="/payment/:bookingId" element={<Payment/>}></Route>   */}
                <Route path="/payment" element={<Payment/>}></Route>  
                <Route path="/createTournament" element={<CreateTournament/>}/> 
                <Route path="/selectWinner/:tournamentId/:batleId/:firstTeamName/:firstTeamId/:secondTeamName/:secondTeamId" element={<SelectWinner/>}></Route>

                {/*
                <Route path="/gamingRoomTypeChoosing" element = {<GamingRoomTypeChoosing/>}/>
                <Route path="/gamingRooms" element = {<GamingRoomList/>}/>
                <Route path="/gamingRooms/:id/:name" element = {<GamingRoom/>}/> 
                
                          
                <Route path="/passwordRecovering" element = {<PasswordRecovering/>}/>                
                <Route path="/passwordReset/:email" element = {<ResetPassword/>}/>                
                <Route path="/teamCreating" element={<TeamCreating/>}/>
                <Route path="/bookingView/:isActual" element={<BookingViewComponent/>}/>
                <Route path="/bookingViewDetail/:id" element={<OneBookingView/>}/>
                <Route path="/checkTeam/:tournamentId/:teamId" element={<CheckTeam/>}/>
                <Route path="/searchRoom" element={<RoomSearch/>}/>
                <Route path="/404" element={<NotFound/>}/>
                <Route path="*" element={<Navigate replace to="/404" />} />
                <Route path="/index" element={<Index/>}></Route>
               
              
                <Route path="/sendTeamJoinRequest" element={<Home/>}></Route>
                <Route path="/registerTeam/:tournamentId" element={<TournamentTeamRegistration/>}></Route>   
        
               
               */}
            </Routes>
            <AccessTokenVerify/> 
            {/* <Footer/> */}
            <ToastContainer position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"/>         
        </HashRouter>
    </div>
}