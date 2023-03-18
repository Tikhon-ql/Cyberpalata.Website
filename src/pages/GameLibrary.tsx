import React, { useEffect, useState } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import api from '../api/api';
import { IternalServerError } from '../utis/components/errors/IternalServerError';
import { Loader } from '../utis/components/loader/Loader';
import { Game } from '../utis/types/types';

type GameList = 
{
    items: Game[],
    pageSize:number,
    totalItemsCount: number
}

export const GameLibrary = ()=>{

    const [games,setGames] = useState<GameList>({
        items:[
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },
            {
                name:"Cs:GO",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg"
            },

        ],
        pageSize:10,
        totalItemsCount:20
    });
    const [curPage, setCurPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [iternalServerError, setIternalServerError] = useState<boolean>(false);

    // useEffect(()=>{
    //     setLoading(true);
    //     api.get(`/games/getGames?page=${curPage}`).then(res=>{
    //         setGames(res.data);
    //     }).catch(error=>{
    //         if(error.code && error.code == "ERR_NETWORK")
    //         {
    //             setIternalServerError(true);
    //         }
    //         if((error.response.status >= 500 && error.response.status <= 599))
    //         {
    //             setIternalServerError(true);
    //         }
    //     }).finally(()=>{
    //         setLoading(false);
    //     });
    // },[curPage])

    return <>{iternalServerError ? <div><IternalServerError/></div> :  
    <div className='myConteiner text-white'>
        {loading ? <div>
            <Loader loading={loading}/>
        </div>:
            <ul style={{"listStyle":"none","display":"table-cell","columnCount":"7"}}>
                {games?.items.map((game:Game, index)=>{
                    return <li key={index} style={{"backgroundColor":"#242C48","padding":"1vw"}}>
                        <img style={{width:"100px",height:"100px"}} src={`${game.imageUrl}`}/>
                        <h2>{game.name}</h2>
                    </li>
                })}
            </ul>}
     </div> 
    }</>
}










