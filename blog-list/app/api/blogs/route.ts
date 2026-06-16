import { addBlog, getBlogs } from "@/app/services/blogs"
import { NextRequest, NextResponse } from "next/server"
import {auth} from '../../auth'
import { revalidatePath } from "next/cache"

export const GET = async() => {
    const blogs = await getBlogs()
    return NextResponse.json(blogs)
}

export const POST = async(req:NextRequest) => {
    const session = await auth()
    if(!session) {
        return NextResponse.json({error:'Unauthorized'},{status:401})
    }

    const body = await req.json()
    const {title, author, url} = body

    if(!title || title.length< 4 ){
        return NextResponse.json({error: "title must be at least 4 characters"}, {status:400})
    }
    if(!author || author.length< 4 ){
        return NextResponse.json({error: "author must be at least 4 characters"}, {status:400})
    }
    if(!url || url.length< 4 ){
        return NextResponse.json({error: "url must be at least 4 characters"}, {status:400})
    }
    await addBlog(title,author,url)
    revalidatePath('/blogs')
    return NextResponse.json({success: true},{status:200})
}