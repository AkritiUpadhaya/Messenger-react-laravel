import { Link } from '@inertiajs/react'
import React from 'react'
import UserThumbnail from './UserThumbnail'

export default function GroupUsersPopover({users}) {
  return (
    <>
      <Popover className='relative'>
        <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
          <ExclamationCircleIcon className='w-4'/>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="bottom"
          className="absolute right-0 z-10 mt-3 w-[200px] divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
        >
            <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5'>
            <div className='bg-gray-800 py-2'>
                {users.map((user)=>(
                    <Link
                    href={route("chat.user", user.id)}
                    key={user.id}
                    className='flex items-center gap-2 py-2 px-3 hover:bg-black/30'>
                        <UserThumbnail user={user}/>
                        <div className='text-xs'>
                            {user.name}
                        </div>
                    </Link>
                ))}
              
              </div>
              </div>
        </PopoverPanel>
      </Popover>
     </>
  )
}
