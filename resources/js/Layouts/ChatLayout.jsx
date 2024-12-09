import { usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from './AuthenticatedLayout';
import Echo from 'laravel-echo';

 function ChatLayout({children}) {
    const page= usePage();
    const conversations= page.props.conversations;
    const selectedConversation= page.props.selectedConversation;
    const [online, setOnline]= useState({});
    console.log('conversations', conversations);
    console.log('selectedConversation', selectedConversation);
    useEffect(()=>{
        window.Echo.join(`online`)
        .here((users)=>{
          const onlineObject= Object.fromEntries(
            users.map((user)=>[user.id, user])
          );
          setOnline((prevUsers)=>{
            return {...prevUsers, ...onlineObject}

          })
        })
        .joining((user)=>{
          setOnline((prevUsers)=>{
            const updatedUsers= {...prevUsers};
            updatedUsers[user.id]= user;
            return updatedUsers;
          })
        })
        .leaving((user)=>{
          setOnline((prevUsers)=>{
            const updatedUsers= {...prevUsers};
            delete updatedUsers[user.id]
            return updatedUsers;
          })
        }).error((error)=>{
          console.error('error',error);
        });
        return()=>{
          window.Echo.leave('online');
        }
        
    },[]);
  return (
    <>
   
      ChatLayout
      <div>{children}</div>
      </>
  )    
}
export default ChatLayout;
