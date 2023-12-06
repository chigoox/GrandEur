'use client'
import { emailCollectorIMG, siteName, siteTag } from "@/app/META";
import { addEmailToList } from "@/app/myCodes/DatabaseUtils";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useState } from 'react';


export const collectAndSendEmail = (email, setOpen) => {
    addEmailToList(email)
    //function to send email code
    if (setOpen) setOpen(false)

}

const IMG = emailCollectorIMG

function EmailCollector({ isopen5, setOpen }) {
    const [email, setEmail] = useState()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <Modal
            closeButton={<></>}
            className=""
            isOpen={isopen5}
            placement={'auto'}
            onOpenChange={onOpenChange}
            size={'2xl'}
            classNames={'h-fit'}
        >
            <ModalContent className="h-[30rem] md:h-[35rem] ">
                {(onClose) => (
                    <>
                        <ModalBody className="relative flex ">
                            <div className="self-end h-auto  center ">
                                <div className=" absolute center-col p-2 gap-4 w-1/2 h-auto right-0 top-0 text-center">
                                    <div>
                                        <h1 className=" text-5xl font-bold">{siteName}</h1>
                                        <h1 className="font-light text-xl">{siteTag}</h1>
                                    </div>

                                    <h1 className="font-semibold text-2xl text-center">Subscribe to our mailing list</h1>
                                    <h1 className="font-extrabold text-3xl md:text-5xl text-center">Join Now</h1>
                                    <h1 className="text-sm font-light ">to receive exclusive access to promotions and product launches</h1>

                                    <Input
                                        onValueChange={(text) => setEmail(text)}
                                        className="text-center"
                                        placeholder=""
                                        placement={'inside'}
                                        label={'Enter email to join'}


                                    />
                                    <div className="center-col">
                                        <Button className="bg-black-900 text-white" onPress={() => { collectAndSendEmail(email, setOpen) }}>
                                            SignUp
                                        </Button>
                                        <Button onPress={() => {
                                            setOpen(false)
                                        }} color="danger" variant="light" >
                                            No Thanks
                                        </Button>
                                    </div>
                                </div>

                            </div>


                        </ModalBody>
                        <ModalFooter className="mb-12">

                        </ModalFooter>
                        <div className="h-full top-0 absolute w-1/2 overflow-hidden">
                            <Image fill objectFit="cover" src={IMG} />
                        </div>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default EmailCollector


