import React, { useEffect, useState } from 'react'

import { useUploader } from "../Hooks/useUploader"
import { createProduct } from "../myCodes/Stripe"
import { filterObject } from "../myCodes/Util"
import axios from 'axios'
import { message } from 'antd'

export const useCreateProductUtil = async (product, runFunAfter) => {
    //setup Products
    let PRODUCT = { ...product }
    delete PRODUCT.PRICES
    PRODUCT.images = []
    PRODUCT.metadata.tags = PRODUCT.metadata?.tags?.toString()
    //get image url


    for (let index = 0; index < product.images.length; index++) {
        const file = product.images[index];
        const url = await useUploader(file, product.name)
        console.log(url)
        PRODUCT.images.push(url)
        console.log('images uploaded')
        console.log(PRODUCT.images)

    }
    //setup Prices
    let PRICES = Object.values(product.PRICES)
    /*   let allPRICES = [];
      for (let index = 0; index < PRICES.length; index++) {
          allPRICES = [...allPRICES, ...PRICES[index]]
  
      }
  
      PRICES = allPRICES */


    const sendData = async () => {
        const { data } = await axios.post('/api/CreateProduct', {
            productData: PRODUCT,
            priceData: PRICES,
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            })
        return (data)

    }

    if (product.images.length == PRODUCT.images.length || !product.images) try {
        await sendData()
        runFunAfter()
        message.success('Product Created')

    } catch (error) {
        message.error(error.message)

    }

}
export const useUpdateProductUtil = async (product, runFunAfter) => {
    //setup Products
    let PRODUCT = { ...product }
    delete PRODUCT.PRICES
    PRODUCT.images = []
    PRODUCT.metadata.tags = PRODUCT.metadata?.tags?.toString()
    //get image url

    for (let index = 0; index < product.images.length; index++) {
        const file = product.images[index];
        console.log(product.images[index])
        const url = typeof file === 'string' ? file : await useUploader(file, product.name)
        console.log(url)
        PRODUCT.images.push(url)
        console.log('images uploaded')
        console.log(PRODUCT.images)

    }
    //setup Prices
    /*   let PRICES = Object.values(product?.PRICES)
      let allPRICES = [];
      for (let index = 0; index < PRICES.length; index++) {
          allPRICES = [...allPRICES, ...PRICES[index]]
  
      }
  
      PRICES = allPRICES */


    const sendData = async () => {
        const { data } = await axios.post('/api/UpdateProduct', {
            productData: PRODUCT,
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            })
        return (data)

    }
    console.log(product.images.length == PRODUCT.images.length)

    if (product.images.length == PRODUCT.images.length || !product.images) try {
        await sendData()
        runFunAfter()
        message.success('Product Updated')

    } catch (error) {
        message.error(error.message)

    }

}



export const updateBanner = (bannerData) => {
    if (bannerData.title) updateDatabaseItem('Admin', 'Banner', 'title', bannerData.title)
    if (bannerData.link) updateDatabaseItem('Admin', 'Banner', 'link', bannerData.link)
    if (bannerData.message) updateDatabaseItem('Admin', 'Banner', 'message', bannerData.message)


}