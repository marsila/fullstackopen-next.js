import { createBlog } from "@/app/actions/blogs";

export default function NewBlog(){
    return(
        <div>
            <h1>Create a new blog</h1>
            <form action={createBlog}>
                <div>
                    <label htmlFor="title">
                        Title <input type="text" name="title" id="title" />
                    </label>
                </div>
                <div>
                    <label htmlFor="author">
                        Author <input type="text" name="author" id="author" />
                    </label>
                </div>
                <div>
                    <label htmlFor="url">
                        URL <input type="text" name="url" id="url" />
                    </label>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
} 