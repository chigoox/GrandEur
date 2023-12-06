'use client'
import useembla2Carousel from 'embla-carousel-react'
import { useCallback } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export const EmblaCarousel2 = ({ img1, img2, img3, img4, square }) => {
    const [embla2Ref, embla2Api] = useembla2Carousel({ loop: true })

    const scrollPrev = useCallback(() => {
        if (embla2Api) embla2Api.scrollPrev()
    }, [embla2Api])

    const scrollNext = useCallback(() => {
        if (embla2Api) embla2Api.scrollNext()
    }, [embla2Api])

    return (
        <div className="embla2 relative z-0">
            <div className="embla2__viewport  h-[14rem] md:[20rem] lg:h-[40rem]" ref={embla2Ref}>
                <div className="embla2__container h-full w-full  ">
                    {img1 &&
                        <div className="embla2__slide center"><img className='embla2__slide__img' src={img1} alt="" /></div>}
                    {img2 &&
                        <div className="embla2__slide center"><img className='embla2__slide__img ' src={img2} alt="" /></div>}
                    {img3 &&
                        <div className="embla2__slide center"><img className='embla2__slide__img' src={img3} alt="" /></div>}
                    {img4 &&
                        <div className="embla2__slide center"><img className='embla2__slide__img' src={img4} alt="" /></div>}
                </div>
            </div>
            <div className='absolute top-[20%] between gap-4 z-[99] p-4 w-full'>
                <button className="embla2__prev hover:scale-110 trans scale-100 rounded-full border border-dotted bg-white bg-opacity-50" onClick={scrollPrev}>
                    <AiOutlineArrowLeft size={32} color='white' />
                </button>
                <button className="embla2__next hover:scale-110 trans scale-100 rounded-full border border-dotted bg-white bg-opacity-50" onClick={scrollNext}>
                    <AiOutlineArrowRight size={32} color='white' />
                </button>
            </div>
        </div>
    )
}




export default EmblaCarousel2













