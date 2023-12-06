'use client'
import React, { useState } from 'react';
import { Card, Spacer, Button, Text, Input, Row, Checkbox } from '@nextui-org/react';
import { MailCheckIcon } from 'lucide-react';
import { AiFillCloseCircle, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { signUp } from '@/app/myCodes/Auth';


function RegisterCard({ toggleRegister }) {
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible)
    const [credentials, setCredentials] = useState({ password: '', email: '' })
    const signup = () => {

        if (credentials.password === credentials.passwordMatch && password.length > 5) {
            (async () => {
                try {
                    await signUp(credentials.email, credentials.password).then(() => {
                        toggleRegister()

                    })
                } catch (error) {
                    console.log(error.message)

                }
            })()
        } else {
            throw new error('Password must be 5 Characters or do not match')
        }
    }



    return (
        <div className='fixed z-[99999] top-16 '>
            <Card variant="bordered" className='fadeInBottom h-auto w-64 p-4 bg-black '>
                <Input
                    onChange={({ target }) => { setCredentials(prvState => ({ ...prvState, email: target.value })) }}

                    className='w-full text-black'
                    placeholder="Enter your email"

                    type="email"
                    label="Email"
                    labelPlacement={'inside'}
                    endContent={<MailCheckIcon color='black' />}
                />
                <Spacer y={2} />
                <Input
                    onChange={({ target }) => setCredentials(prvState => ({ ...prvState, password: target.value }))}
                    label="Password"
                    placeholder="Enter your password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                />
                <Spacer y={2} />
                <Input
                    onChange={({ target }) => setCredentials(prvState => ({ ...prvState, passwordMatch: target.value }))}

                    label="Password"
                    placeholder="Match password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                />

                <br />
                <Button onPress={signup} className='w-1/2 m-auto font-bold text-white bg-black-800'>Sign Up</Button>
                <Spacer y={2} />
                <Button onPress={toggleRegister} className='h-8 min-w-0 w-fit  m-auto font-bold text-red bg-black-800'><AiFillCloseCircle color='white' size={32} /></Button>


            </Card>
        </div>
    )
}

export default RegisterCard