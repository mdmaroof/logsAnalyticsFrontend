import { useEffect, useState } from "react";
import { Button } from "./component/button";
import { Card } from "./component/card";
import { ChartLayout } from "./component/chart";
import { Table } from "./component/table";
import { Filter } from "./component/filter";

function App() {
  const [payload, setPayload] = useState(null);
  const [data, setData] = useState([]);

  function getRandomInteger(min = 1, max = 20) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getLogsApi = async (filter) => {
    try {
      const responseCall = await fetch(
        "https://starfish-app-fubfy.ondigitalocean.app/logs?" +
          new URLSearchParams({
            ...filter,
          })
      );
      const data = await responseCall.json();
      const { response, totalUserUnique, totalFailedApi, totalApi } =
        data.payload || {};
      setPayload({ totalUserUnique, totalFailedApi, totalApi });
      setData(response);
    } catch (err) {
      console.log("Error");
    }
  };

  useEffect(() => {
    getLogsApi();
  }, []);

  const { totalUserUnique, totalFailedApi, totalApi } = payload || {};

  const generateLogSuccess = async () => {
    const id = getRandomInteger();
    try {
      const responseCall = await fetch(`https://starfish-app-fubfy.ondigitalocean.app/api/${id}`);
      const data = await responseCall.json();
      console.log(data);
      getLogsApi();
    } catch (err) {
      console.log("Error");
    }
  };

  const generateLogFailed = async () => {
    const id = getRandomInteger();
    try {
      const responseCall = await fetch(
        `https://starfish-app-fubfy.ondigitalocean.app/api/${id}/failed`
      );
      const data = await responseCall.json();
      console.log(data);
      getLogsApi();
    } catch (err) {
      console.log("Error");
    }
  };

  return (
    <div className="px-6 md:px-20">
      <div className="py-4 flex flex-col md:flex-row justify-between">
        <div className="text-3xl">Log Analytics</div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-auto">
          <Button onClick={generateLogSuccess} type="success">
            Generate Success Logs
          </Button>
          <Button onClick={generateLogFailed} type="error">
            Generate Error Logs
          </Button>
        </div>
      </div>

      <div>
        <Filter getLogsApi={getLogsApi} />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card heading="Total number of unique users" value={totalUserUnique} />
        <Card heading="Total number of API calls" value={totalApi} />
        <Card heading="Total number of failures API" value={totalFailedApi} />
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 mt-6">
        {payload && (
          <ChartLayout
            totalUserUnique={totalUserUnique}
            totalFailedApi={totalFailedApi}
            totalApi={totalApi}
          />
        )}

        <div className="md:flex-1 h-[300px] md:h-[400px] overflow-y-scroll relative mx-[-10px]">
          <Table data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
