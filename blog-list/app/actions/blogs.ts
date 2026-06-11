'use server'
import {redirect} from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, updateBlog } from '../services/blogs'
import { auth } from '../auth'

export const createBlog = async( formData :FormData) => {
    const session = await auth()
    if(!session){
        return redirect('/login')
    }
    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const url = formData.get('url') as string
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
