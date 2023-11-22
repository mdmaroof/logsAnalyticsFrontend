export const Card = ({ heading, value = 0 }) => {
  return (
    <>
      <div className="flex flex-col w-full h-40 border shadow-md rounded-md px-5 py-4 justify-center">
        <div className="text-lg font-extralight mb-4">{heading}</div>
        <div className="text-6xl font-extrabold">{value}</div>
      </div>
    </>
  );
};
