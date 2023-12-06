import IMG from "public/Images/image7.jpeg";
import Hat from '../public/Images/IMG_2626.jpg';
import ban1 from '../public/Images/image0.jpeg';
import ban2 from '../public/Images/image9.jpeg';


export const siteName = 'Humaine Grandeur'
export const siteTag = ''
export const siteEmail = 'humainegrandeur@gmail.com'


export const NavBarVideoURL = '7FjL6i04_uY'
export const orderNumberPrefix = 'HGR'
export const category = ['Hoodies', 'T-Shirts', 'Sweatpants', 'Hats']

export const IGFeedURL = 'https://feeds.behold.so/uPB30an9PtEhQZrvqN22'

const img1 = 'https://images.unsplash.com/photo-1697644371824-41d4d0a8a12f?auto=format&fit=crop&q=80&w=3871&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
const img2 = 'https://wwd.com/wp-content/uploads/2016/07/short-shorts-14.jpg?w=1280'
export const bannerImage = [ban1, ban2, '']

export const emailCollectorIMG = IMG

export const categoryLinks = category.map((category) => {
    return category.replace(/\s/g, '')
})

export const HomePageCategoryImages = (category) => {
    switch (category) {
        case 'Hoodies':
            return 'https://images.unsplash.com/photo-1548382983-7f844c6f5ed4?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        case 'Shorts':
            return 'https://cutiebootsboutique.com/cdn/shop/products/GroceriesSnackShorts_1024x1024@2x.jpg?v=1632591666'
        case 'T-Shirts':
            return 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        case 'Sweatpants':
            return 'https://images.unsplash.com/photo-1650461970708-7bf32499516d?q=80&w=3376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        case 'Hats':
            return Hat
        default:
            return 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=2193&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
}










//salePrice category type
