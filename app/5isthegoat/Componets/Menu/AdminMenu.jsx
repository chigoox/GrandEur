import React, { useState } from 'react'
import AdminMenuItem from './AdminMenuItem'
import { Button } from '@nextui-org/react'
import { Menu } from 'lucide-react'

export const menu = ['Home', { name: 'Orders', menus: ['Shipping Lables', 'Abandoned Checkouts'] }, { name: 'Products', menus: ['Collections', 'Inventory', 'Gift cards'] }, { name: 'Customers', menus: ['Segments'] }, 'Content', 'Discount']
export const AdminMenu = ({ setSelectedMenu, selectedMenu }) => {
    const [showMenu, setShowMenu] = useState(true)

    return (
        <div className={`Navigator ${showMenu ? 'w-[22rem] lg:w-64' : 'w-11 overflow-hidden'}  z-10 px-2  lg:relative absolute trans top-0 left-0 border-r bg-white h-screen`}>
            {menu.map((item) => {
                return (
                    <AdminMenuItem showMenu={showMenu} setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} menuItem={item} />
                )
            })}
            <Button onPress={() => { setShowMenu(!showMenu) }} className={` text-gray-600 font-semibold hover:bg-gray-200 bg-white ${showMenu ? 'p-4' : 'p-1'} w-full   flex justify-start  mt-2 h-7  group rounded-xl`}>
                <Menu />
                {!showMenu ? 'Open' : 'Close'}
            </Button>
        </div>
    )
}
