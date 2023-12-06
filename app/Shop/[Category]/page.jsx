'use client'
import { categoryLinks } from '@/app/META'
import { usePathname } from 'next/navigation'
import ProductsList from '../Componets/ProductsList'
import ShopCategoryTitle from '../Componets/ShopCategoryTitle'


function CategoryPage() {

    const path = usePathname().match(/\Shop\/(.*)/)[1]


    const validatePath = (path) => {
        let validPath = 'Page does not exist!'
        categoryLinks.forEach((value, index) => {
            if (value == path) {
                validPath = value
            }

        })

        return validPath
    }

    const categoryName = validatePath(path)

    return (
        <div className=' relative min-h-screen flex-col bg-black text-white'>


            <ShopCategoryTitle title={categoryName} />
            <ProductsList category={categoryName} />

        </div>
    )
}

export default CategoryPage
