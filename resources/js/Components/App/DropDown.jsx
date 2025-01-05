import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    LockClosedIcon,
    LockOpenIcon,
    ShieldCheckIcon,
    UserIcon,
  } from '@heroicons/react/16/solid'
import axios from 'axios';

const DropDown=({conversation})=>{
  const changeUserRole=()=>{
    console.log("change user role")
    if(!conversation.is_user){
      return
    }
    axios
    .post(route("user.changeRole", conversation.id))
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err)=>{
      console.error("error", err)
    })
  }
  const onBlockUser=()=>{
    console.log("Block User")
    if(!conversation.is_user){
      return
    }
    axios
    .post(route("user.blockUnblock", conversation.id))
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err)=>{
      console.error("error", err)
    })
  }
    return (
        <div>
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
            onClick={onBlockUser} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            {conversation.blocked_at &&(
              <>
              <LockOpenIcon className="size-4 fill-white/30" />
              Unblock User
              </> 
            )}
              {!conversation.blocked_at &&(
              <>
              <LockClosedIcon className="size-4 fill-white/30" />
              Block User
              </> 
              )}
            </button>
          </MenuItem>
          <MenuItem>
            <button
            onClick={changeUserRole} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            {conversation.is_admin &&(
              <>
              <UserIcon className="size-4 fill-white/30" />
              Make Regular User
              </> 
              )}
                {!conversation.is_admin &&(
              <>
              <ShieldCheckIcon className="size-4 fill-white/30" />
              Make Admin
              </> 
              )}
            </button>
            </MenuItem>
        </MenuItems>
      </Menu>
        </div>
    )
}
export default DropDown