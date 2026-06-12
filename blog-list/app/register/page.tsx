'use client'

import { useActionState } from "react"
import { RegisterFormState, registerUser } from "../actions/users"
export default function RegisterPage(){
    const initialState :RegisterFormState ={
        errors:{username:'',name:'',password:''},
        values:{username:'', name:''}
    }
    const [state,formAction] = useActionState(registerUser,initialState)
    return(
        <div>
            <h2>Register</h2>
            <form action={formAction}>
                <div>
                    <label htmlFor="username">Username
                        <input type="text" name="username" id="username" defaultValue={state?.values?.username}/>
                    </label>
                </div>
                <div>
                    {state?.errors?.username && <p style={{color:'red', fontWeight:'bold'}}>{state?.errors?.username}</p>}
                </div>
                <div>
                    <label htmlFor="name">Name
                        <input type="text" name="name" id="name" defaultValue={state?.values?.name}/>
                    </label>
                </div>
                <div>
                    {state?.errors?.name && <p style={{color:'red', fontWeight:'bold'}}>{state?.errors?.name}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password
                        <input type="password" name="password" id="password" required/>
                    </label>
                </div>
                <div>
                    <label htmlFor="password">Confirm Password
                        <input type="password" name="confirmPassword" id="confirmPassword" required/>
                    </label>
                </div>
                <div>
                    {state?.errors?.password && <p style={{color:'red', fontWeight:'bold'}}>{state?.errors?.password}</p>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}