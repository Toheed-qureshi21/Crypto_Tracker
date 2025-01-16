import React from 'react'
import Banner from '../UI/Banner'
import Crousel from '../UI/Crousel'
import CoinsTable from '../UI/CoinsTable'

const Homepage = () => {
  return (
    <main className='min-h-screen h-auto  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900'>
       <section id='banner' className='h-[60vh] w-full flex flex-col items-center justify-center gap-[2rem]  text-white'>
      <Banner/>
      <Crousel/>
       </section>
       <section className='h-auto w-full  flex flex-col items-center max-sm:px-[1rem] text-white gap-12'>
        <p className='text-2xl'>Cryptocurrency Prices by Market Cap</p>
        <CoinsTable/>
       </section>
    </main>
  )
}

export default Homepage
