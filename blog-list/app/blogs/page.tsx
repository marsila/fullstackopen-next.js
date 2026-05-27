import { getBlogs } from "../services/blogs";

export default function Blogs() {
  const blogs = getBlogs();
  return (
    <div>
      <h1>Blogs List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {" "}
              {blog.title}
            </a>{" "}
            By /{blog.author}/ Blog has {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  );
}
