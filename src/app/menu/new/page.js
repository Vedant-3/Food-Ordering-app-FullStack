'use client'
import Right from "@/components/icons/Right";
import MenuItemForm from "@/components/layout/MenuItemForm";
import Usertabs from "@/components/layout/Usertabs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function NewMenuItemPage() {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [redirecting,setRedirecting] = useState(false);

    async function handleSubmit(ev,data){
        ev.preventDefault();
        console.log(data);
        const savingPromise = new Promise(async (resolve,reject)=>{
            const response = await fetch('/api/menu-items',{
                method:'POST',
                body: JSON.stringify(data),
                headers:{'Content-Type':'application/json'}
            })
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
        });

        await toast.promise(savingPromise,{
            loading:'Saving new item!!!',
            success:'Saved',
            error:'Error countered!!',
        });

        setRedirecting(true);
    }

    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data);
                setLoading(false);
            });
        })
    }, []);

    if(redirecting){
        return redirect('/menu');
    }

    if(loading){
        return 'Loading...'
    }
    if(!data.admin){
        return 'Not an Admin!! Access Denied!!'
    }

    return (
        <section className="mt-8">
            <Usertabs isAdmin={true} />
            <div className='max-w-md mx-auto'>
                <Link className='button' href={'/menu'}>Show all Menu Items <Right/></Link>
            </div>
            <MenuItemForm onSubmit={handleSubmit} menuItem={null}/>
        </section>
    )
}



