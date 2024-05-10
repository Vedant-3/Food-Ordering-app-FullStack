'use client'
import Image from'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {signIn} from "next-auth/react";
export default function RegisterPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userCreated, setUserCreated] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const [error, setError] = useState(false);

    async function handleSubmit(ev){
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers: { 'Content-Type': 'application/json' }
        })
        if(response.ok){
            setUserCreated(true);
        }
        else{
            setError(true);
        }
        setCreatingUser(false);
    }

    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
            {userCreated && (
                <div className='my-4 text-center'>
                    User Created !!<br /> Now you can{' '} <Link className='underline' href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className='my-4 text-center'>
                    An Error has occured<br /> Please try again ...
                </div>
            )} 
            <form className="block max-w-xl mx-auto" onSubmit={handleSubmit}>
                <input disabled={creatingUser} type="email" placeholder="Enter email" value={email} onChange={ev => setEmail(ev.target.value)}></input>
                <input disabled={creatingUser} type="password" placeholder="Enter password" value={password} onChange={ev => setPassword(ev.target.value)}></input>
                <button disabled={creatingUser} type="submit">Register</button>
                <div className="my-4 text-center text-gray-500">or login with provider</div>
                <button onClick={()=> signIn('google',{callbackUrl:'/'})} className='flex gap-4 justify-center'>
                    <Image src={'/google.png'} alt='' width={24} height={24}></Image>
                    Login with Google
                </button>
                <div className='my-4 text-gray-500 '>
                    Existing Account?{' '} <Link className='underline' href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>


        </section>
    )
}