'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'


export function NavigationEvents({ setRoute }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        setRoute([pathname, searchParams])
    }, [pathname, searchParams])

    return null
}

export function useNavEvent() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return [pathname, searchParams]
}
