"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <nav className="relative bg-gray-800 mx-auto px-2">
      <div className="menu-items">
        <div className="inset-y-0 left-0 flex items-center space-x-1 gap-2" >
          <Link href="/" className="hover:bg-black p-2 rounded-2xl">Home</Link>
        <Link href="/users" className="hover:bg-black p-2 rounded-2xl">Users</Link>
        <Link href="/blogs" className="hover:bg-black p-2 rounded-2xl">Blogs</Link>
        {session && <Link href="/blogs/new" className="hover:bg-black p-2 rounded-2xl">Create Blog</Link>}
        </div>
        
        {session ? (
          <>            
            <div className="right-0 mx-3 flex items-center">
              <em>{session.user?.name} is logged in</em>
              <button
                className="rounded-full bg-amber-100 text-black p-2 mx-1"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="right-0 px-2 flix space-x-1">
            <Link href="/login" className="hover:bg-black p-2 rounded-2xl">Login</Link>{'/ '}
            <Link href="/register" className="hover:bg-black p-2 rounded-2xl">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
