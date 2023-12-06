import axios from 'axios'
export const fetchProducts = async (category, setterfunction = null, limit, search) => {
    const { data } = await axios.post('/api/fetchProducts', {
      category: category ? category : undefined,
      limit: limit ? limit: 25,
      search: search
      
    },
      {
        headers: {
          "Content-Type": "application/json",
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
    if (setterfunction) setterfunction(data)
    return (data)
  }

 

  export const createProduct = async (productData, priceData) => {
    const { data } = await axios.post('/api/CreateProduct', {
      productData: productData,
      priceData: priceData,
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

export const fetchPricesFor = async (nameNoSpace, setterfunction) => {
    const { data } = await axios.post('/api/fetchPrices', {
      name: nameNoSpace
    },
      {
        headers: {
          "Content-Type": "application/json",
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
    if (setterfunction) setterfunction(data)
    return (data)
  }


  
  export const checkout = async (event , cart, userID) => {
    event.preventDefault();
    const { data } = await axios.post('/api/Checkout',
      {
        cart: cart,
        UID: userID
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data)
  }