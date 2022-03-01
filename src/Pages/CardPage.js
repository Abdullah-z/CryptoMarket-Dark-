import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { NavLink, useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CardPage() {
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
  
     

      <section className="text-gray-400 bg-gray-900 body-font">
       <Header view={"Table View"} link={"/table"}></Header>
        <div className="container mx-auto flex flex-col px-5 py-6 justify-center items-center">
          <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-center">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
                Coins Prices
              </h1>
            </div>

            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              type="text"
              id="hero-field"
              name="hero-field"
              autoComplete="off"
              className="text-center w-half bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4 text-center">
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                      <div className="border-2  bg-gray-800 bg-opacity-40 border-gray-800 px-4 py-6 rounded-lg">
                        <img
                          alt="team"
                          className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                          src={row.image}
                        />
                        <h2 className="title-font font-medium text-3xl text-white">
                        <NavLink to={"/coins/" + row.id}>
                            {symbol}{row.current_price}
                          </NavLink>
                        </h2>
                        <p className="leading-relaxed">
                          <NavLink to={"/coins/" + row.id}>
                            {row.name}({row.symbol})
                          </NavLink>
                        </p>
                        {row.price_change_percentage_24h < 0 ? (
                          <p className="text-red-600 px-4  py-3">
                            &#9660; {row.price_change_percentage_24h.toFixed(2)}
                            %
                          </p>
                        ) : (
                          <p className="text-lime-600  px-4  py-3">
                            &#9650; {row.price_change_percentage_24h.toFixed(2)}
                            %
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    
  );
}
