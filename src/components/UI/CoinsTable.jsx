import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, {useState } from 'react';
import { coinList } from '../../config/api';
import { addComma } from './Crousel';
import { NavLink } from 'react-router-dom';

const CoinsTable = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0);
  const { data, } = useQuery({
    queryKey: ['table-coins', page],
    queryFn: ()=>coinList(page),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData
  });
  const searchedData = data?.filter((curr) => {
    return curr.name.toLowerCase().includes(search.toLowerCase()) || curr.symbol.toLowerCase().includes(search.toLowerCase())
  });

  return (
    <>
  <div className="relative w-full max-w-xs ">
  <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" id="outlined_success" aria-describedby="outlined_success_help" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-zinc-950 rounded-lg border-1 border-green-600 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " />
  <label for="outlined_success" className="absolute text-lg text-green-600 dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.3rem] start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Search for crypto</label>
</div>

      <div className="w-full ">
        <table className="w-[80%] mx-auto bg-zinc-600 text-left table-auto table-layout-auto border-collapse">
          <thead>
            <tr className="text-black w-full bg-yellow-400 h-[3rem]">
              <th className="px-4 py-2">Coin</th>
              <th className="px-4 py-2 text-center">Price</th>
              <th className="px-4 py-2 text-center">Changes</th>
              <th className="px-4 py-2 text-right max-sm:hidden">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {searchedData &&
              searchedData?.map((coin) => {
                const profit = coin?.percent_change_24h
                ;
        
            return (
            <tr
              key={coin.id}
              className="font-bold text-white bg-zinc-800 border-b border-zinc-700 hover:bg-zinc-700 cursor-pointer"
            >
              <NavLink
                to={`/${coin.id}`}
                className="contents" 
              >
                <td className="px-4 py-4 flex items-center gap-4">
                  <img
                    src={`https://www.coinlore.com/img/${coin.nameid}.png`}
                    alt={coin?.name}
                    className="h-[2.5rem] w-[2.5rem] object-cover"
                  />
                  <div className="flex flex-col">
                    <span>{coin?.symbol}</span>
                    <span className="text-sm text-gray-400 w-[10rem] truncate">
                      {coin?.name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4 text-center">
                  ${coin?.price_usd}
                </td>

                <td
                  className={`px-4 py-4 text-center ${profit > 0 ? 'text-green-400' : 'text-red-500'
                    }`}
                >
                  {profit > 0 ? '+' : ''}
                  {profit}%
                </td>

                <td className="px-4 py-4 text-right max-sm:hidden">
                  ${addComma(coin?.market_cap_usd.toString().slice(0, -9))}B
                </td>
              </NavLink>
            </tr>
            );
              })}

          </tbody>
        </table>
        <div className='w-full text-center my-8 flex gap-4 justify-center items-center'>
          <button onClick={() => setPage(page - 3)} className='py-2 px-6 bg-green-800 rounded-md hover:bg-green-900' disabled={page < 2}>Previous</button>
          <p>{Math.floor(page / 3) + 1}</p>
          <button onClick={() => setPage(page + 3)} className='py-2 px-6 bg-green-800 rounded-md hover:bg-green-900' disabled={page>24}>Next</button>
        </div>
      </div>
    </>

  );
};

export default CoinsTable;

{
  /* return (
                  <tr
                    key={coin.id}
                    className="font-bold text-white bg-zinc-800 border-b border-zinc-700 hover:bg-zinc-700 cursor-pointer"
                  >
                    <NavLink
                      to={`/coins/${coin.id}`}
                      className="contents" // Ensures NavLink does not disrupt table structure
                    >
                      <td className="px-4 py-4 flex items-center gap-4">
                        <img
                          src={coin?.image}
                          alt={coin?.name}
                          className="h-[2.5rem] w-[2.5rem] object-cover"
                        />
                        <div className="flex flex-col">
                          <span>{coin?.symbol?.toUpperCase()}</span>
                          <span className="text-sm text-gray-400 w-[10rem] truncate">
                            {coin?.name}
                          </span>
                        </div>
                      </td>
  
                      <td className="px-4 py-4 text-center">
                        {symbol} {coin?.current_price}
                      </td>
  
                      <td
                        className={`px-4 py-4 text-center ${
                          profit > 0 ? 'text-green-400' : 'text-red-500'
                        }`}
                      >
                        {profit > 0 ? '+' : ''}
                        {profit}%
                      </td>
  
                      <td className="px-4 py-4 text-right">
                        {addComma(coin?.market_cap.toString().slice(0, -9))}B
                      </td>
                    </NavLink>
                  </tr>
                ); */}