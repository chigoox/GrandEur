
import { fetchDocument } from '@/app/myCodes/Database'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import './colors.css'

function Banner({ message, link, linkMessage, linkColor }) {

    const [bannerInfo, setBannerInfo] = useState({})

    useEffect(() => {
        fetchDocument('Admin', 'Banner').then(
            (data) => {
                setBannerInfo(data)
            }
        )


    }, [])




    return (
        <div className='center gap-0 text-sm '>
            <Link href={bannerInfo?.link ? bannerInfo?.link : '/'}><p className={`${linkColor}`}>{bannerInfo?.title}</p></Link>
            <p className='text-white w-2'>:</p>
            <p className='text-white'>{bannerInfo?.message}</p>
        </div>
    )
}
//

export default Banner