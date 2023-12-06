'use client'
import React from 'react'
import { motion } from "framer-motion";
import { getRand } from '@/app/myCodes/Util';

function IGPost({ post }) {
    const { mediaUrl, mediaType, permalink } = post

    return (
        <motion.a
            initial={{
                opacity: 0,
                scale: 0.5,
                rotate: getRand(30)
            }}
            whileInView={{
                opacity: 1,
                transition: {
                    type: "spring",
                    duration: getRand(10)

                },
                rotate: 0,
                scale: 1
            }}
            viewport={{ once: true }}

            target="_blank" href={permalink} className='rounded-[1rem] shadow-md shadow-black-800 group bg-black m-auto overflow-hidden  h-36 w-36'>
            {mediaType == 'VIDEO' && <video muted playsInline autoPlay onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} className='video rounded-[1rem] h-full w-full trans object-cover group-hover:scale-110' src={mediaUrl} alt="" />}
            {(mediaType == 'IMAGE' || mediaType == 'CAROUSEL_ALBUM') && <img alt='' className='h-full w-full trans-slow object-cover group-hover:scale-110 rounded-[1rem]' src={mediaUrl} />}
        </motion.a >
    )
}

export default IGPost