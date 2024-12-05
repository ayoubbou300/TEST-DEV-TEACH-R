
const Alert = ({ message, type = "success" }) => {
    let bgColor, textColor;
    
    if (type === "success") {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
    } else if (type === "error") {
      bgColor = "bg-red-100";
      textColor = "text-red-800";
    } else if (type === "warning") {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
    } else {
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
    }
  
    return (
      <div className={`p-4 mb-4 rounded-lg ${bgColor} ${textColor} border-l-4 border-l-${textColor}`}>
        <p>{message}</p>
      </div>
    );
  };
  