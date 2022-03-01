import { NavLink } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

function Header(props) {
  const { currency, setCurrency } = CryptoState();

  return (
    <div>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img
              alt="testimonial"
              src="https://cryptologos.cc/logos/icon-icx-logo.png"
              className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
            ></img>

            <span className="ml-3 text-xl">CryptoMarket</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <NavLink to={props.link} className="mx-4 mr-5 hover:text-white">
              {props.view}
            </NavLink>
            <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded border border-gray-700 focus:ring-2 focus:ring-blue-900 bg-gray-900 appearance-none py-2 focus:outline-none focus:border-blue-500 text-white pl-3 pr-10"
          >
            <option value={"USD"}>USD</option>
            <option value={"EUR"}>EUR</option>
            <option value={"GBP"}>GBP</option>
            <option value={"JPY"}>JPY</option>
            <option value={"PKR"}>PKR</option>
          </select>
          </nav>
         
        </div>
      </header>
    </div>
  );
}

export default Header;
