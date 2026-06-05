import { getUserWithBlogs } from "@/app/services/users"
import { notFound } from "next/navigation"
import Link from "next/link"


export default async function userPage({params} :{params:Promise<{username?:string}>}){
    const {username} = await params
    if(!username){
        notFound()
    }
    const user = await getUserWithBlogs(username)

    if(!user){
        notFound()
    }
    return(
        <div>
            <h3>{user.name}</h3>
            <p>User Name : {user.username}</p>
            <h3>Blogs</h3>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}><Link href={`/blogs/${blog.id}`}>{blog.title}</Link>{' '}By /{blog.author}/ - has {blog.likes} likes</li>
                ))}
            </ul>
        </div>
    )
}