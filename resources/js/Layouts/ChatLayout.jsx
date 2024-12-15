import { usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from './AuthenticatedLayout';
import Echo from 'laravel-echo';
import { PencilSquareIcon } from '@heroicons/react/24/outline';  
import TextInput from '@/Components/TextInput';
import ConversationItem from '@/Components/App/ConversationItem';

 function ChatLayout({children}) {
    const page= usePage();
    const conversations= page.props.conversations;
    const selectedConversation= page.props.selectedConversation;
    const [online, setOnline]= useState({});
    const [localConversation, setLocalConversation]= useState(conversations);
    const [sortedConversation, setSortedConversation]= useState([])
    console.log('conversations', conversations);
    console.log('selectedConversation', selectedConversation);
    const onSearch=(ev)=>{
      const search= ev.target.value.toLowerCase();
      setLocalConversation(
        conversations.filer((conversation)=>{
          return(
            conversation.name.toLowerCase().includes(search)
          )
        })
      )
    }
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
      <div className="flex-1 w-full flex overflow-hidden">
        <div className={`transition-all w-full sm:w-[220px] md:w-[300px] bg-slate-400 flex flex-col overflow-hidden ${
          selectedConversation? "-ml-[100%] sm:ml-0":""
        }`}>
          <div className='flex items-center justify-between py-2 px-3 text-xl font-medium'>
            My conversations
            <div className='tooltip tooltip-left'
            data-tip="Create new Group"
            >
              <button className='text-gray-800 hover:text-gray-200'>
                <PencilSquareIcon className="w-4 h-4 inline-block ml-2"/> 
              </button>
            </div>
          </div>
          <div className='p-3'>
            <TextInput onKeyUp={onSearch}
            placeholder="Filter users and groups"
            className="w-full"/>
          </div>
          <div className='flex-1 overflow-auto'>
            {sortedConversation && sortedConversation.map((conversation)=>(
              <ConversationItem
              key={`${
                conversation.is_group
                ?"group_"
                :"user_"
              }${conversation.id}`}
              conversation={conversation}
              online={!!isUserOnline(conversation.id)}
              selectedConversation={selectedConversation}/>
            ))}
          </div>
        </div>
      <div className='flex-1 flex flex-col overflow-hidden'>
        {children}
        </div>
      </div>
      </>
  )    
}
export default ChatLayout;
