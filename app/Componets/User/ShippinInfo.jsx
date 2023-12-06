'use client'
import { addToDatabase } from '@/app/myCodes/Database'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { Uploader } from '../General/Uploader'
import { siteEmail, siteName } from '@/app/META'

function ShippinInfo({ user, forCheckOut, event }) {
    const [shippingInfo, setShippingInfo] = useState({})
    const [showTerms, setShowTerms] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const updateShippingInfo = async ({ target }) => {
        setShippingInfo(oldState => ({ ...oldState, [target.name]: target.value }))
    }


    const updateDatabase = (() => {
        addToDatabase('User', user?.uid ? user?.uid : user?.gid, 'ShippingInfo', shippingInfo)
        if (forCheckOut && Object.keys(shippingInfo).reduce((a, c) => a + 'email firstName lastName address zipcode phone img'.includes(c), 0) >= 7
        ) {
            console.log('first')
            forCheckOut(shippingInfo, event)
        }

    })
    return (
        <div className={`center-col w-full fadeInRight  relative hidescroll ${forCheckOut ? 'h-[45rem] md:h-[50rem]' : 'h-auto'}`}>
            <Card className={`${forCheckOut ? 'w-full' : 'w-3/4'} shadow-md shadow-black border-2 border-[#121212] h-auto bg-[#171717] center-col`}>
                <CardHeader className="font-bold  text-white bg-black-800 mb-4">
                    <h1 className="text-center w-full">Add shipping Info</h1>
                </CardHeader>
                <CardBody className="center-col hidescroll  gap-2 text-black">


                    <h1 className='text-white md:mt-10 mt-24'>Upload ID Please</h1>
                    <Uploader setProductData={setShippingInfo} limit={1} folderName={'IDs'} />
                    <div className='flex w-[99%] text-xm text-rose-700  h-auto font-extrabold'>
                        <div className='h-auto text-center w-72 text-white m-auto ' >
                            <h1>By uploading your ID you agree to our terms and conditions</h1>
                            <Button className='bg-rose-700' onPress={() => { setShowTerms(!showTerms) }}>(click to see terms)</Button>
                        </div>

                    </div>


                    <Input type="text"
                        onChange={updateShippingInfo}
                        placements={'inside'}
                        variant="flat"
                        name="email"
                        label={'Address'}
                        className="w-64 m-auto"
                    />
                    <Input type="text"
                        onChange={updateShippingInfo}
                        placements={'inside'}
                        variant="flat"
                        name="firstName"
                        label={'First Name'}
                        className="w-64 m-auto"
                    />
                    <Input type="text"
                        onChange={updateShippingInfo}
                        placements={'inside'}
                        variant="flat"
                        name="lastName"
                        label={'Last Name'}
                        className="w-64 m-auto"
                    />
                    <Input type="text"
                        onChange={updateShippingInfo}
                        placements={'inside'}
                        variant="flat"
                        name="address"
                        label={'Address'}
                        className="w-64 m-auto"
                    />
                    <Input type="text"
                        onChange={updateShippingInfo}
                        placements={'inside'}
                        variant="flat"
                        name="apt"
                        label={'APT'}
                        className="w-64 m-auto"
                    />
                    <Input type="number"
                        onChange={updateShippingInfo}
                        placements={'inside'}
                        variant="flat"
                        name="zipcode"
                        label={'Zip Code'}
                        className="w-64 m-auto"
                    />
                    <Input type="number"
                        onChange={updateShippingInfo}
                        placements={'inside'}
                        variant="flat"
                        name="phone"
                        label={'Phone'}
                        className="w-64 m-auto"
                    />
                </CardBody>
                <CardFooter className='p-2 bg-black-800'><Button className="w-3/4 m-auto mb-4" onPress={updateDatabase}>Update</Button></CardFooter>
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