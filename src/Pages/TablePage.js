import React from "react";

import CoinsTable from "../components/CoinsTable";
import Header from "../components/Header"

const TablePage = () => {
  return (
    <>
       <Header link="/" view="Card View" />
      <CoinsTable />
    </>
  );
};

export default TablePage;
