'use client'
import { useEffect, useState } from "react";
import NewMenuItemPage from "./new/page";
import Link from 'next/link'
import Usertabs from "@/components/layout/Usertabs";
import Right from "@/components/icons/Right";

export default function MenuItemsPage() {

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

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);
  function fetchItems() {
    fetch('/api/menu-items').then(res => {
      res.json().then(item => {
        setMenuItems(item);
      })
    })
  }

  if (loading) {
    return 'Loading...'
  }
  if (!data.admin) {
    return 'Not an Admin!! Access Denied!!'
  }


  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <Usertabs isAdmin={true} />
      <div className="mt-8">
        <Link className='button max-w-lg mx-auto' href={'/menu/new'}>Create a new Menu Item <Right /></Link>
      </div>
      <div>
        <h2 className="text-lg text-gray-500 mt-8 ">Edit Menu item:</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {menuItems?.length > 0 && menuItems.map(item => (
            
            <Link key={item._id} href={'/menu/edit/' + item._id} className="flex flex-col justify-between h-[220px] bg-gray-200 rounded-lg p-4 hover:bg-gray-300">
              <div>
                <img src={item.image} ></img>
              </div>

              <div className="flex mt-3 mb-10 justify-between">
                <div className="ml-3 font-semibold italic">{item.name} </div>
                <Right />
              </div>
            </Link>
          ))}
        </div>

      </div>



    </section>
  )
}

