import React, { Children } from "react";
export const EventBusContext= React.createContext()
export const EventBusProvider= ({Children})=>{
    const[events, setEvents]= React.useState({})
    const emit= (name, data)=>{
        if(events[name]){
            for(let cb of events[name]){
                cb(data)
            }
        }
    }
    const on = (name, cb)=>{
        if(!events[name]){
            events[name]=[]
        }
        events[name].push(cb)
        return ()=>{
            events[name]= events[name].filter((callback)=>callback !==cb)
        }
    }
    return(
        <EventBusContext.Provider value={{emit, on}}>
            {Children}
        </EventBusContext.Provider>
    )
}
export const useEventBus=()=>{
    return React.useContext(EventBusContext)
}