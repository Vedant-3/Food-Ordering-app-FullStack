'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {signIn} from "next-auth/react";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[loginInProgress,setLoginInProgress] = useState(false);

    async function handleSubmit(ev){
        ev.preventDefault();
        setLoginInProgress(true);

        await signIn('credentials',{email,password,callbackUrl:'/'});

        setLoginInProgress(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
            <form className='block max-w-xl mx-auto' onSubmit={handleSubmit}>
                <input disabled={loginInProgress} type="email" name='email' placeholder="Enter email" value={email} onChange={ev => setEmail(ev.target.value)}></input>
                <input disabled={loginInProgress} type="password" name='password' placeholder="Enter password" value={password} onChange={ev => setPassword(ev.target.value)}></input>
                <button disabled={loginInProgress} type='submit'>Login</button>
                <div className="my-4 text-center text-gray-500">or login with provider</div>
                <button type='button' onClick={()=> signIn('google',{callbackUrl:'/'})} className='flex gap-4 justify-center'>
                    <Image src={'/google.png'} alt='' width={24} height={24}></Image>
                    Login with Google
                </button>
            </form>
        </section>
    )
}