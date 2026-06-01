import { getBlogs } from "../services/blogs";
import Link from "next/link";
export default function Blogs() {
  const blogs = getBlogs();
  return (
    <div>
      <h1>Blogs List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {" "}
              {blog.title}
            </Link>{" "}
            By /{blog.author}/ Blog has {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  );
}
