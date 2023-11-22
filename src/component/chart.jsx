import Chart from "react-apexcharts";

export const ChartLayout = ({ totalUserUnique, totalFailedApi, totalApi }) => {
  const options = {
    chart: {
      id: "Chart",
    },
    xaxis: {
      categories: ["Total User", "Total API Call", "Failed Api Calls"],
    },
  };

  const series = [
    {
      name: "Chart",
      data: [totalUserUnique, totalApi, totalFailedApi],
    },
  ];

  return (
    <div className="flex-1">
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
      />
    </div>
  );
};
