import { usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from './AuthenticatedLayout';
import Echo from 'laravel-echo';
import { PencilSquareIcon } from '@heroicons/react/24/outline';  
import TextInput from '@/Components/TextInput';
import ConversationItem from '@/Components/App/ConversationItem';
import { useEventBus } from '@/EventBus';
import GroupModal from '@/Components/App/GroupModal';


 function ChatLayout({children}) {
    const page= usePage();
    const conversations= page.props.conversations;
    const selectedConversation= page.props.selectedConversation;
    const [online, setOnline]= useState({});
    const [localConversation, setLocalConversation]= useState(conversations);
    const [sortedConversation, setSortedConversation]= useState([])
    const [showGroupModal, setShowGroupModal]= useState(false)
    const {on}= useEventBus()
    console.log('conversations', conversations);
    console.log('selectedConversation', selectedConversation);
    const onSearch=(ev)=>{
      const search= ev.target.value.toLowerCase();
      setLocalConversation(
        conversations.filter((conversation)=>{
          return(
            conversation.name.toLowerCase().includes(search)
          )
        })
      )
    }
    const messageCreated= (message)=>{
      setLocalConversation((oldUsers)=>{
        return oldUsers.map((u)=>{
          if(message.receiver_id && !u.is_group &&(
            u.id== message.sender_id || u.id == message.receiver_id
          )){
            u.last_message= message.message
            u.last_message_date= message.created_at
            return u
          }
          if(message.group_id && !u.is_group &&
            u.id== message.group_id 
          ){
            u.last_message= message.message
            u.last_message_date= message.created_at
            return u
          }
          return u
        })
      })
    }
    const messageDeleted=({prevMessage})=>{
      if(!prevMessage){
        return
      }
      setLocalConversation((oldUsers)=>{
        return oldUsers.map((u)=>{
          if(prevMessage.receiver_id && !u.is_group &&(
            u.id== prevMessage.sender_id || u.id == prevMessage.receiver_id
          )){
            u.last_message= prevMessage.message
            u.last_message_date= prevMessage.created_at
            return u
          }
          if(prevMessage.group_id && !u.is_group &&
            u.id== prevMessage.group_id 
          ){
            u.last_message= prevMessage.message
            u.last_message_date= prevMessage.created_at
            return u
          }
          return u
        })
      })
    }
    useEffect(()=>{
      const offCreated= on("message.created", messageCreated)
      const offDeleted= on("message.deleted", messageDeleted)
      const offModalShow= on("GroupModal.show", (group)=>{
        setShowGroupModal(true)
      })
      return()=>{
        offCreated()
        offDeleted()
        offModalShow()
      }
    },[on])
    
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
              <button onClick={ev=> setShowGroupModal(true)} className='text-gray-800 hover:text-gray-200'>
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
        <GroupModal show={showGroupModal} onCLose={()=>setShowGroupModal(false)}/>
      </div>
      </>
  )    
}
export default ChatLayout;
