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
            <h1>{user.name}</h1>
            <p>User Name : {user.username}</p>
            <h2>Blogs</h2>
            <ul className="flex-col space-y-2">
                {user.blogs.map(blog => (
                    <li key={blog.id}>
                        <Link href={`/blogs/${blog.id}`} className="blog-title">{blog.title}</Link>
                        {' '}By <span className="text-blue-900 font-semibold">{blog.author}</span> has {blog.likes} likes
                    </li>
                ))}
            </ul>
        </div>
    )
}