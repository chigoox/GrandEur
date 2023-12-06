import { siteName } from '@/app/META';
import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from '@react-email/components';
import { format } from 'date-fns';

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

function EmailOrderSuccessful({ shippinginfo, emailData, orderID }) {
    const cart = emailData.lineItems
    const total = emailData.total
    console.log(cart)
    const { firstName, lastName, address } = shippinginfo
    const date = new Date()
    return (
        <Html>
            <Head />
            <Preview>Get your order summary, estimated delivery date and more</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={track.container}>
                        <Row>
                            <Column>
                                <Text style={global.paragraphWithBold}>Tracking Number</Text>
                                <Text style={track.number}>Coming soon...</Text>
                            </Column>
                            <Column align="right">
                                <Link style={global.button}>Track Package</Link>
                            </Column>
                        </Row>
                    </Section>
                    <Hr style={global.hr} />
                    <Section style={message}>
                        <h1 className='font-bold'>{siteName}</h1>
                        <Heading style={global.heading}>It's On Its Way.</Heading>
                        <Text style={global.text}>
                            Your order is on its way. Use the link above to track its progress.
                        </Text>
                        <Text style={{ ...global.text, marginTop: 24 }}>
                            We´ve also charged your payment method for the cost of your order
                            and will be removing any authorization holds. For payment details,
                            please visit your Orders page on the website.
                        </Text>
                    </Section>
                    <Hr style={global.hr} />
                    <Section style={global.defaultPadding}>
                        <Text style={adressTitle}>Shipping to: {firstName} {lastName}</Text>
                        <Text style={{ ...global.text, fontSize: 14 }}>
                            {address.replace('.', '')}, {shippinginfo?.zipcode}
                        </Text>
                    </Section>
                    <Hr style={global.hr} />
                    <Section
                        style={{ ...paddingX, paddingTop: '40px', paddingBottom: '40px' }}
                    >
                        {Object.values(cart).map((order) => {
                            return (
                                <Row>
                                    <Column>
                                        <Img
                                            src={order.images[0]}
                                            alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                                            style={{ float: 'left' }}
                                            width="260px"
                                        />
                                    </Column>
                                    <Column style={{ verticalAlign: 'top', paddingLeft: '12px' }}>
                                        <Text style={{ ...paragraph, fontWeight: '500' }}>
                                            {order.name}
                                        </Text>

                                        <Text style={{ ...paragraph, fontWeight: '500' }}>
                                            ${order.price}
                                        </Text>
                                        <Text style={{ ...paragraph, fontWeight: '500' }}>
                                            Qty: {order.Qty}
                                        </Text>
                                    </Column>
                                </Row>
                            )
                        })}
                    </Section>
                    <Hr style={global.hr} />
                    <Section style={global.defaultPadding}>
                        <Row style={{ display: 'inline-flex', marginBottom: 40 }}>
                            <Column style={{ width: '170px' }}>
                                <Text style={global.paragraphWithBold}>Order Number</Text>
                                <Text style={track.number}>{orderID}</Text>
                            </Column>
                            <Column>
                                <Text style={global.paragraphWithBold}>Order Date</Text>
                                <Text style={track.number}>{format(date, 'MM-dd-yy')}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column align="center">
                                <Link style={global.button}>Order Status</Link>
                            </Column>
                        </Row>
                    </Section>
                    <Hr style={global.hr} />

                    <Hr style={global.hr} />

                    <Hr style={global.hr} />

                    <Hr style={{ ...global.hr, marginTop: '12px' }} />
                    <Section style={paddingY}>
                        <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30, }}>
                            Please contact us if you have any questions. (If you reply to this
                            email, we won't be able to see it.)
                        </Text>
                        <Text style={footer.text}>
                            © 2022 {siteName}, Inc. All Rights Reserved.
                        </Text>

                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

export default EmailOrderSuccessful


const paddingX = {
    paddingLeft: '40px',
    paddingRight: '40px',
};

const paddingY = {
    paddingTop: '22px',
    paddingBottom: '22px',
};

const paragraph = {
    margin: '0',
    lineHeight: '2',
};

const global = {
    paddingX,
    paddingY,
    defaultPadding: {
        ...paddingX,
        ...paddingY,
    },
    paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
    heading: {
        fontSize: '32px',
        lineHeight: '1.3',
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: '-1px',
    },
    text: {
        ...paragraph,
        color: '#747474',
        fontWeight: '500',
    },
    button: {
        border: '1px solid #929292',
        fontSize: '16px',
        textDecoration: 'none',
        padding: '10px 0px',
        width: '220px',
        display: 'block',
        textAlign: 'center',
        fontWeight: 500,
        color: '#000',
    },
    hr: {
        borderColor: '#E5E5E5',
        margin: '0',
    },
};

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '10px auto',
    width: '600px',
    border: '1px solid #E5E5E5',
};

const track = {
    container: {
        padding: '22px 40px',
        backgroundColor: '#F7F7F7',
    },
    number: {
        margin: '12px 0 0 0',
        fontWeight: 500,
        lineHeight: '1.4',
        color: '#6F6F6F',
    },
};

const message = {
    padding: '40px 74px',
    textAlign: 'center',
}
const adressTitle = {
    ...paragraph,
    fontSize: '15px',
    fontWeight: 'bold',
};

const recomendationsText = {
    margin: '0',
    fontSize: '15px',
    lineHeight: '1',
    paddingLeft: '10px',
    paddingRight: '10px',
};

const recomendations = {
    container: {
        padding: '20px 0',
    },
    product: {
        verticalAlign: 'top',
        textAlign: 'left',
        paddingLeft: '2px',
        paddingRight: '2px',
    },
    title: { ...recomendationsText, paddingTop: '12px', fontWeight: '500' },
    text: {
        ...recomendationsText,
        paddingTop: '4px',
        color: '#747474',
    },
};

const menu = {
    container: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px',
        backgroundColor: '#F7F7F7',
    },
    content: {
        ...paddingY,
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    title: {
        paddingLeft: '20px',
        paddingRight: '20px',
        fontWeight: 'bold',
    },
    text: {
        fontSize: '13.5px',
        marginTop: 0,
        fontWeight: 500,
        color: '#000',
    },
    tel: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '32px',
        paddingBottom: '22px',
    },
};

const categories = {
    container: {
        width: '370px',
        margin: 'auto',
        paddingTop: '12px',
    },
    text: {
        fontWeight: '500',
        color: '#000',
    },
};

const footer = {
    policy: {
        width: '166px',
        margin: 'auto',
    },
    text: {
        margin: '0',
        color: '#AFAFAF',
        fontSize: '13px',
        textAlign: 'center',
    },
};