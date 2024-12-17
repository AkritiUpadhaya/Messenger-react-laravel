import { ArrowLeftIcon } from '@heroicons/react/16/solid'
import { Link } from '@inertiajs/react'
import React from 'react'
import UserThumbnail from './UserThumbnail'
import GroupThumbnail from './GroupThumbnail'

const ConversationHeader = () => {
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

        </div>
    )}
    </>
  )
}

export default ConversationHeader
