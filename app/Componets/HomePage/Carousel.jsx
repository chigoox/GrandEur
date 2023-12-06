'use client'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export const EmblaCarousel = ({ img1, img2, img3, img4, rounded, noArrow, dim, text, text2, text3, text4, noZoom, msg1 }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const Slide = ({ rounded, img, dim, text, noZoom }) => {
        return (
            <div className={`embla__slide ${rounded ? 'h-[5rem]' : 'h-full w-full'}   relative`}>
                {text && <div className='text-center w-full h-full text-4xl absolute center text-white font-bold z-[50] drop-shadow-sm shadow-black shadow-md'>{text}</div>}
                {dim && <div className='bg-opacity-25  h-full w-full bg-black absolute top-0'></div>}
                <Image width={1920} height={0} quality={100} className={`h-full  w-full object-cover`} src={img} alt='' />
            </div>

        )
    }

    return (
        <div className="embla relative z-0 shadow-md shadow-black-800 ">
            <div className={`embla__viewport bg-black-800 zoom ${rounded ? 'h-[5rem]' : 'lg:h-[40rem] h-[48rem]'}  overflow-hidden`} ref={emblaRef}>
                <div className="embla__container h-full w-[100vw] relative   gap-4">
                    {img1 && <Slide rounded={rounded} img={img1} text={text} dim={dim} noZoom={noZoom} />}
                    {img2 && <Slide rounded={rounded} img={img2} text={text2} dim={dim} noZoom={noZoom} />}
                    {img3 && <Slide rounded={rounded} img={img3} text={text3} dim={dim} noZoom={noZoom} />}
                    {img4 && <Slide rounded={rounded} img={img4} text={text4} dim={dim} noZoom={noZoom} />}
                </div>
            </div>
            {!noArrow && <div className='absolute z-[99999] top-[50%] between gap-4 p-4 w-full'>
                <button className="embla__prev hover:scale-110 trans scale-100 rounded-full border border-dotted bg-white bg-opacity-50" onClick={scrollPrev}>
                    <AiOutlineArrowLeft size={32} color='white' />
                </button>
                <button className="embla__next hover:scale-110 trans scale-100 rounded-full border border-dotted bg-white bg-opacity-50" onClick={scrollNext}>
                    <AiOutlineArrowRight size={32} color='white' />
                </button>
            </div>}
        </div>
    )
}




export default EmblaCarousel













