import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import HomeSuperDelicious from '../../Components/HomeSuperDelicious/HomeSuperDelicious'
import HomePopularResturant from '../../Components/HomePopularResturant/HomePopularResturant'
import Testimonial from '../../Components/Testimonial/Testimonial'
import HeroOurBestOrder from '../../Components/HeroOurBestOrder/HeroOurBestOrder'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <HomeSuperDelicious/>
      <HeroOurBestOrder/>
      <HomePopularResturant/>
      <Testimonial/>
    </div>
  )
}

export default Home