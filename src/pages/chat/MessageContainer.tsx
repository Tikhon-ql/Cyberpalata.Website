import React, { useEffect, useRef } from 'react';
import { Message } from '../../utis/types/types';

export type Props = {
    messages: Message[],
    curUser: string,
}

export const MessageContainer = ({messages, curUser}:Props) => {

    const messageRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    useEffect(()=>{
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    },[messages])

    return <div ref={messageRef} className="message-container" >
        {messages.map((item:Message,index)=>{
            return <>{curUser === item.user ? <div>
                    <div key={index} className="user-message-right">
                        <div className='message bg-primary'>
                            {item.message}
                        </div>
                        <div className='from-user'>
                            {item.user}
                        </div>
                    </div>
                </div> : 
                <div>
                      <div key={index} className="user-message-left">
                        <div className='message bg-primary'>
                            {item.message}
                        </div>
                        <div className='from-user'>
                            {item.user}
                        </div>
                    </div>
                </div>}</> 
        })}
    </div>
}