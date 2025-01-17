import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { singleCoin } from '../../config/api'
import { useParams } from 'react-router-dom'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Loading from '../UI/Loading'

const Coinpage = () => {
  const {id} = useParams();  
  const {data,isLoading,error,isError} = useQuery({
    queryKey:['coin-single'],
    queryFn:()=>singleCoin(id)
  })
  if (isLoading){
    return <Loading/>
  }
  else if (isError){
   return  <p >{error}</p>;
  }
  else{
  const chartData = [
    { time: '1h', percentChange: parseFloat(data[0]?.percent_change_1h) },
    { time: '24h', percentChange: parseFloat(data[0]?.percent_change_24h) },
    { time: '7d', percentChange: parseFloat(data[0]?.percent_change_7d) },
  ];

  return ( 
    
      <main className='min-h-lvh pb-20 py-8 w-lvw bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white grid xl:grid-cols-2 place-items-center gap-[2rem] '>
      {data && data.length>0 && (
        <>
      <div className='font-bold flex flex-col gap-2 sm:text-3xl h-fit rounded-md '>
        <div className='flex justify-center'>
          <img src={`https://www.coinlore.com/img/${data[0]?.nameid}.png`} alt="" />
        </div>
        <div className='flex gap-2 justify-center'>
          <p>{data[0]?.name}</p>
          <p>({data[0]?.symbol})</p>
        </div>
          <p>Rank: {data[0]?.rank}</p>
          <p>Current Price: ${Number(data[0]?.price_usd).toFixed(3)}</p>
          <p>1 hour change :
             <span className={`${data[0]?.percent_change_1h>0?"text-green-400":"text-red-600"}`}>
             {data[0]?.percent_change_1h>0?"+":""}
             {data[0]?.percent_change_1h}%
             </span>
             </p>
          <p>24 hours change :
          <span className={`${data[0]?.percent_change_24h>0?"text-green-400":"text-red-600"}`}>
          {data[0]?.percent_change_24h>0?"+":""}
            {data[0]?.percent_change_24h}%
            </span>
          </p>
          <p>Seven days change : 
           <span className={`${data[0]?.percent_change_7d>0?"text-green-400":"text-red-600"}`}>
           {data[0]?.percent_change_7d>0?"+":""}
            {data[0]?.percent_change_7d}%
           </span>
            </p>
          <p>Market Cap : ${(data[0]?.market_cap_usd).toString().slice(0,-9)}B</p>
          {data[0]?.msupply && 
          <p>Market Supply : ${data[0]?.msupply}</p>}
          <p>Circulating Supply : ${Math.round(data[0]?.csupply)}</p>
          <p>Total Supply : ${data[0]?.tsupply}</p>
          <p>Volume : ${(data[0]?.volume24).toFixed(0).slice(0,-9)}B</p>
          <p>Coins Traded : {(data[0]?.volume24a).toFixed(2)} {data[0]?.symbol}</p>
      </div>
      <div className="mt-5 px-4 w-full sm:px-8  text-white">
      <div className="h-[20rem] w-full py-6 pr-3 flex flex-col gap-2 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900" >
        <h3 className="text-2xl tracking-tighter px-4">Percentage Change</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              className="text-sm"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              className="text-sm "
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-gray-800 text-white p-2 shadow-md">
                      <div className="flex flex-col">
                        <span className="text-xs uppercase text-gray-400">
                          Change in {payload[0]?.payload.time}
                        </span>
                        <span className={`${payload[0]?.value>0?"text-green-500":"text-red-600"} font-bold`}>
                          {payload[0]?.value>0?"+":""}%
                          {payload[0]?.value}%
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="percentChange"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  )
}

    </main>
  )
}

}


export default Coinpage
