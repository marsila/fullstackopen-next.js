'use server'
import {redirect} from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, updateBlog } from '../services/blogs'
import { auth } from '../auth'
import { addToReadBlog, isInReadingList } from '../services/readingList'
import { getCurrentUser } from '../services/sessions'

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
    };
    success:boolean
}
export const createBlog = async( prevState: BlogFormState,formData :FormData) => {
    const session = await auth()
    if(!session){
        return redirect('/login')
    }
    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const url = formData.get('url') as string
    const errors: BlogFormState['errors'] = {title:'',author:'',url:''};

    if(!title || title.length < 5){errors.title = "Title must be at least 5 characters long"}
    
    if(!author || author.length < 5){errors.author = "Author must be at least 5 characters long"}
    
    if(!url || url.length < 5){errors.url ="URL must be at least 5 characters long"}

    if (errors.title || errors.author || errors.url){
        return{errors,values:{title,author,url},success:false}
    }

    await addBlog(title,author,url)
    revalidatePath('/blogs')
    return{errors:{title: '', author: '', url: '' }, values: { title: '', author: '', url: ''},success: true}
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

export const addToReadingList = async(formData:FormData)=>{
    const user = await getCurrentUser()
    if(!user?.id) throw new Error('Unuthorized')
    const blogId = Number(formData.get('blogId'))
    if(! blogId){
        throw new Error("Inavalid ID provider")
    }

    const alreadyAdded = await isInReadingList(user?.id, blogId);
if (!alreadyAdded) {
        await addToReadBlog(user.id,blogId)
    }
    revalidatePath(`/blogs/${blogId}`)
}