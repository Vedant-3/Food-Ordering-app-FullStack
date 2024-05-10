'use client'
import Usertabs from "@/components/layout/Usertabs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {

    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data);
                setLoading(false);
            });
        })
    }, []);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            })
        })
    }, [])

    if (loading) {
        return 'Loading...'
    }
    if (!data.admin) {
        return 'Not an Admin!! Access Denied!!'
    }

    return (
        <section className="max-w-lg mx-auto mt-8">
            <Usertabs isAdmin={true} />
            <div className="mt-8">
                {users?.length > 0 && users.map(user => (
                    <div
                        key={user._id}
                        className="bg-gray-200 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                        <div className="grid md:grid-cols-3 gap-4 grow">
                            <div className="text-gray-900">
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">No name</span>)}
                            </div>
                            <span className="text-gray-500">{user.email}</span>
                        </div>
                    


                        <div>
                            <Link className="button" href={'/users/' + user._id}>
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}