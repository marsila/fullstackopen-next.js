"use client"
import { useActionState } from "react";
import { BlogFormState, createBlog } from "@/app/actions/blogs";

export default function NewBlog(){
    const initialState : BlogFormState ={
        errors:{title:'', author:'',url:''},
        values:{title:'',author:'', url:''}
    }
    const [state, formAction] = useActionState(createBlog,initialState)
    return(
        <div>
            <h1>Create a new blog</h1>
            <form action={formAction}>
                <div>
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
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
} 