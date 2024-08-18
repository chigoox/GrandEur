'use client'
import Loading from '@/app/Componets/General/Loading'
import { siteEmail, siteName } from '@/app/META'
import { AutoCompleteInput } from '@/app/Orders/Componets/AutoComplete'
import { addToDatabase } from '@/app/myCodes/Database'
import { filterObject } from '@/app/myCodes/Util'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Switch } from '@nextui-org/react'
import { StoreIcon, TruckIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

function ShippinInfo({ defualtData, user, forCheckOut, event }) {
    const [shippingInfo, setShippingInfo] = useState({})
    const [showTerms, setShowTerms] = useState(false)
    const [orderType, setOrderType] = useState('pickUp')
    const [isLoading, setIsLoading] = useState(false)
    const toggleLoading = () => setIsLoading(!isLoading)

    const updateShippingInfo = ({ target }) => {
        setShippingInfo(oldState => ({ ...oldState, [target.name]: target.value }))
    }
    console.log(isLoading)

    const updateDatabase = (async () => {
        const filterObjectForNull = filterObject(shippingInfo, (a) => a)

        toggleLoading()
        await addToDatabase('User', user?.uid ? user?.uid : user?.gid, 'ShippingInfo', { ...filterObjectForNull, orderType: orderType })

        if (forCheckOut &&
            ((Object.keys(filterObjectForNull).reduce((a, c) => a + 'email firstName lastName address  phone'.includes(c), 0) >= 5 && orderType == 'delivery') ||
                (Object.keys(filterObjectForNull).reduce((a, c) => a + 'email name'.includes(c), 0) >= 2 && orderType != 'delivery'))
        ) {
            try {
                forCheckOut(filterObjectForNull, event)
            } catch (error) {
            }
            if (!forCheckOut) toggleLoading()
        }

    })
    useEffect(() => { if (defualtData) setShippingInfo({ ...defualtData?.ShippingInfo }) }, [defualtData])
    return (
        <div className={`center-col w-full fadeInRight  relative hidescroll ${forCheckOut ? 'h-[45rem] md:h-[50rem]' : 'h-auto'}`}>
            {isLoading && <Loading />}
            <Card className={`${forCheckOut ? 'w-full' : 'w-3/4'} shadow-md shadow-black border-2 border-[#121212] h-auto bg-[#171717] center-col`}>
                <CardHeader className="font-bold  text-white bg-black-800 mb-4">
                    <h1 className="text-center w-full">Order Info</h1>
                </CardHeader>
                <CardBody className="center-col hidescroll trans gap-2 text-black">


                    {/*  <h1 className='text-white md:mt-10 mt-24'>Upload ID Please</h1>
                    <Uploader setProductData={setShippingInfo} limit={1} folderName={'IDs'} />
                    <div className='flex w-[99%] text-xm text-rose-700  h-auto font-extrabold'>
                        <div className='h-auto text-center w-72 text-white m-auto ' >
                            <h1>By uploading your ID you agree to our terms and conditions</h1>
                            <Button className='bg-rose-700' onPress={() => { setShowTerms(!showTerms) }}>(click to see terms)</Button>
                        </div>

                    </div> */}
                    <div className='border-white center-col text-white rounded-3xl p-2 m-2'>

                        <Switch isDisabled={!user?.uid} name='orderType' onValueChange={(v) => { setOrderType(v ? 'delivery' : 'pickUp') }} size='lg' color='success' startContent={<TruckIcon />} endContent={<StoreIcon />} className='w-full'>

                        </Switch>
                        <h1 className='text-3xl font-bold'>{orderType != 'delivery' ? 'Pickup' : 'Delivery'}</h1>


                    </div>

                    <Input type="text"
                        onChange={updateShippingInfo}
                        placements={'inside'}
                        variant="flat"
                        name="email"
                        label={'Email'}
                        className="w-64 m-auto"
                        value={shippingInfo?.email}
                    />
                    <Input type="text"
                        onChange={updateShippingInfo}
                        placements={'inside'}
                        variant="flat"
                        name={orderType == 'pickUp' ? 'name' : "firstName"}
                        label={orderType == 'pickUp' ? 'Name' : 'First Name'}
                        className="w-64 m-auto"
                        value={orderType == 'pickUp' ? shippingInfo?.name : shippingInfo?.firstName}

                    />
                    {
                        <div className={`center-col gap-2 ${orderType != 'delivery' ? 'h-[0rem]' : ' h-[12rem]'} trans overflow-hidden`}>
                            <Input type="text"
                                onChange={updateShippingInfo}
                                placements={'inside'}
                                variant="flat"
                                name="lastName"
                                label={'Last Name'}
                                className="w-64 m-auto"
                                value={shippingInfo?.lastName}
                                isDisabled={orderType != 'delivery'}

                            />
                            <AutoCompleteInput valueX={shippingInfo?.address} className="w-64 m-auto" isDisabled={orderType != 'delivery'} setter={updateShippingInfo} />


                            <Input type="number"
                                onChange={updateShippingInfo}
                                placements={'inside'}
                                variant="flat"
                                name="phone"
                                label={'Phone'}
                                className="w-64 m-auto"
                                value={shippingInfo?.phone}
                                isDisabled={orderType != 'delivery'}

                            />
                        </div>}
                </CardBody>
                <CardFooter className='p-2 bg-black-800'><Button className="w-3/4 m-auto mb-4 font-bold text-white bg-blue-700" onPress={updateDatabase}>{forCheckOut ? 'Checkout' : 'Update'}</Button></CardFooter>
            </Card>

            {showTerms &&
                <Card className='absolute  h-full bg-white p-4 z-[9999]'>
                    <div className='left-24 '>

                        <div className="flex flex-col mb-10">Terms & Conditions</div>
                        <div className='fadeInBottom'>
                            <p>
                                All orders will take 2-4 business days to be processed.
                                All orders are shipped through USPS STANDARD SHIPPING which is 5-7 business days.
                                If you accidentally entered the wrong shipping address, contact {siteEmail}
                                for a change of address. {siteName} LLC is not reponsible for any lost items due to a wrong
                                shipping address.
                                Thank you .
                            </p>
                            <h1 className='text-xl font-extrabold my-8' >Return Policy</h1>
                            <h1>
                                All sales are FINAL and there are no refunds Exchanges.
                                A Refund and Exchange will only be acceptable when we are at
                                fault with a costumer’s order . If you have any questions concerning
                                your order Email {siteEmail}.
                            </h1>

                            <h1>GOVERNMENT PHOTO ID IS REQUIRED FOR ALL ORDERS .</h1>
                        </div>
                        <div className='text-center my-4'>

                            <Button color="primary" className=' relative' onPress={() => { setShowTerms(false) }}>
                                Agree by uploading ID
                            </Button>
                        </div>

                    </div>
                </Card>
            }
        </div>

    )
}

export default ShippinInfo