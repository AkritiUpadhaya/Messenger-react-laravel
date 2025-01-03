import { MicrophoneIcon, StopCircleIcon } from '@heroicons/react/16/solid'
import React, { useState } from 'react'

const AudioRecorder = ({fileReady}) => {
    const[recording, setRecording]= useState(false)
    const[mediaRecorder, setMediaRecorder]= useState(null)
    const onMicrophoneClick= async()=>{
        if(recording){
            setRecording(false)
            if(mediaRecorder){
                mediaRecorder.stop()
                setMediaRecorder(null)
            }
            return
        }
        setRecording(true)
        try{
             const stream= await navigator.mediaDevices.getUserMedia({
                audio:true
             })
             const newMediaRecorder= new MediaRecorder(stream)
             const chunks= []
             newMediaRecorder.addEventListener('dataavailable', (Event)=>{
                chunks.push(Event.data)
             })
             newMediaRecorder.addEventListener('stop',()=>{
                let audioBlob= new Blob(chunks,{
                    type:'audio/ogg; codecs=opus'
                })
                let audioFile= new File([audioBlob],"recorded_audio.ogg",{
                    type:'audio/ogg; codecs=opus'
                })
                const url= URL.createObjectURL(audioFile)
                fileReady(audioFile, url)
             })
             newMediaRecorder.start()
             setMediaRecorder(newMediaRecorder)
        }catch(error){
            setRecording(false)
            console.error('error accesing microphone:', error)
        }
    }
  return (
    <>
    <button className='p-1 text-gray-400 hover:text-gray-200'
    onClick={onMicrophoneClick}>
        {recording && <StopCircleIcon className='w-6 text-gray-500'/>}
        {!recording && <MicrophoneIcon className='w-6 '/>}
    </button>
    </>
  )
}

export default AudioRecorder
