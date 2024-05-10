'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddessInputs";
import SectionHeaders from "@/components/layout/SectionHeader";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
export default function OrderPage() {
    const { id } = useParams();
    const {clearCart} = useContext(CartContext);
    const [order,setOrder] = useState();
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        if (typeof window.console !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }
        if(id){
            setLoading(true);
            fetch('/api/orders?_id='+id).then(res =>{
                res.json().then(data =>{
                    setOrder(data);
                    setLoading(false);
                })
            })
        }
    }, []);


    let subtotal = 0 ;
    if(order?.cartProducts){
        for(const p of order?.cartProducts){
            subtotal += cartProductPrice(p);
        }
    }
    return (
        
        <section className="max-w-2xl text-center mx-auto mt-8">
            {loading && (
                <div>Loading your Order...</div>
            )}
            <SectionHeaders mainHeader='Your Order' />
            <p>Thanks for your Order!!</p>
            
            {order && (
                <div className="flex flex-col gap-8 md:flex-row md:gap-16">
                    <div>
                        {order.cartProducts.map(p => (
                            <CartProduct key={p._id} product={p} />
                        ))}
                        <div className="text-right py-2 text-gray-500">
                            Subtotal: <span className="text-black font-semibold ml-2">${subtotal}</span> <br/>
                            Delivery: <span className="text-black font-semibold ml-2">$5</span> <br/>
                            Total: <span className="text-black font-semibold ml-2">${subtotal+5}</span> <br/>
                        </div>
                    </div>
                    <div className=" p-4 mt-5 rounded-lg ">
                        <span className="font-bold text-gray-600 italic text-left">Delivery Details</span>
                        <AddressInputs disabled={true} addressProp={...order} />
                    </div>
                    
                </div>
            )}

        </section>
    )
}