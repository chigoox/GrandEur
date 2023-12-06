import React from 'react'
import IGPost from './IGPost';
import { IGFeedURL } from '@/app/META';
async function getData() {
    try {
        const res = await fetch(IGFeedURL)
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        return res.json()
    } catch (e) {
        console.log("error inside get route", e)
        if (e instanceof Error) {
            return new Response(e.message, { status: 500 });
        }
        return new Response("Internal Server Error", { status: 500 });

    }

}

async function IGFeed() {
    const IGData = await getData()
    const IGPosts = Array.isArray(IGData) ? IGData?.map((instagramPost, index) => (<IGPost key={index} post={instagramPost} />)) : []


    return (
        <div className='grid md:grid-cols-3 md:grid-rows-2 grid-cols-2 overflow-hidden  w-full md:w-fit items-center  gap-2 md:[&>*:nth-child(1)]:relative [&>*:nth-child(1)]:left-14 [&>*:nth-child(1)]:top-14 [&>*:nth-child(3)]:right-14 [&>*:nth-child(3)]:h-64 md:[&>*:nth-child(3)]:h-36  md:[&>*:nth-child(3)]:relative [&>*:nth-child(3)]:bottom-6  md:[&>*:nth-child(2)]:h-64 [&>*:nth-child(2)]:h-64 [&>*:nth-child(2)]:w-40  md:[&>*:nth-child(2)]:w-64  [&>*:nth-child(5)]:h-32 md:[&>*:nth-child(5)]:relative [&>*:nth-child(5)]:bottom-16 [&>*:nth-child(5)]:left-14 [&>*:nth-child(5)]:w-32 md:[&>*:nth-child(4)]:relative [&>*:nth-child(4)]:left-40 [&>*:nth-child(4)]:bottom-14 md:[&>*:nth-child(4)]:h-36 md:[&>*:nth-child(4)]:w-36 [&>*:nth-child(4)]:h-36 [&>*:nth-child(4)]:w-36 [&>*:nth-child(1)]: md:[&>*:nth-child(6)]:relative [&>*:nth-child(6)]:h-40 [&>*:nth-child(6)]:w-40 [&>*:nth-child(6)]:bottom-32 [&>*:nth-child(6)]:right-12'>
            {IGPosts.slice(0, 6)}
        </div>
    )
}

export default IGFeed