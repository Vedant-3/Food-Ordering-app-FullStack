'use client';
import DeleteButton from "@/components/DeleteButton";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import Usertabs from "@/components/layout/Usertabs";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export default function CategoriesPage() {
    const [isAdmin, setAdmin] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState('');
    const [editedCategory, setEditedCategory] = useState(null);

    const [updated, setUpdated] = useState(false);
    const [isSaving, setSaving] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);
    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            })
        })
    }

    useEffect(() => {
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setAdmin(data.admin);
            })
        })
    }, []);

    if (!isAdmin) {
        return 'Access Denied !! Not an Admin!!';
    }

    async function handleCategory(ev) {
        ev.preventDefault();
        setUpdated(false);
        setSaving(true);
        const creationpromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName };
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            setSaving(false);
            if (response.ok) {
                resolve();
                setUpdated(true);
            }
            else {
                reject();
            }
        })
        await toast.promise(creationpromise, {
            loading: editedCategory ? 'Updating Category...' : 'Creating New Category...',
            success: editedCategory ? 'Category Updated!!' : 'New Category created!!',
            error: 'Error countered!! Try again',
        })
    }
    async function handleDelete(_id) {
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/categories?_id=' + _id, {
                method: 'DELETE'
            })
            if (res.ok) {
                resolve();
            }
            else {
                reject();
            }
        })
        fetchCategories();
    }
    return (
        <section className="mt-8 max-w-lg mx-auto">
            <Usertabs isAdmin={true} />
            <div className='mb-4'>
                {updated && (<SuccessBox>Category Updated!!</SuccessBox>)}
                {isSaving && (<InfoBox>Saving...</InfoBox>)}
            </div>
            <form className="" onSubmit={handleCategory}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update Category' : 'Add new Category'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text" value={categoryName} onChange={ev => setCategoryName(ev.target.value)}></input>
                    </div>
                    <div className="pb-2 flex gap-1">
                        <button type="submit">{
                            editedCategory ? 'Update' : 'Create'
                        }</button>
                        <button type="button" onClick={() => {
                            setEditedCategory(null)
                            setCategoryName('')
                        }}>Cancel</button>
                    </div>
                </div>
            </form>

            <div>
                <h2 className="mt-8">Existing Category:</h2>
                {categories.length > 0 && categories.map(c => (
                    <div key={c.name} className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1 mb-2">
                        <div className="grow cursor-pointer">{c.name}</div>
                        <div className="flex gap-1">
                            <button onClick={() => {
                                setEditedCategory(c);
                                setCategoryName(c.name);
                            }} type="button">Edit</button>
                            <DeleteButton label='Delete' onDelete={() => handleDelete(c._id)} />
                        </div>
                    </div>
                ))
                }
            </div>
        </section>
    )
}