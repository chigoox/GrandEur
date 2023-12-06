import { useCartContext } from '@/StateManager/CartContext'
import { Button } from '@nextui-org/react'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
function ItemQTYButton({ state, setState, product, forCart }) {
    const { dispatch } = useCartContext()
    const [QTY, setQTY] = useState(product?.Qty ? product?.Qty : 0)
    const controlQTY = (action = 'add', count = 1, event) => {
        if (action == 'add') setQTY(prevState => prevState < 99 ? prevState + count : prevState)
        if (action == 'sub') setQTY(prevState => prevState > 0 ? prevState - count : prevState)
        if (action == 'set') setQTY(event.target.value)
        if (product) {
            const currentItemInfo = { images: product.images, name: product.name, price: product.price, variant: product.variant, priceID: product.priceID }
            if (action == 'add') dispatch({ type: "ADD_TO_CART", value: { ...currentItemInfo, Qty: 1 } })
            if (action == 'sub') dispatch({ type: "SUB_FROM_CART", value: { ...currentItemInfo, Qty: 1 } })
            if (action == 'set') dispatch({ type: "SET_CART", value: { ...currentItemInfo, Qty: event.target.value } })
        }

    }


    useEffect(() => {
        if (setState) setState(prev => ({ ...prev, Qty: QTY }))
        if (product?.Qty == 0 && product && forCart) {
            //setQTY()
            dispatch({ type: "REMOVE_FROM_CART", value: product })
        }
    }, [QTY, product?.Qty])
    return (
        <div className="center h-1/2 w-fit m-auto my-2 bg-gray-50 rounded-full  overflow-hidden relative">
            <h1 className={`${forCart ? 'text-white' : ''} font-light absolute w-full text-center -top-5`}>Quntity</h1>
            <Button onClick={() => { controlQTY('sub') }} className="rounded-none rounded-l min-w-0 h-8 w-10  bg-gray-300 center"><MinusIcon /> </Button>
            <input max={2} maxLength={2} onChange={event => controlQTY('set', null, event)} value={product?.Qty ? product?.Qty : QTY} className="w-10 h-8  bg-gray-200 text-center center" placeholder="0" type="number" name="" id="" />
            <Button onClick={() => { controlQTY() }} className=" rounded-none  min-w-0 h-8 w-10 bg-gray-300 center"><PlusIcon /> </Button>

        </div>
    )
}

export default ItemQTYButton