import { makeStyles } from "@material-ui/core";
import TablePage from "./Pages/TablePage"
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Footer from "./components/Footer";

import CardPage from "./Pages/CardPage";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Route path="/" component={CardPage} exact />
        <Route path="/table" component={TablePage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        <Footer />
      </div>
  
    </BrowserRouter>
  );
}

export default App;
