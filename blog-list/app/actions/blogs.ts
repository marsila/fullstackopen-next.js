'use server'
import {redirect} from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, updateBlog } from '../services/blogs'
import { auth } from '../auth'

export type BlogFormState = {
    errors:{
        title:string;
        author:string;
        url:string;
    };
    values:{
        title:string;
        author:string;
        url:string;
    }
}
export const createBlog = async( prevState: BlogFormState,formData :FormData) => {
    const session = await auth()
    if(!session){
        return redirect('/login')
    }
    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const url = formData.get('url') as string
    const errors: BlogFormState['errors'] = {};

    if(!title || title.length < 5){errors.title = "Title must be at least 5 character long"}
    
    if(!author || author.length < 5){errors.author = "Author must be at least 5 character long"}
    
    if(!url || url.length < 5){errors.url ="URL must be at least 5 character long"}

    if(Object.keys(errors).length>0){
        return{errors,values:{title,author,url}}
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
