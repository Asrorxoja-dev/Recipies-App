import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

function Chart() {
  return (
    <div className="flex mt-10  justify-around items-center ">
      <PieChart />
      <BarChart />
    </div>
  );
}

export default Chart;
