import { Philosopher } from 'next/font/google'
const font = Philosopher({ subsets: ['latin'], weight: ['400'] })

const ShopCategoryTitle = ({ title }) => (<div className={font.className}>
    <div className='font-bold h-16 w-full my-0 center text-5xl'>
        <h1>{title}</h1>
    </div>
</div>)

export default ShopCategoryTitle