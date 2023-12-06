'use client'
import { useAUTHListener } from '@/StateManager/AUTHListener'
import { useCartContext } from '@/StateManager/CartContext'
import { orderNumberPrefix } from '@/app/META'
import { fetchDocument } from '@/app/myCodes/Database'
import { sendMail } from '@/app/myCodes/Email'
import { getRand } from '@/app/myCodes/Util'
import { Button } from '@nextui-org/react'
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

    const getData = async () => {

        const orderInfo = UID ? await fetchDocument('User', UID) : null
        if (orderInfo) setData({ shipping: orderInfo?.ShippingInfo, cart: orderInfo?.cart ? orderInfo?.cart : state.lineItems })
        return { shipping: orderInfo?.ShippingInfo, cart: orderInfo?.cart ? orderInfo?.cart : state.lineItems }

    }
    const addArray = (array) => {
        const mainArray = Array.isArray(array) ? array : Object.values(array ? array : {})
        const sum = mainArray.reduce((partialSum, a) => partialSum + a, 0)
        return sum
    }
    const [arrayQTY, setArrayQTY] = useState()
    const [arrayPrice, setArrayPrice] = useState()
    const [arrayImages, setArrayImages] = useState()
    const getArrayToAddQTY = () => {
        Object.values(data?.cart ? data?.cart : {}).map((order) => {
            const total = Object.values(order.lineItems ? order.lineItems : {}).map((orderInfo) => {
                return orderInfo.Qty
            })
            setArrayQTY(total)
            return total

        })
    }
    const getArrayToAddPrice = () => {
        Object.values(data?.cart ? data?.cart : {}).map((order) => {
            const total = Object.values(order.lineItems ? order.lineItems : {}).map((orderInfo) => {
                return orderInfo.price
            })
            setArrayPrice(total)
            return total

        })
    }

    const getArrayToAddImages = () => {
        Object.values(data?.cart ? data?.cart : {}).map((order) => {
            const total = Object.values(order.lineItems ? order.lineItems : {}).map((orderInfo) => {
                return orderInfo.images[0]
            })
            setArrayImages(total)
            return total


        })
    }

    if (!arrayQTY) getArrayToAddQTY()
    if (!arrayPrice) getArrayToAddPrice()
    if (!arrayImages) getArrayToAddImages()


    const shipdata = data?.shipping



    useEffect(() => {
        if (!emailSent && shipdata) {
            sendMail(data?.shipping, data?.shipping.email, 'Order Successfull', 'EmailOrderSuccessful', data?.cart.state, orderID)
            setEmailSent(true)
        }



    }, [data])


    const run = async () => {
        const x = await getData()

        const orderData = UID ? await fetchDocument('User', UID) : undefined

        setTimeout(() => {
            setShowExitButton(true)
            dispatch({ type: "EMPTY_CART", value: null })
            // setTimeout(() => { push('/Shop') }, 4000)
        }, 6000);




    }







    const orderMap = Object.values(data?.cart?.state?.lineItems ? data?.cart?.state?.lineItems : {})



    if (!data) run()




    return (
        <div className=' center h-[40rem] relative text-white flex md:flex-row flex-col md:gap-0 gap-24 bg-black'>
            <div className='h-96 md:w-[50%] w-[90%] bg-black flex flex-col relative'>
                <h1 className='text-4xl text-white font-extrabold text-center'>Thank you for ordering</h1>
                <h1 className='text-sm font-light text-center text-white'>an email confirmation has been sent to {data?.shipping?.email || user?.email}</h1>

                <div className='h-20 w-full mt-10'>
                    <h1 className='text-2xl text-white'>Items ordered</h1>

                    <div className='grid grid-cols-2 p-2 h-32 border-y overflow-y-scroll hidescroll  md:grid-cols-3 gap-1 w-full'>
                        {orderMap.map((item) => {
                            return (
                                <div key={item.name + getRand(9999)}>
                                    <div className='bg-white m-auto text-black center border-2 w-12 h-12 overflow-hidden rounded-full relative'>
                                        <h1 className='absolute h-full w-full text-2xl center text-white bg-opacity-50 bg-black'>{item.Qty}</h1>
                                    </div>
                                    <h1 className='bg-opacity-25 text-xs text-center'>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                    <div className='center-col p-2'>
                        <h1>Total: {data?.cart?.state?.total}</h1>
                        {showExitButton &&
                            <Button onPress={() => { push('/Shop') }}>
                                Continue to store
                            </Button>}

                    </div>



                </div>
            </div>
            <div className='h-40 overflow-hidden'>

            </div>

        </div>
    )
}

export default OrderItemPage