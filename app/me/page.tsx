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

  const readBlogs = await getReadingListByStatus(user?.id, true);
  const unreadBlogs = await getReadingListByStatus(user?.id, false);
  return (
    <div className="flex justify-center">
      <div className="container" data-testid="user-profile">
        <div>
          <h1>My profile</h1>
          <div>
            <p data-testid="user-name">
              <span className="font-semibold text-gray-600 mr-2">Name:</span>
              {user.name}
            </p>
            <p data-testid="user-username">
              <span className="font-semibold text-gray-600 mr-2">
                Username:
              </span>
              {user.username}
            </p>
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-400 border-0 w-3/4"></hr>
        <div data-testid="reading-list-section">
          <h1>Reading List</h1>
          {unreadBlogs.length === 0 && readBlogs.length == 0 && (
            <div data-testid="empty-reading-list" className="text-red-500">
              Your reading list is empty!
            </div>
          )}

          <div data-testid="unread-section">
            <h2>
              Unread:{" "}
              {unreadBlogs.length || (
                <span data-testid="no-unread-blogs"> No unread blogs</span>
              )}
            </h2>
            <ul>
              <form action={markBlogAsRead}>
                {unreadBlogs.length > 0 &&
                  unreadBlogs.map((unread) => (
                    <li
                      key={unread.id}
                      className="flex justify-between rounded-b-lg m-2 p-2 bg-amber-50"
                    >
                      <Link href={`/blogs/${unread.blogId}`}>
                        {unread.blogs.title}{" "}
                      </Link>
                      <input type="hidden" name="readId" value={unread.id} />
                      <button
                        type="submit"
                        className="rounded-md bg-green-700 text-green-50 px-4 py-1"
                        data-testid="mark-read-"
                      >
                        mark as read
                      </button>
                    </li>
                  ))}
              </form>
            </ul>
          </div>
          <div data-testid="read-section">
            <h2>
              Read:{" "}
              {readBlogs.length || (
                <span data-testid="no-read-blogs"> No read blogs</span>
              )}
            </h2>
            <ul>
              {readBlogs.length > 0 &&
                readBlogs.map((read) => (
                  <li
                    key={read.id}
                    className="bg-green-50 rounded-b-lg p-3 m-2"
                  >
                    <Link href={`/blogs/${read.blogId}`}>
                      {read.blogs.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-400 border-0 w-3/4"></hr>
        <div data-testid="api-token-section">
          <h1>API token</h1>
          {!user.token && (
            <div data-testid="no-token-message" className="text-red-600">
              No token genrated yet
            </div>
          )}
          <form action={createToken} className="bg-gray-50 p-3 rounded-lg">
            {user.token && (
              <div data-testid="token-display">
                Current token:{" "}
                <code
                  className="bg-gray-200 p-1 rounded"
                  data-testid="api-token"
                >
                  {user.token}
                </code>
              </div>
            )}
            <button className="submit-btn" data-testid="generate-token-button">
              Generate token
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
