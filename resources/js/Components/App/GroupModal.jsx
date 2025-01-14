import { useEventBus } from '@/EventBus'
import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import InputLabel from '../InputLabel'
import SecondaryButton from '../SecondaryButton'
import TextInput from '../TextInput'
import InputError from '../InputError'
import TextAreaInput from '../TextAreaInput'
import UserPicker from './UserPicker'

export default function GroupModal({show, onCLose=()=>{}}) {
    const page= usePage()
    const conversation= page.props.conversation || []
    const {on, emit}= useEventBus()
    const [group, setGroup]= useState({})
    const {data, setData, processing, reset, post, put, errors}= useForm({
        id:"",
        name:"",
        details:"",
        user_ids:[]
    })
    const users= Array.isArray(conversation)
    ? conversation.filter((c)=>!c.is_group)
    :[];
    const createOrUpdateGroup=(e)=>{
        e.preventDefault()
        if(group.id){
            put(route("group.update", group.id),{
                onSuccess:()=>{
                    closeModal()
                    emit("toast.show", `Group "${data.name}" was updated`)
                },
            })
            return 
        }
        post(route("group.store"),{
            onSuccess:()=>{
                emit("toast.show", `Group "${data.name}" was created`)
            }
        })
    }
    const closeModal=()=>{
        reset()
        onclose()
    }
    useEffect(()=>{
        return on("GroupModal.show",(group)=>{
            setData({
                name:group.name,
                details:group.details,
                user_ids:group.users
                .filter((u)=>group.admin_id!==u.id)
                .map((u)=>u.id)
            })
            setGroup(group)
        })
    }, [on])
  return (
    <Modal show={show} onClose={closeModal}>
        <form
        onSubmit={createOrUpdateGroup}
        className='p-6 overflow-y-auto'>
            <h2 className='text-xl font-medium text-gray-900 dark:text-gray-100'>
                {group.id
                ?`Edit Group "${group.name}`
                :"Create new Group"}
            </h2>
            <div className='mt-8'>
                <InputLabel htmlfor="name" value="Name"/>
                <TextInput 
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                disabled={!!group.id}
                onChange={(e)=>setData("name", e.target.value)}
                required
                isFocused/>
                <InputError className='mt-2' message={errors.name}/>
            </div>
            <div className='mt-4'>
                <InputLabel htmlfor="details" value="Details"/>
                <TextAreaInput 
                id="details" 
                rows="3" 
                className="mt-1 block w-full"
                value={data.details || ""}
                onChange={(e)=> setData("details", e,target.value)}/>
                 <InputError className='mt-2' message={errors.details}/>
            </div>
            <div className='mt-4'>
                <InputLabel value="Select Users"/>
                <UserPicker 
                value={
                    users.filter(
                        (u)=>
                            group.admin_id!==u.id &&
                            data.user_ids.includes(u.id)
                    ) || []

                }
                options={users}
                onSelect={(users)=>
                    setData(
                        "user_ids",
                        users.map((u)=>u.id)
                    )
                }/>
                 <InputError className='mt-2' message={errors.user_ids}/>
            </div>
            <div className='mt-6 flex justify-end'>
                <SecondaryButton onClick={closeModal}>
                    cancel
                </SecondaryButton>
            </div>
        </form>
    </Modal>
  )
}
