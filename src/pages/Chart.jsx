import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

function Chart() {
  return (
    <div className="lg:flex mt-10  lg:justify-around  items-center ">
      <PieChart />
      <BarChart />
    </div>
  );
}

export default Chart;
