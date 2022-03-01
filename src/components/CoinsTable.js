import React, { useEffect, useState } from "react";
import Header from "./Header"

import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { NavLink, useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";






export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
 

  const { currency, symbol } = CryptoState();

  const navigate = useHistory();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (

    <div>
   
     
    
    <section class="text-gray-400 bg-gray-900 body-font">

      <div class="container mx-auto flex flex-col px-5 py-6 justify-center items-center">
        <div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-center">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
              Coins Prices
            </h1>
          </div>

          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            type="text"
            id="hero-field"
            autoComplete="off"
            name="hero-field"
            class=" text-center w-half bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <div class="lg:w-2/3 w-full mx-auto overflow-auto my-4">
            <table class="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
                    Logo
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Name
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Price
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Change (24h)
                  </th>
                  <th class="w-10 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tr rounded-br">
                    Volume
                  </th>
                </tr>
              </thead>

              {handleSearch().map((row) => {
                const profit = row.price_change_percentage_24h > 0;

                return (
                  <tbody>
                    <tr>
                      <td className="border-t-2 border-gray-800 px-4 py-3">
                        {" "}
                        <img
                          alt="team"
                          className="w-12 h-12 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                          src={row.image}
                        />
                      </td>
                      <td className="border-t-2 border-gray-800 px-4 py-3">

                      <NavLink to={"/coins/" + row.id }>     {row.name} ({row.symbol})</NavLink>

                        
                      </td>
                      <td className="border-t-2 border-gray-800 px-4 py-3">
                        {symbol}{numberWithCommas(row.current_price)}
                      </td>
                      {row.price_change_percentage_24h < 0 ? (
                        <td className="text-red-600 border-t-2 border-gray-800 px-4  py-3">
                          &#9660; {row.price_change_percentage_24h.toFixed(2)}%
                        </td>
                      ) : (
                        <td className="text-lime-600 border-t-2 border-gray-800 px-4  py-3">
                          &#9650; {row.price_change_percentage_24h.toFixed(2)}%
                        </td>
                      )}
                      <td className="border-t-2 border-gray-800 px-4 py-3">
                        {symbol}{numberWithCommas(row.total_volume)}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        )}
      </div>
    </section>
    </div>
  );
}
