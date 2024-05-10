'use client'
import SectionHeaders from "@/components/layout/SectionHeader";
import Usertabs from "@/components/layout/Usertabs";
import { dbTime } from "@/libs/datetime";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
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
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                console.log(orders)
                setOrders(orders.reverse());
            })
        })
    }, []);
    return (
        <section className="mt-8 max-w-3xl mx-auto">
            <Usertabs isAdmin={data.admin} />
            <div className="text-center">
                <SectionHeaders mainHeader={'Orders'} />
            </div>
            <div className="mt-8">
                {loading && (
                    <div>Loading orders...</div>
                )}
                {orders?.length > 0 && orders.map(order => (
                    <div
                        key={order._id}
                        className="bg-gray-200 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
                        <div className="grow flex flex-col md:flex-row items-center gap-6">
                            <div>
                                <div className={
                                    (order.paid ? 'bg-green-500' : 'bg-red-400')
                                    + ' p-2 rounded-md text-white w-24 text-center'
                                }>
                                    {order.paid ? 'Paid' : 'Not paid'}
                                </div>
                            </div>
                            <div className="grow">
                                <div className="flex gap-2 items-center mb-1">
                                    <div className="grow">{order.userEmail}</div>
                                    <div className="text-gray-500 text-sm">{dbTime(order.createdAt)}</div>
                                </div>
                                <div className="text-gray-500 text-xs">
                                    {order.cartProducts.map(p => p.name).join(', ')}
                                </div>
                            </div>
                        </div>
                        <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                            <Link href={"/orders/" + order._id} className="button">
                                Show order
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}