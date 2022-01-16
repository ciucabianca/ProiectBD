import { useEffect, useState } from "react";
import { getStatisticById } from "../api/stats";
import { Layout } from "../components/Layout";

export const StatsPage = () => {
  const [modelNumber, setModelNumber] = useState();
  const [modelSales, setModelSales] = useState();
  const [locationNumber, setLocationNumber] = useState();
  const [locationSales, setLocationSales] = useState();

  useEffect(() => {
    getStatistics();
  }, []);

  const getStatistics = async () => {
    setModelNumber(await getStatisticById("0"));
    setModelSales(await getStatisticById("1"));
    setLocationNumber(await getStatisticById("2"));
    setLocationSales(await getStatisticById("3"));
  };

  return (
    <Layout>
      <h1> Statistics Page</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          className="p-3 m-2"
          style={{
            borderRadius: 8,
            backgroundColor: "grey",
            height: 180,
            width: 300,
          }}>
          <h3>Best selling Model (numbers):</h3>
          <h3>{modelNumber}</h3>
        </div>
        <div
          className="p-3 m-2"
          style={{
            borderRadius: 8,
            backgroundColor: "grey",
            height: 180,
            width: 300,
          }}>
          <h3>Best selling Model ($):</h3>
          <h3>{modelSales}</h3>
        </div>
        <div
          className="p-3 m-2"
          style={{
            borderRadius: 8,
            backgroundColor: "grey",
            height: 180,
            width: 300,
          }}>
          <h3>Best selling Location (numbers):</h3>
          <h3>{locationNumber}</h3>
        </div>
        <div
          className="p-3 m-2"
          style={{
            borderRadius: 8,
            backgroundColor: "grey",
            height: 180,
            width: 300,
          }}>
          <h3>Best selling Location ($):</h3>
          <h3>{locationSales}</h3>
        </div>
      </div>
    </Layout>
  );
};
