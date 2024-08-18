'use client'
import { useEffect, useState } from 'react';
import Maps from '../Componets/Maps';
import OrderDetails from '../Componets/OrderDetails';
import { addToDoc, deleteDocument, fetchDocument, updateDatabaseItem, watchDocument } from '@/app/myCodes/Database';
import { usePathname, useRouter } from 'next/navigation'
import { Button, Skeleton } from '@nextui-org/react';
import { useAUTHListener } from '@/StateManager/AUTHListener';
import { getUID } from '@/app/myCodes/Auth';
import { isDev } from '@/app/myCodes/Util';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 3280.84; // Convert to feet
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};



export default function page() {

    const [order, setOrder] = useState({})
    const path = usePathname()
    const replacePath = '/Orders/'
    const orderID = path.replace(replacePath, '')
    const customer = order?.orderInfo
    const orderType = order?.orderInfo?.orderType
    const orderStatus = order?.status
    const orderCreator = order?.user
    const driverPrevLocation = order?.driverPrevLocation
    const destination = order?.orderInfo?.address
    const origin = '760 Springfield Ave, Irvington NJ'
    const [orderTracking, setOrderTracking] = useState(false)
    const [currentDriverLocation, setCurrentDriverLocation] = useState()
    const [currentLocation, setCurrentLocation] = useState([])
    const [prevLocation, setPrevLocation] = useState(null);
    const user = useAUTHListener()
    const [userData, setUserData] = useState()
    const isOrderCreator = ((user.uid == orderCreator && user && orderCreator) || userData?.ACCOUNTSTATUS == 'ADMIN')
    const [destinationPosition, setDestinationPosition] = useState({})
    const [originPosition, setOriginPosition] = useState({})
    const addressDestination = destination?.replace(/ /g, "+")
    const addressOrigin = origin?.replace(/ /g, "+")
    const checkPageAccess = user?.uid != orderCreator && userData?.ACCOUNTSTATUS != 'ADMIN'
    useEffect(() => {
        const getLatLng = async () => {
            const destinationData = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressDestination}&key=AIzaSyDu0t5ZAFoF8oKGdoretlTZfmZ0XQXmgok`)
            const originData = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressOrigin}&key=AIzaSyDu0t5ZAFoF8oKGdoretlTZfmZ0XQXmgok`)
            const resD = await destinationData.json()
            const resO = await originData.json()

            if (resD.results[0]) setDestinationPosition(resD.results[0].geometry.location)
            if (resD.results[0]) setOriginPosition(resO.results[0].geometry.location)
        }

        getLatLng()
    }, [addressDestination])

    const { push } = useRouter()

    useEffect(() => {
        if (!orderID) return
        const getOrder = async () => {
            const order = await fetchDocument('Orders', orderID)
            setOrder(order)

            await updateOrderLocation()
            await watchDocument('Orders', orderID, setOrder)
        }
        getOrder()
    }, [orderID])

    useEffect(() => {
        const run = async () => {
            (!userData && user?.uid) ? setUserData(await fetchDocument('User', getUID(user))) : null
        }

        run()
        // if ((user && order) && user?.uid != orderCreator) push('/')


        if (user.uid && orderCreator)
            if (checkPageAccess)
                push('/')


    }, [user, orderCreator])



    const updateOrderLocation = async (location) => {
        const distance = calculateDistance(
            prevLocation?.lat,
            prevLocation?.lng,
            location?.lat,
            location?.lng,
        );

        if (location) await updateDatabaseItem('Orders', orderID, 'driverLocation', location)

        if (distance >= 1000 || (!distance && location)) {
            console.log("You have moved 1000ft. or new distance");
            await updateDatabaseItem('Orders', orderID, 'driverPrevLocation', (prevLocation ? prevLocation : location))
            setPrevLocation(location);
        }
        const order = await fetchDocument('Orders', orderID)
        const orderLocation = order?.driverLocation
        setCurrentDriverLocation(orderLocation)
    }



    const StartEndDelivery = async () => {
        setOrderTracking(!orderTracking)
        if (orderTracking) {
            await updateDatabaseItem('Orders', orderID, 'status', 'ready')
            await updateDatabaseItem('Orders', orderID, 'driverLocation')
            await updateDatabaseItem('Orders', orderID, 'driverPrevLocation')

        }
        if (!orderTracking) {
            await updateDatabaseItem('Orders', orderID, 'status', 'on the way')
            navigator.geolocation.getCurrentPosition(p => setCurrentLocation([p.coords.latitude, p.coords.longitude]))
            // await updateOrderLocation({ lat: currentLocation[0], lng: currentLocation[1] })
            // if (currentDriverLocation?.length >= 2)
            setCurrentDriverLocation()
        }

    }
    const cancelOrder = async () => {
        await updateDatabaseItem('Orders', orderID, 'status', 'canceled')
        await addToDoc('ArchivedOrders', orderID, order)
        await deleteDocument('Orders', orderID)
        if (user.uid) push(`/User/${user.uid}`)
        else push('/')

    }

    const isNearCustomer = () => {
        if (!currentDriverLocation) return

        const distance = calculateDistance(
            destinationPosition?.lat,
            destinationPosition?.lng,
            currentDriverLocation?.lat,
            currentDriverLocation?.lng,
        );
        return distance <= 500 ? true : false
    }

    const completeOrdr = async () => {
        await updateDatabaseItem('Orders', orderID, 'status', 'completed')
        await updateDatabaseItem('Orders', orderID, 'driverLocationWhenComplete', currentDriverLocation)
        await addToDoc('ArchivedOrders', orderID, order)
        await deleteDocument('Orders', orderID)
        if (user.uid) push(`/User/${user.uid}`)
        else push('/')
    }

    const orderReady = async () => {
        if (orderStatus == 'not started')
            await updateDatabaseItem('Orders', orderID, 'status', 'ready')
        else {
            await updateDatabaseItem('Orders', orderID, 'status', 'not started')
            await updateDatabaseItem('Orders', orderID, 'driverLocation')
            setOrderTracking(false)
        }

    }



    return (
        <div className='bg-black center   h-screen   relative overflow-x-hidden'>


            <div className="flex flex-col lg:flex-row gap-2 w-full lg:p-4 p-2 lg:w-1/2 text-white relative">
                <Skeleton className='h-auto bg-black lg:w-1/2 relative lg:absolute mt-12 z-40 lg:mt-0 top-12 lg:top-5' isLoaded={isOrderCreator}>
                    <div className='text-center   center-col  m-auto  bg-black  z-40 lg:bg-transparent  w-full  '>
                        <h1 className='text-center'>{customer?.firstName} {customer?.lastName}</h1>
                        <h1 className='font-bold text-center'>{customer?.address}</h1>
                    </div>
                </Skeleton>
                {orderType == 'delivery' && <Skeleton className='rounded-xl h-auto lg:w-3/4 w-full  bg-black' isLoaded={isOrderCreator}>
                    <Maps
                        destinationPosition={destinationPosition}
                        originPosition={originPosition}
                        orderStatus={orderStatus}
                        updateOrderLocation={updateOrderLocation}
                        destination={destination}
                        orderTracking={orderTracking}
                        currentDriverLocation={currentDriverLocation}
                        positionState={[currentLocation, setCurrentLocation]}
                        driverPrevLocation={driverPrevLocation}
                    />
                </Skeleton>}
                <OrderDetails isOrderCreator={isOrderCreator} order={order} />

                <div className=' w-full  lg:w-1/2  center gap-2 lg:absolute lg:top-0 lg:right-0'>
                    {(userData?.ACCOUNTSTATUS == 'ADMIN' && (orderStatus == 'ready' || orderStatus == 'on the way') && !isNearCustomer()) &&
                        <Button onPress={StartEndDelivery} className={`${orderTracking ? 'bg-rose-700' : 'bg-blue-700'} p-4 text-xl font-bold text-white `}>
                            {orderTracking ? 'End Delivery' : 'Start Delivery'}
                        </Button>
                    }
                    {(userData?.ACCOUNTSTATUS == 'ADMIN' && isNearCustomer()) &&
                        <Button onPress={completeOrdr} className={`bg-blue-700 p-4 text-xl font-bold text-white `}>
                            Complete Order
                        </Button>
                    }
                    {(userData?.ACCOUNTSTATUS == 'ADMIN') &&
                        <Button onPress={orderReady} className={`${orderStatus != 'not started' ? 'bg-rose-700' : 'bg-blue-700'} p-4 text-xl font-bold text-white `}>
                            {orderStatus != 'not started' ? 'Mark Unready' : 'Mark Ready'}
                        </Button>
                    }

                    {order?.status == 'not started' && <Button onPress={cancelOrder} className='p-4 text-xl font-bold text-white bg-red-700'>Cancel order</Button>}
                </div>

            </div>


        </div>
    );
}
