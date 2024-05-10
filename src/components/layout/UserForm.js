'use client'
import { stringify } from "postcss";
import { useState,useEffect } from "react";
import AddressInputs from "./AddessInputs";

export default function UserForm({ user, onSave }) {

    const [name, setName] = useState(user?.name || '');
    const [address, setAddress] = useState(user?.address || "");
    const [city, setCity] = useState(user?.city || "");
    const [pincode, setPincode] = useState(user?.pincode || "");
    const [phone, setPhone] = useState(user?.phone || '');
    const [admin, setAdmin] = useState(user?.admin || false);

    const [loggedInUserData, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(loggedInUserData);
                setLoading(false);
            });
        })
    }, []);

    function handleAddressChange(propName,value){
        if(propName === 'city') setCity(value);
        if(propName === 'phone') setPhone(value);
        if(propName === 'address') setAddress(value);
        if(propName === 'pincode') setPincode(value);
    }



    return (
        <div className="flex gap-1 items-center">
            <form className="grow" onSubmit={(ev) => onSave(ev, { name: name, address, city, pincode, phone ,admin})}>
                <div className="flex gap-3  items-center">
                    <span className="w-[40%]  font-semibold text-primary">UserName:</span>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="First and Last name:" />
                </div>
                <div className="flex gap-3  items-center">
                    <span className="w-[40%] font-semibold text-primary">Email:</span>
                    <input type="email" value={user?.email} disabled={true}></input>
                </div>
               
                <AddressInputs addressProp={{phone,address,city,pincode}} setAddressProp={handleAddressChange}/>

                {/* {loggedInUserData.admin && ( */}
                    <div>
                        <label className="p-2 inline-flex items-center gap-2" htmlFor="adminCb">
                            <input id='adminCb' type="checkbox" className="" value={'1'}
                                checked={admin} onClick={ev => setAdmin(ev.target.checked)}
                            />
                            <span className="font-semibold text-gray-700">Admin</span>
                        </label>
                    </div>
                {/* )} */}


                <button className='mt-3' type="submit">Save</button>
            </form>
        </div>
    )
}