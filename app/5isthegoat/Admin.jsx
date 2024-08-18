'use client'
import React, { useState } from 'react'
import { AdminMenu } from "./Componets/Menu/AdminMenu"
import AdminBody from "./Componets/Pages/AdminBody"

export const Admin = () => {
    const [selectedMenu, setSelectedMenu] = useState('Products')
    return (
        <main className="flex" >
            <AdminMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            <AdminBody selectedMenu={selectedMenu} />
        </main>

    )
}