
const Button = ({ children, onClick, type = "primary" }) => {
    let bgColor, textColor;
    
    if (type === "primary") {
      bgColor = "bg-blue-600 hover:bg-blue-700";
      textColor = "text-white";
    } else if (type === "secondary") {
      bgColor = "bg-green-600 hover:bg-green-700";
      textColor = "text-white";
    } else if (type === "danger") {
      bgColor = "bg-red-600 hover:bg-red-700";
      textColor = "text-white";
    } else {
      bgColor = "bg-gray-300 hover:bg-gray-400";
      textColor = "text-gray-800";
    }
  
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2`}
      >
        {children}
      </button>
    );
  };
  