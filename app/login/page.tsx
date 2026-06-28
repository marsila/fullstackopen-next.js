'use client'

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState('')
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const result = await signIn("credentials",{
            username : formData.get("username"),
            password : formData.get('password'),
            redirect: false
        })
        if (result?.error) {
            setError("Invalid username or password")
        } else {
            router.push('/')
            router.refresh()
        }
    }
    return(
        <div className="form-container">
            <h2>Login</h2>
            {error && <p style= {{color: 'red'}} data-testid="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username
                        <input type="text" name="username" id="username" required/>
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input type="password" name="password" id="password" required/>
                    </label>
                </div>
                <button type="submit" className="submit-btn" data-testid="login-button">Login</button>
            </form>
        </div>
    )
}