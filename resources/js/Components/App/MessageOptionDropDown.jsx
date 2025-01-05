import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    TrashIcon,
  } from '@heroicons/react/16/solid'
import axios from 'axios';

export default function MessageOptionDropDown({message}){
    const onMessageDelete=()=>{
        console.log("delete message")
        axios
        .delete(route("message.destroy", message.id))
        .then((res)=>{
            emit("message.deleted",message)
            console.log(res.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    }
    
    return (
        <div className='absolute right-full text-gray-100 top-1/2 -translate-y-1/2'>
          <Menu as='div' className="relative inline-block text-left">
            <div>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <EllipsisVerticalIcon className="h-5 w-5"/>
        </MenuButton>
        </div>
        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button
            onClick={onMessageDelete} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            
              <TrashIcon className="size-4 fill-white/30" />
              Delete
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
        </div>
    )
}

