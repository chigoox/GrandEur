
import EmailCollectorMain from "./Componets/General/EmailCollectorMain";
import EmblaCarousel from "./Componets/HomePage/Carousel";
import HomeProtuctCategories from "./Componets/HomePage/HomeProtuctCategories";
import IGFeed from "./Componets/HomePage/IGFeed";
import { bannerImage } from "./META";
import ProductsList from "./Shop/Componets/ProductsList";

export default function Home() {

  return (
    <main className="flex min-h-screen overflow-x-hidden flex-col items-center justify-evenly bg-black text-white">
      <EmailCollectorMain />

      <EmblaCarousel
        img1={bannerImage[0]}
        text='For the Brave'
        text2='Shop Now!'
        dim={true}
        img2={bannerImage[1]}
        img3={bannerImage[2]}
        img4={bannerImage[3]}
      />




      <div className=" mt-8 w-full md:w-3/4">
        <h1 className="my-2 text-2xl text-center">New Arrivals</h1>
        <ProductsList search={'isNew'} category={'true'} list={true} limit={10} />

      </div>

      <div className=" mt-8 w-full  md:w-3/4">
        <h1 className="my-6  border-4 w-fit m-auto border-dotted p-2 border-spacing-8 font-extrabold text-3xl text-center">SHOP BY CATEGORY</h1>
        <HomeProtuctCategories />
      </div>

      <div className="center-col w-full overflow-hidden mt-32">
        <h1 className="font-thin text-center text-2xl  mb-2">FOLLOW US ON INSTAGRAM</h1>
        <div >

          <IGFeed />
        </div>
      </div>


    </main>
  )
}

