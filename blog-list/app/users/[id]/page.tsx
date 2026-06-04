import { getUserById } from "@/app/services/users"
import { notFound } from "next/navigation"


export default async function userPage({params} :{params:Promise<{id?:string}>}){
    const {id} = await params
    const user = await getUserById(Number(id))
    if(!user){
        notFound()
    }
    return(
        <div>
            <h3>{user.name}</h3>
            <p>User Name : {user.username}</p>
        </div>
    )
}