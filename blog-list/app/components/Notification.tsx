'use client'

import { useNotification } from "./NotificationContext"

export default function Notification(){
    const {message, type} = useNotification()
    if(!message){
        return null
    }
    const style :React.CSSProperties ={
        backgroundColor : type === 'success'? '#16a34a' :'#dc2626'
    }
    return(
        <div style={style} className="text-amber-50 m-2 p-2 rounded-lg">{message}</div>
    )    
}