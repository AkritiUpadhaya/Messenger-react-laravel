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
          className="absolute right-0 z-10 mt-3 w-[300px] divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
        >
            <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5'>
            <div className='bg-gray-800 py-4'>
              <h2 className="font-semibold text-white">
                Description
                </h2>
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
              </div>
              </div>
        </PopoverPanel>
      </Popover>
      </>

)
}
  
