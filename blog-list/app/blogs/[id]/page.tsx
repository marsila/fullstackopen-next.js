import { increaseLikes } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";

export default async function BlogPage({params} : {params:Promise<{id?:string}>}){
    const {id} = await params
    if (isNaN(Number(id))) {
    notFound(); 
  }
    const blog = await getBlogById(Number(id))
    if(!blog){
        notFound()
    }
    return(
        <div className="m-3 flex flex-col space-y-1 font-semibold text-gray-700">
            <p><i className="text-blue-900 font-semibold pr-2">title:</i>{blog.title}</p>
            <p><i className="text-blue-900 font-semibold pr-2">author:</i>{blog.author}</p>
            <p><i className="text-blue-900 font-semibold pr-2">url:</i>{blog.url}</p>
            <p><i className="text-blue-900 font-semibold pr-2">likes:</i>{blog.likes}</p>
            <form action={increaseLikes}>
                <input type="hidden" name="id" value={blog.id}/>
                <button type="submit" className="rounded-md bg-blue-500 text-blue-50 px-4 py-1">Like</button>
            </form>
        </div>
    )
}