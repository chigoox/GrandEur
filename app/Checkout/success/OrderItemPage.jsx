'use client'
import { useAUTHListener } from '@/StateManager/AUTHListener'
import { useCartContext } from '@/StateManager/CartContext'
import Loading from '@/app/Componets/General/Loading'
import { OrderItem } from '@/app/Orders/Componets/OrderItem'
import { MONEYFONT } from '@/app/Shop/Componets/ShopItem'
import { fetchDocument, updateDatabaseItem } from '@/app/myCodes/Database'
import { sendMail } from '@/app/myCodes/Email'
import { getRand } from '@/app/myCodes/Util'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'


function OrderItemPage({ orderID }) {
    const { state, dispatch } = useCartContext()
    const [data, setData] = useState()
    const { push } = useRouter()
    const user = useAUTHListener()
    const UID = user.uid ? user.uid : user.gid
    const [showExitButton, setShowExitButton] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const currentOrder = data?.ORDER.id


    const getData = async () => {
        const orderInfo = UID ? await fetchDocument('User', UID) : null
        const ORDER = orderInfo?.currentOrder ? await fetchDocument('Orders', orderInfo?.currentOrder) : {}


        if (orderInfo && ORDER) setData({ ORDER: ORDER, shipping: orderInfo?.ShippingInfo, cart: ORDER?.orderedItems, currentOrder: orderInfo?.currentOrder, total: Number(ORDER.total) })
        // return { shipping: orderInfo?.ShippingInfo, cart: ORDER?.orderedItems, currentOrder: orderInfo?.currentOrder, total: Number(ORDER.total), }

    }




    const [arrayPrice, setArrayPrice] = useState()

    const getArrayToAddPrice = () => {
        setArrayPrice(data?.cart?.map((order) => {
            const total = Number(order.price) * Number(order.Qty)
            return total

        }))


    }






    const shipdata = data?.shipping



    const addArray = (array) => {
        const mainArray = Array.isArray(array) ? array : Object.values(array ? array : {})
        const sum = mainArray.reduce((partialSum, a) => partialSum + a, 0)
        return sum
    }

    const orderTotal = addArray(arrayPrice)

    useEffect(() => {
        const sendEmail = async () => {
            setIsLoading(true)
            const order = currentOrder ? await fetchDocument('Orders', currentOrder) : null
            if (!emailSent && shipdata && !order?.emailComfirmationSent) {
                await sendMail(data?.shipping, data?.shipping.email, 'Order Successfull', 'EmailOrderSuccessful', { cart: data?.cart, total: orderTotal }, orderID)
                setEmailSent(true)
                await updateDatabaseItem('Orders', currentOrder, 'emailComfirmationSent', true)
            }
            setIsLoading(false)


        }
        sendEmail()
        if (!arrayPrice) getArrayToAddPrice()


    }, [data])

    useEffect(() => {
        setTimeout(() => {
            if (!data?.currentOrder) run()
        }, 3000);

    }, [UID, data])



    const run = async () => {
        setIsLoading(true)
        await getData()

        const orderData = UID ? await fetchDocument('User', UID) : undefined
        setIsLoading(false)
        setTimeout(() => {
            setShowExitButton(true)
            dispatch({ type: "EMPTY_CART", value: null })
            // setTimeout(() => { push('/Shop') }, 4000)
        }, 6000);




    }







    const orderMap = Object.values(data?.cart ? data?.cart : {})








    return (
        <div className='  p-4 lg:px-10 m-auto lg:w-1/2 flex-col item-center h-[40rem] mt-12 relative text-white flex md:gap-0 gap-2 bg-black w-full overflow-hidden'>
            {isLoading && <Loading />}

            <h1 className='text-4xl text-white mt-12 font-extrabold text-center'>Thank you for ordering</h1>
            <h1 className='text-sm font-light text-center text-white'>an email confirmation has been sent to {data?.shipping?.email || user?.email}</h1>

            <div className='h-20 w-full mt-10'>
                <h1 className='text-2xl text-white'>Items ordered</h1>

                <div className='grid grid-cols-2 p-2 h-32 border-y overflow-y-scroll hidescroll  md:grid-cols-3 gap-1 w-full'>
                    {orderMap.map((item) => {
                        return (
                            <OrderItem isLoaded={item} item={item} />
                        )
                    })}
                </div>
                <div className={`${MONEYFONT} center-col p-2`}>
                    <h1 className='font-bold text-3xl border-b mb-5'>Total: $ {orderTotal}</h1>
                    {showExitButton &&
                        <div className='center gap-4'>
                            <Button color='primary' onPress={() => { push('/Shop') }}>
                                Continue to store
                            </Button>

                            <Link color='success' href={`/Orders/${data?.currentOrder}`}>
                                View Order Details
                            </Link>
                        </div>

                    }

                </div>



            </div>
        </div>
    )
}

export default OrderItemPage