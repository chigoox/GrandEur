'use client'
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Skeleton } from "@nextui-org/react";
import AUTHListener from "@/StateManager/AUTHListener";
import { FetchTheseDocs, fetchDocument } from "@/app/myCodes/Database";
import { logOut } from "@/app/myCodes/Auth";
import ShippinInfo from "@/app/User/Comonts/ShippinInfo";
import Image from "next/image";
import Link from "next/link";
import { isDev } from "@/app/myCodes/Util";






const getUID = (user) => {
    return user?.uid ? user?.uid : user?.gid
}


export default function ProtectedRoute({ params }) {
    const [user, setUser] = useState({})
    const [orderData, setOrderData] = useState()
    const [userData, setUserData] = useState()



    useEffect(() => {
        const run = async () => {
            (user && !userData) ? setUserData(await fetchDocument('User', getUID(user))) : null
                (user && !userData) ? setOrderData(await FetchTheseDocs('Orders', 'user', '==', getUID(user), 'dateServer')) : null

        }

        run()

    }, [user])


    const menu = ['Orders', 'Reservations', 'Update Shipping Info']
    const OrderItem = ({ orderInfo }) => {
        const { id, total, qty, images } = orderInfo
        return (
            <Skeleton className="m-auto" isLoaded={id}>
                <Link href={!isDev ? `http://localhost:3000/Orders/${id}` : `https://stillthedubb.vercel.app/Orders/${id}`}>
                    <Card shadow="md" variant={'bordered'} className="h-36 w-full m-auto bg-black center-col">
                        <CardBody className="bg-white center-col relative">
                            <h1 className="abolute top-0 z-10 text-white bg-black">{id}</h1>
                            <Image src={images[0]} objectFit="cover" fill />
                        </CardBody>
                        <CardFooter className={'text-white text-center text-xs  m-auto center bg-black-800 bg-opacity-25 p-2'}>QTY: {qty} Total: ${Number(total)}</CardFooter>
                    </Card>
                </Link>
            </Skeleton>
        )
    }



    return (
        <div className="h-screen text-white bg-black ">
            <div className="">
                <AUTHListener protectedPage={true} set={setUser} />
                <br />
                <br />
                <br />
                <h1 className="text-xl  font-bold text-center">Welcome Back </h1>
                <h1 className="font-extrabold text-center">{user?.displayName}</h1>
                <div className="center"><Button onPress={logOut} className="bg-black-800 text-white w-3/4 lg:w-1/2">LogOut</Button></div>

                <div className="flex  md:flex-row flex-col w-full  justify-center gap-4 p-2">
                    <Card className="h-auto bg-black-900  md:w-96 w-full my-12" variant={'bordered'}>
                        <CardHeader className="text-3xl  font-bold text-center bg-black-800 mb-4 text-white p-2">Orders</CardHeader>
                        <CardBody className="w-full overflow-y-scroll hidescroll h-full grid grid-cols-4   p-2 gap-2">
                            {orderData?.map((order) => <OrderItem orderInfo={order} />)}
                        </CardBody>
                    </Card>

                </div>

                <ShippinInfo defualtData={userData} user={user} />

            </div>



        </div>
    )
}
