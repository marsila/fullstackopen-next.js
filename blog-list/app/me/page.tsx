import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/sessions";
import { createToken } from "../actions/users";
import { getReadingListByStatus } from "../services/readingList";
import { markBlogAsRead } from "../actions/readingList";
import Link from "next/link";

export default async function MyPage() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }

  const readBlogs = await getReadingListByStatus(user?.id,true);
  const unreadBlogs = await getReadingListByStatus(user?.id,false);
  return (
    <div className="flex justify-center">
      <div className="container">
        <div>
          <h1>My profile</h1>
          <div>
            <p>
              <span className="font-semibold text-gray-600 mr-2">Name:</span>
              {user.name}
            </p>
            <p>
              <span className="font-semibold text-gray-600 mr-2">
                Username:
              </span>
              {user.username}
            </p>
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-400 border-0 w-3/4"></hr>
        <div>
          <h1>Reading List</h1>
          <div>
            <h2>Unread({unreadBlogs.length || 0})</h2>
            <ul>
              <form action={markBlogAsRead}>
                {unreadBlogs.length > 0 &&
                  unreadBlogs.map((unread) => (
                    <li key={unread.id} className="flex justify-between rounded-b-lg m-2 p-2 bg-amber-50">
                      <Link href={`/blogs/${unread.blogId}`}>{unread.blogs.title} </Link>
                      <input type="hidden" name="readId" value={unread.id}/>
                      <button type="submit" className="rounded-md bg-green-700 text-green-50 px-4 py-1">mark as read</button>
                    </li>
                  ))}
              </form>
            </ul>
          </div>
          <div>
            <h2>Read({readBlogs.length || 0})</h2>
            <ul>
              {readBlogs.length > 0 &&
                readBlogs.map((read) => (
                  <li key={read.id} className="bg-green-50 rounded-b-lg p-3 m-2"><Link  href={`/blogs/${read.blogId}`}>{read.blogs.title}</Link></li>
                ))}
            </ul>
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-400 border-0 w-3/4"></hr>
        <div>
          <h1>API token</h1>
          <form action={createToken} className="bg-gray-50 p-3 rounded-lg">
            <label htmlFor="token">
              Current token
              <input
                className="w-2/3 text-gray-700"
                type="text"
                name="token"
                id="token"
                readOnly
                defaultValue={user.token || ""}
              />
            </label>
            <button className="submit-btn">Generate token</button>
          </form>
        </div>
      </div>
    </div>
  );
}
