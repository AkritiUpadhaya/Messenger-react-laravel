import { ExclamationCircleIcon } from '@heroicons/react/16/solid'
import React from 'react'

export default function GroupDescriptionPopover({details}) {
  return (
    <>
      <Popover className='relative'>
        <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
          <ExclamationCircleIcon className='w-4'/>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="bottom"
          className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
        >
          <div className="p-3">
            <className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
              <h2 className="font-semibold text-white">Description</h2>
              {details &&(
                <div className='text-xs'>
                    {details}
                </div>
              )}
              {!details &&(
                <div className='text-xs text-gray-500 text-center py-4'>
                    No description is defined 
                </div>
              )}
            </a>
        
          </div>
        </PopoverPanel>
      </Popover>
      </>

)
}
  
