import axios from "axios"




export const sendMail = async (shippinginfo, email, subject, JSXBody, emailData, orderID) => {
   
    const { data } = await axios.post('/api/Emails/send', {
      shippinginfo: shippinginfo,
      email: email,
      subject: subject,
      JSXBody: JSXBody,
      emailData: emailData,
      orderID: orderID,
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