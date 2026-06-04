import { getBlogs } from "../services/blogs";
import Link from "next/link";
export default async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const  {filter}  = await searchParams;
  

  const blogs = await getBlogs(filter);
  return (
    <div>
      <h1>Blogs List</h1>
      <form action="/blogs">
        <label htmlFor="filter">
          Filter blogs by title{"  "}
          <input type="text" name="filter" id="filter" defaultValue={filter} />
        </label>
        <button type="submit">Filter</button>
      </form>
      <Link href="/blogs">Clear the search</Link>
      {blogs.length === 0 ? (
        <div>
          <h2>No blogs found matching your filter {filter || "None"}</h2>
        </div>
      ) : (
        <ul>
          {blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog) => (
              <li key={blog.id}>
                <Link href={`/blogs/${blog.id}`}> {blog.title}</Link> By /
                {blog.author}/ Blog has {blog.likes} likes
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
//this forces next.js to refresh data every time the page is visited
export const dynamic = "force-dynamic";
