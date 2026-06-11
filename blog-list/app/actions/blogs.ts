'use server'
import {redirect} from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, updateBlog } from '../services/blogs'
import { auth } from '../auth'

export const createBlog = async( prevState: {error:string},formData :FormData) => {
    const session = await auth()
    if(!session){
        return redirect('/login')
    }
    const title = formData.get('title') as string
    if(!title || title.length < 5){
        return{error : "Title must be at least 5 character long"}
    }
    const author = formData.get('author') as string
    if(!author || author.length < 5){
        return{error : "Author must be at least 5 character long"}
    }
    const url = formData.get('url') as string
    if(!url || url.length < 5){
        return{error : "URL must be at least 5 character long"}
    }
    await addBlog(title,author,url)
    revalidatePath('/blogs')
    redirect('/blogs')
}

export const increaseLikes = async(formData: FormData) => {
    const id = Number(formData.get('id'))
    if (isNaN(id)) {
        throw new Error("Invalid ID provided");
    }
    await updateBlog(id)
    revalidatePath(`/blogs/${id}`);
    revalidatePath('/blogs');
}
