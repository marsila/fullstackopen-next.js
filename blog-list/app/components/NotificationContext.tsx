'use client'

import { createContext , useContext, useState} from "react"

type NotificationType = 'success' | 'error'

type NotificationContextType ={
    message : string
    type :  NotificationType
    showNotification : (message: string, type?:NotificationType) => void
}

const NoteficationContext = createContext<NotificationContextType>({
    message :"",
    type: "success",
    showNotification:()=> {},
})

export const NotificationProvider = ({children}:{children: React.ReactNode}) => {
    const [message, setMessage] = useState("")
    const [type, setType] = useState<NotificationType>("success")

    const showNotification = (
        msg: string,
        notifType : NotificationType = "success"
    ) => {
        setMessage(msg)
        setType(notifType)
        setTimeout(()=> setMessage(""), 5000)
    }

    return(
        <NoteficationContext value={{message, type, showNotification}}>
            {children}
        </NoteficationContext>
    )

}

export const useNotification = () => useContext(NoteficationContext)
