
//import { useRouter } from 'next/navigation'
import CheckoutAgain from './componets/CheckoutAgain'

async function canceled() {




    return (
        <div className='h-auto'>
            <div className='h-96'>
                <h1 className='font-extrabold text-center text-3xl'>You canceled your order.</h1>
                <div className='border p-2 h-auto w-fit m-auto'>
                    <h1>Checkout again</h1>
                    <CheckoutAgain />
                </div>


            </div>








        </div>
    )
}

export default canceled