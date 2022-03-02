import Header from "../components/Header";
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { lightBlue } from "@material-ui/core/colors";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 var pcurrency=  "." + currency.toLowerCase()
 console.log(pcurrency)


  if (!coin) return <LinearProgress style={{ backgroundColor: lightBlue }} />;
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <Header link="/" view="Home"></Header>

      <div className="container px-5 py-4 mx-auto flex flex-wrap">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            <div className="container mx-auto flex px-5 py-4 items-center justify-center flex-col">
              <img
                className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                alt="hero"
                src={coin?.image.large}
              />
              <div className=" lg:w-2/3 w-full">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                  {coin?.name}
                </h1>
                <p className="leading-relaxed mb-8">
                  {ReactHtmlParser(coin?.description.en.split(". ")[0])}
                </p>

                <h1 className="title-font sm:text-2xl text-2xl mb-4 font-medium text-white">
                  Current Price: {symbol}
                  {numberWithCommas(
                    coin?.market_data.current_price[currency.toLowerCase()]
                  )}
                </h1>

                <h1 className="title-font sm:text-2xl text-2xl mb-4 font-medium text-white">
                  Market Capital: {symbol}
                  {numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}
                  M
                </h1>
              </div>
            </div>
          </div>
          <div className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12">
            <CoinInfo coin={coin} />
          </div>
        </div>
      </div>

      <div className="container px-5 py-4 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Percentage Price Change
          </h1>
        </div>

        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/6 sm:w-1/2 w-full">
            <div className="bg-gray-800 bg-opacity-40 border-2 border-gray-800 px-4 py-6 rounded-lg">
              {coin.market_data.price_change_percentage_1h_in_currency.usd <
              0 ? (
                <h2 className="text-red-600 title-font font-medium text-3xl">
                  &#9660;{" "}
                  {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              ) : (
                <h2 className="text-lime-600 title-font font-medium text-3xl">
                  &#9650;{" "}
                  {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              )}
              <p className="leading-relaxed">Last 1 Hour</p>
            </div>
          </div>
          <div className="p-4 md:w-1/6 sm:w-1/2 w-full">
            <div className="bg-gray-800 bg-opacity-40 border-2 border-gray-800 px-4 py-6 rounded-lg">
              {coin.market_data.price_change_percentage_24h_in_currency.usd <
              0 ? (
                <h2 className="text-red-600 title-font font-medium text-3xl">
                  &#9660;{" "}
                  {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              ) : (
                <h2 className="text-lime-600 title-font font-medium text-3xl">
                  &#9650;{" "}
                  {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              )}
              <p className="leading-relaxed">Last 24 Hours</p>
            </div>
          </div>
          <div className="p-4 md:w-1/6 sm:w-1/2 w-full">
            <div className="bg-gray-800 bg-opacity-40 border-2 border-gray-800 px-4 py-6 rounded-lg">
              {coin.market_data.price_change_percentage_7d_in_currency.usd <
              0 ? (
                <h2 className="text-red-600 title-font font-medium text-3xl">
                  &#9660;{" "}
                  {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              ) : (
                <h2 className="text-lime-600 title-font font-medium text-3xl">
                  &#9650;{" "}
                  {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              )}
              <p className="leading-relaxed">Last 7 Days</p>
            </div>
          </div>
          <div className="p-4 md:w-1/6 sm:w-1/2 w-full">
            <div className="bg-gray-800 bg-opacity-40 border-2 border-gray-800 px-4 py-6 rounded-lg">
              {coin.market_data.price_change_percentage_14d_in_currency.usd <
              0 ? (
                <h2 className="text-red-600 title-font font-medium text-3xl">
                  &#9660;{" "}
                  {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              ) : (
                <h2 className="text-lime-600 title-font font-medium text-3xl">
                  &#9650;{" "}
                  {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              )}
              <p className="leading-relaxed">Last 14 Days</p>
            </div>
          </div>
          <div className="p-4 md:w-1/6 sm:w-1/2 w-full">
            <div className="bg-gray-800 bg-opacity-40 border-2 border-gray-800 px-4 py-6 rounded-lg">
              {coin.market_data.price_change_percentage_30d_in_currency.usd <
              0 ? (
                <h2 className="text-red-600 title-font font-medium text-3xl">
                  &#9660;{" "}
                  {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              ) : (
                <h2 className="text-lime-600 title-font font-medium text-3xl">
                  &#9650;{" "}
                  {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              )}
              <p className="leading-relaxed">Last 30 Days</p>
            </div>
          </div>

          <div className="p-4 md:w-1/6 sm:w-1/2 w-full">
            <div className="bg-gray-800 bg-opacity-40 border-2 border-gray-800 px-4 py-6 rounded-lg">
              {coin.market_data.price_change_percentage_1y_in_currency.usd <
              0 ? (
                <h2 className="text-red-600 title-font font-medium text-3xl">
                  &#9660;{" "}
                  {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              ) : (
                <h2 className="text-lime-600 title-font font-medium text-3xl">
                  &#9650;{" "}
                  {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </h2>
              )}
              <p className="leading-relaxed">Last 1 Year</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinPage;
