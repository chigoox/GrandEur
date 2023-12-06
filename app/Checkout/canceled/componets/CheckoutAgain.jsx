'use client'

import { useAUTHListener } from "@/StateManager/AUTHListener"
import { getUID } from "@/app/myCodes/Auth"
import { fetchDocument } from "@/app/myCodes/Database"
import { useEffect, useState } from "react"

function CheckoutAgain() {
    const user = useAUTHListener()
    const UID = getUID(user)
    const [orderData, setOrderData] = useState({})

    console.log(orderData)
    useEffect(() => {
        const run = async () => {
            console.log('first')
            const data = await fetchDocument('User', UID, setOrderData)
            console.log('data', data)
        }

        run()


    }, [])


    return (
        <div className="">{orderData?.cart?.state}</div>
    )
}

export default CheckoutAgain