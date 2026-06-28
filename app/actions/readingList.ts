'use server'
import { addToReadBlog, isInReadingList, markAsRead } from '../services/readingList'
import { getCurrentUser } from '../services/sessions'
import { revalidatePath } from 'next/cache'


export const addToReadingList = async(formData:FormData)=>{
    const user = await getCurrentUser()
    if(!user?.id) throw new Error('Unuthorized')
    const blogId = Number(formData.get('blogId'))
    if(! blogId){
        throw new Error("Invalid ID provider")
    }

    const alreadyAdded = await isInReadingList(user?.id, blogId);
if (!alreadyAdded) {
        await addToReadBlog(user.id,blogId)
    }
    revalidatePath(`/blogs/${blogId}`)
}

export const markBlogAsRead = async (formData:FormData) => {
    const readId = Number(formData.get('readId')) 
    if(!readId){
        throw new Error('Invalid ID provider')
    }
    await markAsRead(readId)
    revalidatePath('/me')
}