import { Combobox, ComboboxInput } from '@headlessui/react'
import React, { useState } from 'react'

export default function UserPicker({value, options, onselect}) {
    const [selected, setSelected]= useState(value)
    const [query, setQuery]= useState("")
    const filteredPeople=
    query ===""
    ? options
    : options.filter((person)=>
    person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
)
const onSelected= (persons)=>{
    setSelected(persons)
    onselect(persons)
}
  return (
    <>
    
    
      <Combobox value={selected} onChange={onSelected} multiple>
        <div className="relative mt-1">
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            displayValue={(persons) => persons.length
                ?`${persons.length} user selected`
                :""
            }
            placeholder='Select users'
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
            {filteredPeople.length===0 && query!==""?(
                <div className='relative cursor-default select-none px-4 py-2 text-gray-100'>
                    Nothing found
                </div>
            ) : (
                filteredPeople.map((person) => (
                    <ComboboxOption
                      key={person.id}
                      value={person}
                      className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                    >
                      <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                      <div className="text-sm/6 text-white">{person.name}</div>
                    </ComboboxOption>
                  ))
            )}
          
        </ComboboxOptions>
      </Combobox>
      {selected && (
        <div className='flex gap-2 mt-3'>
            {selected.map((person)=>{
                <div key={person.id}
                className='badge badge-primary gap-2'>
                    {person.name}
                </div>
            })}
        </div>
      )}


    </>
  )
}
