export const Button = ({ children, onClick, type = "primary" }) => {
  return (
    <div
      onClick={onClick}
      className={`
      bg-blue-600 hover:bg-blue-800
        ${type === "success" && "!bg-green-600 hover:!bg-green-800"}
        ${type === "error" && "!bg-red-600 hover:!bg-red-800"}
        ${type === "selected" && "!bg-blue-800 hover:!bg-blue-800"}
        justify-center items-center
        flex px-4 rounded-md shadow-md
      text-white cursor-pointer py-2 md:py-auto
       transition-colors duration-150`}
    >
      {children}
    </div>
  );
};
