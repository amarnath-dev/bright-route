import React from "react";
import { format } from "timeago.js";

interface Messages {
  message: object;
  own: boolean;
  index: number;
}
export const Messages: React.FC<Messages> = ({ message, own, index }) => {
  return (
    <>
      {own ? (
        <>
          <div
            key={index}
            className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
          >
            <div>
              <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm">{message?.text}</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                {format(message?.createdAt)}
              </span>
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
        </>
      ) : (
        <>
          <div key={index} className="flex w-full mt-2 space-x-3 max-w-xs">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p className="text-sm">{message?.text}</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                {format(message?.createdAt)}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};
