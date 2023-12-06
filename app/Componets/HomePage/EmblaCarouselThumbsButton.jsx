import { Image } from '@nextui-org/react'
import React from 'react'

export const Thumb = (props) => {
    const { selected, imgSrc, index, onClick } = props

    return (
        <div
            className={'emblathumb-thumbs__slide'.concat(
                selected ? ' emblathumb-thumbs__slide--selected' : ''
            )}
        >
            <button
                onClick={onClick}
                className="emblathumb-thumbs__slide__button  shadow-sm relative shadow-black-800 overflow-hidden rounded-full"
                type="button"
            >

                <Image
                    className="emblathumb-thumbs__slide__img object-cover max-md:scale-150 lg:scale-100 md:scale-150 sm:scale-100 "
                    src={imgSrc}
                    alt="Your alt text"

                />
            </button>
        </div>
    )
}
