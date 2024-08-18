import React from 'react'
import { OrderItem } from './OrderItem'
import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'

const OrderDetails = ({ order, isOrderCreator }) => {
    const orderType = order?.orderInfo?.orderType
    const orderID = order?.id
    const orderStatus = order?.status
    const orderTotal = Number(order?.total)
    const orderItems = order?.orderedItems || []
    return (
        <div className='center-col text-center'>
            <h1 className='text-3xl border-b font-bold'>Order {orderID}</h1>
            {orderStatus == 'ready' ? <p className='text-lg'>Your order is {orderType == 'delivery' ? 'Waiting for the driver' : 'ready to be picked up'}</p> :
                orderStatus == 'not started' ? <p className='text-lg'>Your order is being prepared!</p> :
                    orderStatus == 'on the way' ? <p className='text-lg'>Your order is on the way!</p> : <p className='text-lg'>We dont know lol</p>}
            <Card className='bg-black-800 text-white w-auto h-auto'>
                <CardHeader>
                    <Skeleton className='bg-lime-500 rounded-full w-full' isLoaded={isOrderCreator}>
                        <h1 className='text-3xl font-bold text-center w-full'>Items</h1>
                    </Skeleton>
                    <h1 className='text-lg font-bold text-center w-full'>Total: ${orderTotal}</h1>
                </CardHeader>
                <CardBody className='grid lg:grid-cols-4 grid-cols-5  gap-4 p-4'>
                    {orderItems.map(item => {
                        return (
                            <OrderItem key={item} isLoaded={isOrderCreator} item={item} />

                        )
                    })}
                </CardBody>
            </Card>
        </div>
    )
}

export default OrderDetails