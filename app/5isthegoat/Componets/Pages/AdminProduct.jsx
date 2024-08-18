import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { AiFillPlusSquare } from 'react-icons/ai'
import { ProductAddEdit } from '../Support/ProductAddEdit'
import ProductsListAdmin from '../Support/ProductsListAdmin'

export const AdminProduct = () => {
    const [ProductWindow, setProductWindow] = useState(false)
    const [selectedProductData, setSelectedProductData] = useState({})
    const [filter, setFilter] = useState(false)

    return (
        <div>


            {ProductWindow == 'openNew' && <ProductAddEdit setWindow={setProductWindow} openType={'openNew'} />}
            {ProductWindow == 'openEdit' && <ProductAddEdit defualt={selectedProductData} setWindow={setProductWindow} openType={'openEdit'} />}


            <div className='between'>
                <Button onPress={() => { setProductWindow('openNew') }} className='ADD-NEW-BUTTON h-6 mb-10  w-fit p-2 bg-white rounded min-w-0'><AiFillPlusSquare color='blue' size={24} /></Button>
                {['Active'].map(item => {
                    return (
                        <Button onPress={() => { setFilter(filter == item ? false : item) }}>
                            {item}
                        </Button>
                    )
                })}
            </div>
            <div className='TITLE-ROW grid gap-4 border-b grid-cols-3 text-gray-600'>
                {['Product', 'Status', 'Inventory'].map(item => (<div>{item}</div>))}
            </div>
            <ProductsListAdmin window={ProductWindow} filter={filter} setWidow={setProductWindow} setSelectedProductData={setSelectedProductData} />


        </div >
    )
}
