export const Table = ({ data }) => {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };
  return (
    <table className="w-full border">
      <thead className="sticky top-[-1px] bg-white border shadow-lg">
        <tr className="md:text-lg font-extrabold border text-sm">
          <td className="w-[20%] md:w-[15%] border p-2">User Id</td>
          <td className="w-[25%] border p-2">Status</td>
          <td className="w-[35%] border p-2">Time</td>
          <td className="w-[20%] md:w-[25%] border p-2">Error</td>
        </tr>
      </thead>
      <tbody>
        {data.map((z) => {
          const getDate = new Date(z.timestamp).getDate();
          const getMonth = new Date(z.timestamp).getMonth();
          const getYear = new Date(z.timestamp).getFullYear();
          const getHours = new Date(z.timestamp).getHours();
          const getMinutes = new Date(z.timestamp).getMinutes();

          return (
            <tr key={z._id}>
              <td className="w-[15%] border p-2">{z.userId}</td>
              <td className="w-[25%] border p-2">
                {z.status === "success" && (
                  <div className="bg-green-600 px-2 md:px-4 rounded-full inline text-[10px] md:text-xs text-white py-1">
                    Success
                  </div>
                )}
                {z.status === "failed" && (
                  <div className="bg-red-600 px-2 md:px-4 rounded-full inline text-[10px] md:text-xs text-white py-1">
                    Failed
                  </div>
                )}
              </td>
              <td className="w-[35%] border p-2 text-xs">
                {`${pad(getDate)}-${pad(getMonth)}-${pad(getYear)} ${pad(
                  getHours
                )}:${pad(getMinutes)}`}
              </td>
              <td className="w-[25%] border p-2 text-sm">
                {z.errorMessage || "NA"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
