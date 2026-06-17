import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/sessions";
import { createToken } from "../actions/users";

export default async function MyPage() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }


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
                defaultValue={ user.token || ""}
              />
            </label>
            <button className="submit-btn">Generate token</button>
          </form>
        </div>
        
      </div>
    </div>
  );
}
