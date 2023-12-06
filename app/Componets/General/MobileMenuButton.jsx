'use client'

function MenuButton({ menuOpen }) {
    return (
        <div className='p-2 scale-75 flex flex-col gap-2 justify-center  trans-slow w-fit h-fit'>

            <div className='group hover:scale-110 trans z-50 flex flex-col gap-2 justify-center m-auto'>
                <div className={`group-hover:w-10 group-hover:bg-rose-600 relative ${menuOpen ? 'rotate-[-50deg] w-10 top-3 group-hover:w-12' : 'w-6 rotate-0 top-0'} h-1 bg-white trans mx-4 `}></div>

                <div className={`group-hover:w-10  w-4 h-1 trans ${menuOpen ? ' bg-opacity-0' : 'group-hover:bg-rose-600 bg-white'} bg-white  mx-4`}></div>

                <div className={` w-10 trans h-1 relative bg-white  group-hover:bg-rose-600 mx-4 ${menuOpen ? 'rotate-[50deg] bottom-3 group-hover:w-12' : 'bottom-0 rotate-0'}`}></div>
            </div>

        </div>
    )
}

export default MenuButton