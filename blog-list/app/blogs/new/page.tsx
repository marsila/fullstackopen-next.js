"use client"
import { useActionState } from "react";
import { createBlog } from "@/app/actions/blogs";

export default function NewBlog(){
    const [state, formAction] = useActionState(createBlog,{error:''})
    return(
        <div>
            <h1>Create a new blog</h1>
            <form action={formAction}>
                <div>
                    <label htmlFor="title">
                        Title <input type="text" name="title" id="title" minLength={5} required/>
                    </label>
                </div>
                <div>
                    <label htmlFor="author">
                        Author <input type="text" name="author" id="author"  minLength={5} required/>
                    </label>
                </div>
                <div>
                    <label htmlFor="url">
                        URL <input type="text" name="url" id="url" minLength={5} required/>
                    </label>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
                <div>
                    {state.error && <p style={{color:'red'}}>{state.error}</p>}
                </div>
            </form>
        </div>
    )
} 