import { ArrowLeftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid'
import { Link } from '@inertiajs/react'
import React from 'react'
import UserThumbnail from './UserThumbnail'
import GroupThumbnail from './GroupThumbnail'
import axios from 'axios'
import GroupDescriptionPopover from './GroupDescriptionPopover'
import GroupUsersPopover from './GroupUsersPopover'

const ConversationHeader = ({selectedConversation}) => {
    const onDeleteGroup=()=>{
        if(!window.confirm("Are you sure you want to delete this group?")){
            return
        }
        axios.delete(route('group.destroy', selectedConversation.id))
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.error(err)
        })
    }
  return (
    <>
    {selectedConversation && (
        <div className='p-3 flex justify-between items-center border-b border-slate-700'>
            <div className='flex- items-center gap-3 '>
                <Link href={route('dashboard')} className='inline-block sm:hidden'>
                <ArrowLeftIcon className='w-6'/>
                </Link>
                {selectedConversation.is_user && (
                    <UserThumbnail user={selectedConversation}/>
                )}
                {selectedConversation.is_group && <GroupThumbnail/>}
                <div>
                    <h3>{selectedConversation.name}</h3>
                    {selectedConversation.is_group && (
                        <p className='text-xs text-gray-500'>
                            {selectedConversation.users.length}members
                        </p>
                    )}
                </div>
            </div>
            {selectedConversation.is_group && (
                <div className='flex gap-3 '>
                    <GroupDescriptionPopover
                    details={selectedConversation.details}/>
                    <GroupUsersPopover
                    users= {selectedConversation.users}/>
                    {selectedConversation.admin_id==authUser.id &&(
                        <>
                        <div 
                        className='tooltip tooltip-left'
                        data-tip="Edit Group">
                            <button onClick={(ev)=>
                                emit(
                                    "GroupModel.show",
                                    selectedConversation
                                )
                            } className='text-gray-400 hover:text-gray-200'>
                                <PencilSquareIcon className='w-4'/>
                            </button>
                        </div>
                        <div className='tooltip tooltip-left'
                        data-tip="Delete Group">
                            <button 
                            onClick={onDeleteGroup}
                            className='text-gray-400 hover:text-gray-200'>
                                <TrashIcon className='w-4'/>
                            </button>
                        </div>
                        </>
                    )}
                </div>
            )}

        </div>
    )}
    </>
  )
}

export default ConversationHeader
