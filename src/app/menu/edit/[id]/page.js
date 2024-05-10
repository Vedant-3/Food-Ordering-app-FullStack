'use client'
import DeleteButton from "@/components/DeleteButton";
import Right from "@/components/icons/Right";
import MenuItemForm from "@/components/layout/MenuItemForm";
import Usertabs from "@/components/layout/Usertabs";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";

export default function EditMenuItemPage() {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [redirecting, setRedirecting] = useState(false);
    const { id } = useParams();
    const [menuItem, setMenuItem] = useState(null);

    const [updated, setUpdated] = useState(false);
    const [isSaving, setSaving] = useState(false);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item);
            })
        })
    }, []);

    async function handleSubmit(ev, data) {
        ev.preventDefault();
        setUpdated(false);
        setSaving(true);
        data = { ...data, _id: id };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            setSaving(false);
            if (response.ok) {
                resolve();
                setUpdated(true);
            }
            else {
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Saving new item!!!',
            success: 'Saved',
            error: 'Error countered!!',
        });

        // setRedirecting(true);
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


    async function handleDelete() {
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/menu-items?_id=' + id, {
                method: 'DELETE'
            })
            if (res.ok) {
                resolve();
            }
            else {
                reject();
            }
        })
    }

    if (redirecting) {
        return redirect('/menu');
    }

    if (loading) {
        return 'Loading...'
    }
    if (!data.admin) {
        return 'Not an Admin!! Access Denied!!'
    }

    return (
        <section className="mt-8">
            <Usertabs isAdmin={true} />
            <div className='max-w-md mx-auto mb-6'>
                {updated && (<SuccessBox>MenuItem Updated!!</SuccessBox>)}
                {isSaving && (<InfoBox>Saving...</InfoBox>)}
            </div>
            <div className='max-w-md mx-auto'>
                <Link className='button' href={'/menu'}>Show all Menu Items <Right /></Link>
            </div>
            <MenuItemForm menuItem={menuItem} onSubmit={handleSubmit} />
            <div className="max-w-xl  mx-auto mt-4 ">
                <div className="border rounded-xl border-gray-400">
                    <DeleteButton label={'Delete'} onDelete={handleDelete} />
                    {/* <button onClick={handleDelete}>Delete</button> */}
                </div>
            </div>
        </section>
    )
}