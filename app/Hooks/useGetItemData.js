'use client'
import { fetchProducts } from "@/app/myCodes/Stripe"
import { useEffect, useState } from "react"



const fetchData = async (fetchThis) => {
  const data = await fetchProducts(fetchThis)
  return data
}



export function useGetItemData(_fetchData) {
    const [itemData, setItemData] = useState()

  useEffect(() => {
    const getData = async () => {
      typeof(_fetchData) == String  ? setItemData(await fetchData(_fetchData)) : setItemData(await _fetchData())
    }
    getData()

}, [])

return itemData
}
