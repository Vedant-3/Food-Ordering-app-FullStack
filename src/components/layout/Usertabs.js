'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Usertabs({isAdmin}){
    const path = usePathname();
    return(
        <div className="flex mx-auto justify-center gap-2 tabs mb-5 flex-wrap"> 
                <Link 
                className={path === '/profile' ? 'active' : ''} 
                href={'/profile'}>Profile</Link>
                {isAdmin && (
                    <>
                        <Link className={path === '/categories' ? 'active' : ''} href={'/categories'}>Categories</Link>
                        <Link className={path.includes('/menu') ? 'active' : ''}  href={'/menu'}>Menu</Link>
                        <Link className={path.includes('/users') ? 'active' : ''}  href={'/users'}>Users</Link>
                    </>
                )}
                 <Link className={path === '/orders' ? 'active' : ''}  href={'/orders'}>Orders</Link>
            </div>
    )
}