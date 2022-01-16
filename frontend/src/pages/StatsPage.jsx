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
      <h1 className="text-center pb-4"> STATISTICS </h1>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <div
          className="p-3 m-2"
          style={{
            borderRadius: 8,
            backgroundColor: "#b3e2ee",
            height: 180,
            width: 340,
          }}>
          <h4 className="text-center pb-4">
            Best selling Model By Number Of Rentals::
          </h4>
          <h3 className="text-center pb-4">{modelNumber}</h3>
        </div>
        <div
          className="p-3 m-2"
          style={{
            borderRadius: 8,
            backgroundColor: "#b3e2ee",
            height: 180,
            width: 340,
          }}>
          <h4 className="text-center pb-4">
            Best selling Model By Revenue ($):
          </h4>
          <h3 className="text-center pb-4">{modelSales}</h3>
        </div>
        <div
          className="p-3 m-2"
          style={{
            borderRadius: 8,
            backgroundColor: "#b3e2ee",
            height: 180,
            width: 340,
          }}>
          <h4 className="text-center pb-4">
            Best selling Location By Number Of Rentals:
          </h4>
          <h3 className="text-center pb-4">{locationNumber}</h3>
        </div>
        <div
          className="p-3 m-2"
          style={{
            borderRadius: 8,
            backgroundColor: "#b3e2ee",
            height: 180,
            width: 340,
          }}>
          <h4 className="text-center pb-4">
            Best selling Location By Revenue ($):
          </h4>
          <h3 className="text-center pb-4">{locationSales}</h3>
        </div>
      </div>
    </Layout>
  );
};
