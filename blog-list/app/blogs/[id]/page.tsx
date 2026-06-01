import { increaseLikes } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";

export default async function BlogPage({params} : {params:Promise<{id?:string}>}){
    const {id} = await params
    const blog = getBlogById(Number(id))
    if(!blog){
        notFound()
    }
    return(
        <div>
            <p><i>title:</i><strong>{blog.title}</strong></p>
            <p><i>author:</i><strong>{blog.author}</strong></p>
            <p><i>url:</i><strong>{blog.url}</strong></p>
            <p><i>likes:</i><strong>{blog.likes}</strong></p>
            <form action={increaseLikes}>
                <input type="hidden" name="id" value={blog.id}/>
                <button type="submit">Like</button>
            </form>
        </div>
    )
}