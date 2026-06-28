import { increaseLikes } from "@/app/actions/blogs";
import { addToReadingList } from "@/app/actions/readingList"
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/app/services/sessions";
import { isInReadingList } from "@/app/services/readingList";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  if (isNaN(Number(id))) {
    notFound();
  }
  const blog = await getBlogById(Number(id));
  if (!blog) {
    notFound();
  }

  const user = await getCurrentUser();
  const inList = await isInReadingList(Number(user?.id), blog.id);
  return (
    <div className="flex justify-center">
      <div className="container space-y-4" data-testid="blog-detail">
        <h1 data-testid="blog-title"> {blog.title}</h1>
        <p data-testid="blog-author"> by {blog.author}</p>
        <Link href={blog.url} className="text-blue-900 font-semibold my-5">
          {blog.url}
        </Link>
        <div className="flex justify-baseline space-x-3 my-4">
          likes: {blog.likes}
          <form action={increaseLikes}>
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              className="rounded-md bg-blue-700 text-blue-50 px-4 py-1 mx-4"
            >
              Like
            </button>
          </form>
          {user &&
            (inList ? (
              <span className="rounded-md bg-green-700 text-green-50 px-4 py-1">
                Is added to the reading List
              </span>
            ) : (
              <form action={addToReadingList}>
                <input type="hidden" name="blogId" value={blog.id} />
                <button
                  type="submit"
                  className="rounded-md bg-green-700 text-green-50 px-4 py-1"
                  data-testid="add-to-reading-list-button"
                >
                  add to reading list
                </button>
              </form>
            ))}
        </div>
      </div>
    </div>
  );
}
