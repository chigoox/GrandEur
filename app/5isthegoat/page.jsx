'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, CheckboxGroup, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { message } from "antd"
import { useEffect, useState } from "react"
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai"
import { Uploader } from "../Componets/General/Uploader"
import { category } from "../META"
import { updateDatabaseItem } from "../myCodes/Database"
import { createProduct } from "../myCodes/Stripe"
import { createArray } from "../myCodes/Util"






function Admin() {
    const [priceIDCount, setPriceIDCount] = useState(1)
    const [productData, setProductData] = useState()
    const [priceData, setPriceData] = useState({ for: productData?.productName?.replace(/\s/g, '') })
    const [bannerData, setBannerData] = useState()


    const updateInfo = (event, setter) => {
        console.log(event.target.value, event.target.name)
        const { target } = event
        setter(oldState => ({ ...oldState, [target?.name]: target?.value }))
    }
    const updatePrice = (event, setter, index) => {
        const { target } = event
        setter(oldState => ({ ...oldState, ['price' + index]: { ...oldState['price' + index], [target?.name]: (index == 0 && productData?.price && target?.name == 'amount') ? productData.price : target.value } }))
    }


    if (priceIDCount < 1) setPriceIDCount(1)
    if (priceIDCount > 100) setPriceIDCount(100)
    const updateBanner = () => {
        if (bannerData.title) updateDatabaseItem('Admin', 'Banner', 'title', bannerData.title)
        if (bannerData.link) updateDatabaseItem('Admin', 'Banner', 'link', bannerData.link)
        if (bannerData.message) updateDatabaseItem('Admin', 'Banner', 'message', bannerData.message)


    }
    const create = async () => {
        if (priceData['price0']?.priceName &&
            priceData['price0']?.qty &&
            productData?.productName &&
            productData?.productDesc &&
            productData?.img &&
            productData?.price &&
            productData?.category
        ) {
            try {
                await createProduct(productData, priceData)
                console.log(productData, priceData)
                setProductData({ productName: '', productDesc: '', productFeat: '', category: '', price: '', isNew: false, isBestSelling: false, })
                setPriceData({ price0: { priceName: '', qty: '', amount: '' } })
                setPriceIDCount(1)
                message.success('Item Created', 5)

            } catch (error) {
                console.log(error)
                message.error(error.message, 5)

            }
        } else {
            if (!productData?.productName) message.error('Missing product name', 5)
            if (!productData?.productDesc) message.error('Missing product description', 5)
            if (!productData?.img) message.error('Missing product images', 5)
            if (!productData?.price) message.error('Missing product price', 5)
            if (!productData?.category) message.error('Missing product category', 5)
            if (!priceData['price0']?.priceName) message.error('Missing variant name', 5)
            if (!priceData['price0']?.qty) message.error('Missing variant QTY', 5)
        }
    }




    useEffect(() => { setPriceData(old => ({ ...old, for: productData?.productName?.replace(/\s/g, '') })) }, [productData])

    return (
        <div className="bg-black p-2  md:p-4">

            <Card className="bg-black-800 w-[90%] md:w-[60%] mx-auto">
                <CardHeader className="bg-rose-500 text-white  font-extrabold">
                    <h1 className="text-center text-xl w-full">Product Data</h1>
                </CardHeader>

                <CardBody className="">
                    <Input type="text"
                        onChange={(event) => { updateInfo(event, setProductData) }}
                        value={productData?.productName}
                        placements={'inside'}
                        variant="flat"
                        name={'productName'}
                        label={'Product name'}
                        className="w-64 m-auto"
                    />
                    <Textarea
                        className="text-pink-500"
                        variant="flat"
                        label="description"
                        name="productDesc"
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        value={productData?.productDesc}
                        onChange={(event) => { updateInfo(event, setProductData) }}
                    />

                    <div className="border p-2 my-4 center-col gap-2">
                        <h1 className="text-white font-extrabold">Metadata</h1>

                        <Select
                            //onChange={({ target }) => { console.log(target.name.replace(/\s/g, '')) }}
                            onChange={(event) => { updateInfo(event, setProductData) }}
                            labelPlacement={'outside'}
                            label="Select Category"
                            className="max-w-xs my-8"
                            name={'category'}
                        >
                            {category.map((category) => {
                                return (
                                    <SelectItem key={category.replace(/\s/g, '')} name={category}>
                                        {category}
                                    </SelectItem>
                                )
                            })}
                        </Select>


                        <Input type="number"
                            onChange={(event) => { updateInfo(event, setProductData) }}
                            placements={'inside'}
                            variant="flat"
                            value={productData?.price}
                            name={'price'}
                            label={'Price'}
                            className="w-64 m-auto"
                        />

                        <CheckboxGroup
                            lable='select options'
                            className="text-white"
                            value={productData?.checkbox}
                            onValueChange={(value) => { setProductData((old) => { return ({ ...old, isNew: value.includes('isNew') ? true : false, isBestSelling: value.includes('isBestSelling') ? true : false, checkbox: value }) }) }}
                        >
                            <Checkbox value={'isNew'} >       <h1 className="text-white">isNew</h1></Checkbox>
                            <Checkbox value={'isBestSelling'}><h1 className="text-white">isBestSelling</h1></Checkbox>
                        </CheckboxGroup>

                    </div>

                    <Textarea
                        className="text-white"
                        variant="underlined"
                        label="Features"
                        name="productFeat"
                        labelPlacement="outside"
                        placeholder="Enter features seperate by commas"
                        value={productData?.productFeat}
                        onChange={(event) => { updateInfo(event, setProductData) }}
                    />
                    <h1 className="text-red-500 text-center font-extrabold text-2xl">Images</h1>
                    <Uploader setProductData={setProductData} folderName={'productImages'} />

                    <h1 className="text-white text-center font-extrabold text-4xl my-4">Price Data</h1>
                    <div className="border-2 w-full h-1"></div>

                    <div className="flex justify-center items-center gap-2 md:w-1/2 m-auto">
                        <Button onPress={() => { setPriceIDCount(o => o - 1) }} className="h-10 w-8 bg-gradient-to-t  from-rose-500 to-rose-950">
                            <AiFillMinusCircle size={20} color="red" />
                        </Button>
                        <Input

                            type="number"
                            className="w-auto p-0  my-4 "
                            onValueChange={setPriceIDCount}
                            value={priceIDCount}

                        />
                        <Button onPress={() => { setPriceIDCount(o => o + 1) }} className="h-10 w-10 bg-gradient-to-t from-lime-500 to-lime-950">
                            <AiFillPlusCircle color="lime" opacity={30} size={20} />
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 overflow-hidden shadow-md shadow-black rounded-2xl bg-gradient-to-t from-[#131313] via-pink-900 to-[#131313] bg-opacity-25 md:grid-cols-2 p-4 lg:grid-cols-3 grid-flow-row gap-2">
                        {createArray(priceIDCount).map((_priceData, index) => {
                            return (
                                <Card key={index} className="w-auto h-auto m-auto  bg-gray-300">
                                    <CardHeader className="bg-red-500"></CardHeader>
                                    <CardBody className="flex-col gap-2">
                                        <Input type="text"
                                            onChange={(event) => { updatePrice(event, setPriceData, index) }}
                                            placements={'inside'}
                                            variant="flat"
                                            name={`priceName`}
                                            label={'Variant Name'}
                                            className=" m-auto"
                                        />
                                        <Input type="number"
                                            onChange={(event) => { updatePrice(event, setPriceData, index) }}
                                            placements={'inside'}
                                            variant="flat"
                                            name={'amount'}
                                            label={'Variant price'}
                                            className=" m-auto"
                                        />
                                        <Input type="number"
                                            onChange={(event) => { updatePrice(event, setPriceData, index) }}
                                            placements={'inside'}
                                            variant="flat"
                                            name={'qty'}
                                            label={'Variant QTY'}
                                            className=" m-auto"


                                        />
                                    </CardBody>
                                    <CardFooter>

                                    </CardFooter>

                                </Card>
                            )
                        })}
                    </div>





                </CardBody>
                <CardFooter className="center bg-rose-500">
                    <Button onPress={create} className="h-14 w-3/4 font-extrabold text-2xl" >
                        Create Product
                    </Button>
                </CardFooter>
            </Card>




            <Card className="bg-black-800 w-[90%] mt-4 md:w-[60%] mx-auto  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
                <CardHeader className="bg-blue-700 text-white  font-extrabold">
                    <h1 className="text-center text-xl w-full">Banner Data</h1>
                </CardHeader>

                <CardBody className="center-col gap-2">
                    <Input type="text"
                        onChange={(event) => { updateInfo(event, setBannerData) }}
                        placements={'inside'}
                        variant="flat"
                        name={`title`}
                        label={'Link title'}
                        className=" m-auto"
                    />
                    <Input type="text"
                        onChange={(event) => { updateInfo(event, setBannerData) }}
                        placements={'inside'}
                        variant="flat"
                        name={`message`}
                        label={'Message'}
                        className=" m-auto"
                    />
                    <Input type="text"
                        onChange={(event) => { updateInfo(event, setBannerData) }}
                        placements={'inside'}
                        variant="flat"
                        name={`link`}
                        label={'Link'}
                        className=" m-auto"
                    />

                </CardBody>
                <CardFooter className="center">
                    <Button onPress={updateBanner} className="h-14 w-3/4 font-extrabold text-2xl bg-blue-700 text-white" >
                        Update Banner
                    </Button>
                </CardFooter>
            </Card>




        </div>
    )
}

export default Admin


/* 

        metadata: priceMeta,
        nickname: priceName,
        unit_amount: priceAmount * 100,


*/