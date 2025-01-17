import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {trendingCoins } from '../../config/api';
import { NavLink } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
import "../../index.css"
export  function addComma(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
const Crousel = () => {

    const {data,isLoading,isFetching} = useQuery({
        queryKey:["crypto"],
        queryFn:()=>trendingCoins(),
        staleTime:1*60*1000,
        keepPreviousData:true,
    })


    const items = data?.map((crypto)=>{
            const profit = Number(crypto?.percent_change_24h).toFixed(3)
            return(
                <NavLink id={crypto.id} to={`/${crypto.id}`} className="flex flex-col items-center gap-1">
                        <img src={`https://www.coinlore.com/img/${crypto.nameid}.png`} alt="" className='h-[5rem] w-[5rem] object-cover'/>
                        <div className='flex gap-3'>
                        <p >{crypto.symbol.toUpperCase()}</p>
                        <p className={`${profit>0?"text-green-500":"text-red-700"} font-bold`}>
                            {profit>0?"+":""}{profit}%
                            </p>
                        </div>
                        <div>
                            <p className='font-bold'>
                                ${addComma(crypto.price_usd)}
                                </p>
                        </div>
                </NavLink>
            )
    })

    return (
                    <>
                      {(isLoading || isFetching) && (
                          <div className="flex flex-col items-center justify-center min-h-screen bg-inherit">
                          <div className="mb-4 text-lg  text-white font-bold animate-bounce">
                           Wait...
                          </div>
                          <div className="relative w-80 h-2 bg-gray-200 rounded-lg overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-yellow-300 animate-loading"></div>
                          </div>
                        </div>
                      )}
                    {
            data  && (
                <div className="h-[50%] flex items-center w-[70%]">
                <AliceCarousel
                    mouseTracking
                    infinite
                    autoPlayInterval={1000}
                    animationDuration={1500}
                    disableDotsControls
                    disableButtonsControls
                    items={items}
                    autoPlay
                    responsive={{
                        0: {
                            items: 1,
                        },
                        600: {
                            items: 2,
                        },
                        1024: {
                            items: 4,
                        },
                    }}
                />
            </div>
            )
        }
            </>
    )   

}

export default Crousel
