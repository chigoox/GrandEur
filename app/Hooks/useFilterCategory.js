'use client'
import React, { useEffect, useState } from 'react'
import { category } from '../META';
import { fetchProducts } from '../myCodes/Stripe';

const getData = async (set, category) => {
    category.forEach(async (category) => {
        const data = await fetchProducts(category.replace(/\s/g, ''))
        if (data[0]) set(o => ([...o, category]))

    });
}

function useFilterEmptyCategory(_category = category) {

    const [categoryWithProducts, setCategoryWithProducts] = useState([])
    const filteredCategory = [...new Set(categoryWithProducts)]


    useEffect(() => {
        (async () => {
            await getData(setCategoryWithProducts, _category)
        })()

    }, [])


  return filteredCategory
  
}

export default useFilterEmptyCategory