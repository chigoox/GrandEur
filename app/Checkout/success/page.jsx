
import { fetchDocument } from '@/app/myCodes/Database';
import OrderItemPage from './OrderItemPage';

async function success() {

    const orderID = await fetchDocument('Admin', 'Orders')





    return (
        <div className='min-h-screen  overflow-hidden text-white bg-black'>
            <OrderItemPage orderID={orderID?.orderID} />
        </div>
    )
}

export default success