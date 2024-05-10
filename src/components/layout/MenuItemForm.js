import { useEffect, useState } from "react";
import MenuItemPriceProps from "./menuItemPriceProps";


export default function MenuItemForm({ onSubmit, menuItem }) {

    const [name, setName] = useState(menuItem?.name || '');
    const [price, setPrice] = useState(menuItem?.price || '');
    const [desc, setDesc] = useState(menuItem?.desc || '');

    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extra, setExtra] = useState(menuItem?.extra || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [image,setImage] = useState(menuItem?.image || '');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            })
        })
    },[])

    return (
        <form className="mt-4 max-w-xl mx-auto" onSubmit={ev => onSubmit(ev, { name, desc, price, sizes, extra,category,image })}>
            <div className="flex gap-2 items-start ">
                <div className="grow">
                    <label>Item name</label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} />

                    <label>Item Image</label>
                    <input type="text" value={image} placeholder='First upload image in public/images folder,then update link here' onChange={ev => setImage(ev.target.value)} />

                    <label>Item Description</label>
                    <input type="text" value={desc} onChange={ev => setDesc(ev.target.value)} />

                    <label>Category</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>

                    <label>Item price</label>
                    <input type="text" value={price} onChange={ev => setPrice(ev.target.value)} />


                    <MenuItemPriceProps name={'Sizes'} addLabel={'Add Item size'} props={sizes} setProps={setSizes} />
                    <MenuItemPriceProps name={'Extra Toppings'} addLabel={'Add Extras price'} props={extra} setProps={setExtra} />

                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}