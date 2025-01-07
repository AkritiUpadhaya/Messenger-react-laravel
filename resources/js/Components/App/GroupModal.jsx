import { useEventBus } from '@/EventBus'
import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import InputLabel from '../InputLabel'

export default function GroupModal({show, onCLose=()=>{}}) {
    const page= usePage()
    const conversation= page.props.conversation
    const {on, emit}= useEventBus()
    const [group, setGroup]= useState({})
    const {data, setData, processing, reset, post, put, errors}= useForm({
        id:"",
        name:"",
        details:"",
        user_ids:[]
    })
    const users= conversation.filter((c)=>!c.is_group)
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
            </div>
        </form>
    </Modal>
  )
}
