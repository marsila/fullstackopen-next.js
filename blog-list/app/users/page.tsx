import Link from 'next/link'
import { getUsers } from '../services/users'

export default async function Users(){
    const users = await getUsers()
    return(
        <div>
            <h2>Users</h2>
            <ul className="divide-y divide-gray-100">
                {users.map(user => 
                    <li key={user.id}>
                        <Link href={`/users/${user.username}`} className='font-medium text-gray-800 font-sans hover:font-semibold'>{user.name}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}