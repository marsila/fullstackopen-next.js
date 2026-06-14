"use client"
import { useActionState, useEffect } from "react";
import { BlogFormState, createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";

export default function NewBlog(){
    const initialState : BlogFormState ={
        errors:{title:'', author:'',url:''},
        values:{title:'',author:'', url:''},
        success:false,
    }
    const [state, formAction] = useActionState(createBlog,initialState)
    const {showNotification} = useNotification()
    const router = useRouter()

    useEffect(() => {
        if(state.success){
            showNotification("Blog was created")
            router.push('/blogs')
        }
    },[state, showNotification,router])
    
    return(
        <div className="form-container">
            <h2>Create a new blog</h2>
            <form action={formAction} className="m-2">
                <div className="form-items">
                    <label htmlFor="title">
                        Title <input type="text" name="title" id="title"  required defaultValue={state?.values?.title} />
                    </label>
                </div>
                <div>
                    {state?.errors?.title && <p style={{color:'red', fontWeight:'bold'}}>{state.errors.title}</p>}
                </div>
                <div>
                    <label htmlFor="author">
                        Author <input type="text" name="author" id="author"  required defaultValue={state.values?.author}/>
                    </label>
                </div>
                <div>
                    {state?.errors?.author && <p style={{color:'red',fontWeight:'bold'}}>{state.errors.author}</p>}
                </div>
                <div>
                    <label htmlFor="url">
                        URL <input type="text" name="url" id="url"  defaultValue={state?.values?.url}/>
                    </label>
                </div>
                <div>
                    {state?.errors?.url && <p style={{color:'red', fontWeight:'bold'}}>{state.errors.url}</p>}
                </div>
                <div>
                    <button type="submit" className="submit-btn">Create</button>
                </div>
            </form>
        </div>
    )
} 