import React from "react";

interface MessageBannerProps {
    bgColor: string;
    message: string;
  }

const DisplayMessage: React.FC<MessageBannerProps> = ({ bgColor, message }) => {
    return (
        <>
          <div className={`tm-p-2 tm-rounded-xl tm-text-gray-800 ${bgColor} `}>
            <div className="tm-mt-2">{message}</div>
          </div>
        </>
      );
  };
  export default DisplayMessage;