import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { Thumb } from './EmblaCarouselThumbsButton'
import { imageByIndex } from './imageByIndex'

const EmblaCarouselThumb = ({ slides, options }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const onThumbClick = useCallback(
        (index) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
    }, [emblaMainApi, onSelect])
    return (
        <div className="emblathumb">
            <div className="emblathumb__viewport overflow-hidden rounded  w-full md:w-[30rem] shadow-md shadow-black-800" ref={emblaMainRef}>
                <div className="emblathumb__container ">
                    {slides?.map((value, index) => (
                        <div className="emblathumb__slide" key={index}>
                            <img
                                className="emblathumb__slide__img"
                                src={imageByIndex(index, slides)}
                                alt="Your alt text"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="emblathumb-thumbs border-y p-2 w-full md:w-96 m-auto">
                <div className="emblathumb-thumbs__viewport" ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container flex">
                        {slides?.map((value, index) => (
                            <Thumb
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                index={index}
                                imgSrc={imageByIndex(index, slides)}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmblaCarouselThumb
