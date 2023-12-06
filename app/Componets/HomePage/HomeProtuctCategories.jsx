'use client'
import useFilterEmptyCategory from '@/app/Hooks/useFilterCategory';
import Image from "next/image";
import { motion } from "framer-motion";
import { HomePageCategoryImages } from '@/app/META';
import Link from "next/link";

const HomeProtuctCategories = () => {
    const category = useFilterEmptyCategory()
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.5
            }}
            whileInView={{
                opacity: 1,
                transition: {
                    type: "spring",
                    duration: 3
                },
                scale: 1
            }}
            viewport={{ once: true }}


            className="grid grid-cols-2 md:grid-cols-4 items-center justify-center   w-full h-80 relative">
            {category.map((category) => (
                <Link key={category} href={`/Shop/${category.includes('Hot') ? 'HotTools' : category.replace(/\s/g, '')}`} className=" hover:border-white hover:font-extrabold  trans-fast  drop-shadow-md shadow-black m-auto overflow-hidden rounded-full md:w-[50%] md:h-[100%] border-gray-900 border-2  w-[50%] h-[70%] relative">
                    <Image width='300' height='900' className='h-full w-full  object-cover'
                        src={HomePageCategoryImages(category)} alt="" />
                    <div className="absolute top-0 m-auto h-full center w-full">
                        <h1 className="text-white text-2xl text-center center  w-full h-full  bg-opacity-50 bg-black">{category}</h1>
                    </div>
                </Link>
            ))}
        </motion.div>
    )
}

export default HomeProtuctCategories