import React, { useEffect, useState } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import api from '../api/api';
import { Loader } from '../utis/components/loader/Loader';
import { Game } from '../utis/types/types';

type GameList = 
{
    items: Game[],
    pageSize:number,
    totalItemsCount: number
}

export const GameLibrary = ()=>{

    const [games,setGames] = useState<GameList>();
    const [curPage, setCurPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        setLoading(true);
        api.get(`/games/getGames?page=${curPage}`).then(res=>{
            setGames(res.data);
        }).finally(()=>{
            setLoading(false);
        });
    },[curPage])

    return <div className='myConteiner text-white'>
        {loading ? <div>
            <Loader loading={loading}/>
        </div>:
        <div className='d-flex'>
            {games?.items.map((game:Game, index)=>{
                return <div key={index}>
                    <img style={{width:"100px",height:"100px"}} src={`${game.imageUrl}`}/>
                    <h2>{game.name}</h2>
                </div>
            })}
        </div>}
    </div>    
}










