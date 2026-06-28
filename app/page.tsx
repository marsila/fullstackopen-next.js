import Homepage from "./homepage.mdx";
import { getCurrentUser } from "./services/sessions";

export default async function Home() {
  const currentUser = await getCurrentUser()
  return (
    <div className="markdown">
      {currentUser &&  (
        <div className="text-amber-50 m-2 p-2 rounded-lg bg-green-600" 
          data-testid="notification">
          Successfully logged in
        </div>
      )}
      <Homepage />
    </div>
  );
}
