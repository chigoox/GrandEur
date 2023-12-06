'use client'
import { Button, Input } from '@nextui-org/react'
import { Jost } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react'
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiFillYoutube } from 'react-icons/ai'
import { siteName } from '../META'
import { collectAndSendEmail } from './General/EmailCollector'

const jost = Jost({
    weight: '400',
    subsets: ['latin'],
})
function Footer() {
    const [Email, setEmail] = useState('')
    const date = new Date()
    return (
        <div className=' w-full bg-black-800 text-white'>
            <div className='flex flex-wrap  justify-between'>
                <div className='p-2 fadeInRight  md:w-full lg:w-fit  '>
                    <Link href={"/"} className='my-1 font-bold text-2xl'><h1 className={jost.className}>{siteName}</h1></Link>

                </div>

            </div>

            <div className='m-auto mt-10 fadeInRight overflow-hidden w-fit'>
                <div className='p-2 h-fit center flex-col'>
                    <h1 className='m-1 font-bold text-2xl'>Newsletter</h1>
                    <h1 className='m-1 '>Be the first to hear
                        the latest news from {siteName}, and much more!
                    </h1>
                    <Input onValueChange={(text) => setEmail(text)} label={'Subscribe to my newsletter'} placement={'inside'} className='w-[90%] m-auto text-black  trans p-2 focus:scale-110 hover:scale-105' type="text" />


                    <h1 className='mt-4'>By subscribing you agree to our privacy policy</h1>
                    <Button onPress={() => { collectAndSendEmail(Email) }} className='h-12 w-32 p-2 bg-black text-white trans-slow hover:bg-black hover:scale-110 my-8'>Subscribe</Button>
                </div>

            </div>
            <div className='bg-black text-white   h-12 between'>
                <div>
                    © {date.getFullYear()} {siteName}, Inc.
                    Terms
                    Privacy
                </div>
                <div className="center gap-4   w-fit">
                    <button className="trans hover:scale-105 center"><AiFillTwitterSquare size={32} /></button>
                    <button className="trans hover:scale-105 center"><AiFillFacebook size={32} /></button>
                    <button className="trans hover:scale-105 center"><AiFillInstagram size={32} /></button>
                    <button className="trans hover:scale-105 center"><AiFillYoutube size={32} /></button>
                </div>

            </div>
        </div>
    )
}

export default Footer


/* 


<h1 className='my-1 '>Need to reach me?</h1>
                    <h1 className='my-1 '>+555-555-5555</h1>
                    <h1 className='my-1 '>void.void@gmail.com</h1>
                    
*/