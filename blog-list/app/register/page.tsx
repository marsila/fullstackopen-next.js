import { registerUser } from "../actions/users"
export default function RegisterPage(){
    return(
        <div>
            <h2>Register</h2>
            <form action={registerUser}>
                <div>
                    <label htmlFor="username">Username
                        <input type="text" name="username" id="username" required/>
                    </label>
                </div>
                <div>
                    <label htmlFor="name">Name
                        <input type="text" name="name" id="name" required/>
                    </label>
                </div>
                <div>
                    <label htmlFor="password">Password
                        <input type="password" name="password" id="password" required/>
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}