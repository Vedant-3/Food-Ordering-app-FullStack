'use client'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import Usertabs from "@/components/layout/Usertabs";
import UserForm from "@/components/layout/UserForm";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const session = useSession();

    // const [name, setName] = useState('');
    const [updated, setUpdated] = useState(false);
    const [isSaving, setSaving] = useState(false);
    // const [address, setAddress] = useState("");
    // const [city, setCity] = useState("");
    // const [pincode, setPincode] = useState("");
    // const [phone, setPhone] = useState('');
    const [isAdmin, setAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const [user, setUser] = useState(null);

    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('api/profile').then(response => {
                response.json().then(data => {
                    setUser(data);
                    setAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }
    }, [status, session]);

    if (status === 'loading' || !profileFetched) {
        return 'Loading...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    async function handleProfileupdate(ev, data) {
        ev.preventDefault();
        setUpdated(false);
        setSaving(true);
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setSaving(false);
            if (response.ok) {
                resolve();
                setUpdated(true);
            }
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
        });


    }
    return (
        <section className="mt-8">
            <Usertabs isAdmin={isAdmin} />
            <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
            <div className="max-w-xl mx-auto">
                <div className='mb-4'>
                    {updated && (<SuccessBox>Profile Updated!!</SuccessBox>)}
                    {isSaving && (<InfoBox>Saving...</InfoBox>)}
                </div>
                <UserForm user={user} onSave={handleProfileupdate} />
            </div>
        </section>
    )
}