import { usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from './AuthenticatedLayout';
import Echo from 'laravel-echo';

 function ChatLayout({children}) {
    const page= usePage();
    const conversations= page.props.conversations;
    const selectedConversation= page.props.selectedConversation;
    const [online, setOnline]= useState({});
    const [localConversation, setLocalConversation]= useState(conversations);
    const [sortedConversation, setSortedConversation]= useState([])
    console.log('conversations', conversations);
    console.log('selectedConversation', selectedConversation);
    const isUserOnline= (userId)=>online[userId];
    useEffect(()=>{
      setSortedConversation(
        localConversation.sort((a,b)=>{
          if(a.blocked_at && b.blocked_at){
            return a.blocked_at > b.blocked_at? 1 : -1;
          }
          else if(a.blocked_at){
            return 1;
          }
          else if (b.blocked_at){
            return -1;
          }
          if(a.last_message_date && b.last_message_date){
            return b.last_message_date.localeCompare(
              a.last_message_date);
          }
          else if(a.last_message_date){
            return -1;
          }
          else if(b.last_message_date){
            return 1;
          }
          else{
            return 0;
          }

        })
      )
    }, [localConversation])
    useEffect(()=>{
      setLocalConversation(conversations)
    }, [conversations])
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
