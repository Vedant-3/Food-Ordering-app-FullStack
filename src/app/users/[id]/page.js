'use client'
import UserForm from "@/components/layout/UserForm";
import Usertabs from "@/components/layout/Usertabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import { toast } from "react-toastify";
import Link from "next/link";
import Right from "@/components/icons/Right";


export default function EditUserPage() {

    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);

    const [updated, setUpdated] = useState(false);
    const [isSaving, setSaving] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data);
                setLoading(false);
            });
        })
    }, []);

    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/profile?_id='+id).then(response => {
            response.json().then(user => {
                setUser(user);
            })
        })
    }, []);

    async function handleSubmit(ev, data) {
        ev.preventDefault();
        setUpdated(false);
        setSaving(true);
        fetch('/api/profile', {
            method: 'PUT',
            body: JSON.stringify({ ...data, _id: id }),
            headers: { 'Content-Type': 'application/json' }
        })
        setSaving(false);
        setUpdated(true);
    }



    if (loading) {
        return 'Loading...'
    }
    if (!data.admin) {
        return 'Not an Admin!! Access Denied!!'
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <Usertabs isAdmin={true} />
            <Link href={'/users'} className="button">All Users <Right/></Link>
            <p className="mt-7 text-md font-semibold text-gray-700 italic">Edit User Credentials :</p>
            <div >
                {updated && (<SuccessBox className='max-w-md mx-auto mb-6'>UserProfile Updated!!</SuccessBox>)}
                {isSaving && (<InfoBox className='max-w-md mx-auto mb-6'>Saving...</InfoBox>)}
            </div>
            <div className="mt-1">
                <UserForm user={user} onSave={handleSubmit} />
            </div>

        </section>
    )
}