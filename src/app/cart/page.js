'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeader";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddessInputs";
import toast from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";

export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});

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
    useEffect(() => {
        if (data?.city) {
            const { phone, address, city, pincode } = data;
            const addressFromProfile = { phone, address, city, pincode };
            setAddress(addressFromProfile);
        }
    }, [data]);


    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }

    function handleAddressChange(propName, value) {
        setAddress(prev => {
            return { ...prev, [propName]: value }
        })
    }

    async function proceedToCheckout(ev) {
        ev.preventDefault();
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address,
                cartProducts
            }),
        })
        window.location = await response.json();
    }
    
    if(cartProducts?.length === 0){
        return(
            <section className="text-center mx-auto mt-8">
                <SectionHeaders mainHeader="Cart" />
                <p className="text-gray-600 mt-6">Your Shopping cart is Empty !! Add Now !!</p>
            </section>
        )
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart" />

            </div>
            <div className="mt-4 flex flex-col gap-8 mr-4 md:flex-row ">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No Products in your Cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct key={index}  product={product} onRemove={removeCartProduct}/>
                    ))}
                    <div className="py-4 pr-16 flex justify-end items-center gap-4">
                        <div className="text-gray-600">Subtotal:<br />Delivery:<br />Total:</div>
                        <div className="text-lg font-semibold pl-2 text-right">${subtotal}<br />$5<br />${subtotal + 5}</div>
                    </div>

                </div>
                <div className="bg-gray-200 rounded-lg p-4 ">
                    <div className="text-gray-700 italic font-semibold uppercase text-xl text-center mb-3">
                        <span>check out</span>
                    </div>
                    <span className="italic font-semibold text-gray-600">Hello, {data.name} !!</span>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs addressProp={address} setAddressProp={handleAddressChange} />
                        <button className='mt-4' type="submit">Pay ${subtotal + 5}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}