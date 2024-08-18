import React from 'react'
import { PropagateLoader } from 'react-spinners'

function Loading({ contain }) {
    return (
        <div className={`${contain ? 'h-full w-full absolute' : 'h-screen w-screen fixed'} top-0 left-0  bg-black overflow-hidden z-[9999999999] center-col bg-opacity-75`}>
            <PropagateLoader
                color="white"
                size={32}
            />
            <h1 className='text-white mt-8 text-center w-full text-3xl font-bold'>Loading</h1>
        </div>
    )
}

export default Loading